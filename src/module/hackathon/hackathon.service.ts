import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateHackathonDto } from './dto/create-hackathon.dto.js';
import { UpdateHackathonDto } from './dto/update-hackathon.dto.js';
import { PrismaService } from '../../lib/database/prisma.service.js';

@Injectable()
export class HackathonService {
  constructor(private prisma: PrismaService) {}

  async createHackathon(
    createHackathonDto: CreateHackathonDto,
    authorId: string,
  ) {
    const startsAt = new Date(createHackathonDto.startsAt);
    const endsAt = new Date(createHackathonDto.endsAt);
    this.assertFutureDateWindow(startsAt, endsAt);

    const user = await this.prisma.user.findUnique({ where: { id: authorId } });
    if (!user) throw new NotFoundException('User not found');

    return this.prisma.hackathon.create({
      data: {
        name: createHackathonDto.name,
        description: createHackathonDto.description,
        startsAt,
        endsAt,
        isActive: createHackathonDto.isActive,
        authorId,
      },
    });
  }

  async findAllHackathons() {
    return this.prisma.hackathon.findMany();
  }

  async findOneHackathon(id: string) {
    const hackathon = await this.prisma.hackathon.findUnique({ where: { id } });
    if (!hackathon) throw new NotFoundException('Hackathon not found');
    return hackathon;
  }

  async getParticipants(hackathonId: string) {
    const hackathon = await this.prisma.hackathon.findUnique({
      where: { id: hackathonId },
    });
    if (!hackathon) throw new NotFoundException('Hackathon not found');

    return this.prisma.hackathonParticipant.findMany({
      where: { hackathonId },
      include: {
        user: { select: { id: true, name: true, image: true } },
      },
      orderBy: { joinedAt: 'asc' },
    });
  }

  async updateHackathon(id: string, updateHackathonDto: UpdateHackathonDto) {
    const hackathon = await this.prisma.hackathon.findUnique({ where: { id } });
    if (!hackathon) throw new NotFoundException('Hackathon not found');

    const startsAt = updateHackathonDto.startsAt
      ? new Date(updateHackathonDto.startsAt)
      : hackathon.startsAt;
    const endsAt = updateHackathonDto.endsAt
      ? new Date(updateHackathonDto.endsAt)
      : hackathon.endsAt;
    if (startsAt >= endsAt) {
      throw new BadRequestException('End date must be after start date');
    }
    if (updateHackathonDto.startsAt && startsAt <= new Date()) {
      throw new BadRequestException('Start date must be in the future');
    }
    if (updateHackathonDto.endsAt && endsAt <= new Date()) {
      throw new BadRequestException('End date must be in the future');
    }

    return this.prisma.hackathon.update({
      where: { id },
      data: {
        ...updateHackathonDto,
        ...(updateHackathonDto.startsAt ? { startsAt } : {}),
        ...(updateHackathonDto.endsAt ? { endsAt } : {}),
      },
    });
  }

  async removeHackathon(id: string) {
    const hackathon = await this.prisma.hackathon.findUnique({ where: { id } });
    if (!hackathon) throw new NotFoundException('Hackathon not found');

    await this.prisma.hackathon.delete({ where: { id } });
    return null;
  }

  async joinHackathon(hackathonId: string, userId: string) {
    const hackathon = await this.prisma.hackathon.findUnique({
      where: { id: hackathonId },
    });
    if (!hackathon) throw new NotFoundException('Hackathon not found');

    const now = new Date();
    if (
      !hackathon.isActive ||
      hackathon.startsAt > now ||
      hackathon.endsAt <= now
    ) {
      throw new BadRequestException(
        'This hackathon is not accepting registrations at this time',
      );
    }

    const alreadyJoined = await this.prisma.hackathonParticipant.findUnique({
      where: { hackathonId_userId: { hackathonId, userId } },
    });
    if (alreadyJoined)
      throw new BadRequestException('Already joined this hackathon');

    const participant = await this.prisma.hackathonParticipant.create({
      data: { hackathonId, userId },
    });

    return participant;
  }

  private assertFutureDateWindow(startsAt: Date, endsAt: Date) {
    const now = new Date();
    if (startsAt <= now) {
      throw new BadRequestException('Start date must be in the future');
    }
    if (endsAt <= startsAt) {
      throw new BadRequestException('End date must be after start date');
    }
  }
}
