import { BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../lib/database/prisma.service.js';
import { HackathonService } from './hackathon.service.js';

describe('HackathonService', () => {
  const userFindUnique = vi.fn();
  const hackathonFindUnique = vi.fn();
  const hackathonCreate = vi.fn();
  const hackathonUpdate = vi.fn();
  const participantFindUnique = vi.fn();
  const participantCreate = vi.fn();
  const prisma = {
    user: { findUnique: userFindUnique },
    hackathon: {
      findUnique: hackathonFindUnique,
      create: hackathonCreate,
      update: hackathonUpdate,
    },
    hackathonParticipant: {
      findUnique: participantFindUnique,
      create: participantCreate,
    },
  } as unknown as PrismaService;
  let service: HackathonService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new HackathonService(prisma);
  });

  it('rejects creation when the end is not after the start', async () => {
    const startsAt = new Date(Date.now() + 60_000);

    await expect(
      service.createHackathon(
        {
          name: 'Test event',
          startsAt: startsAt.toISOString(),
          endsAt: startsAt.toISOString(),
        },
        'admin-1',
      ),
    ).rejects.toBeInstanceOf(BadRequestException);

    expect(userFindUnique).not.toHaveBeenCalled();
  });

  it('creates a hackathon using parsed dates', async () => {
    const startsAt = new Date(Date.now() + 60_000);
    const endsAt = new Date(Date.now() + 120_000);
    userFindUnique.mockResolvedValue({ id: 'admin-1' });
    hackathonCreate.mockResolvedValue({ id: 'event-1' });

    await service.createHackathon(
      {
        name: 'Test event',
        startsAt: startsAt.toISOString(),
        endsAt: endsAt.toISOString(),
      },
      'admin-1',
    );

    expect(hackathonCreate).toHaveBeenCalledWith({
      data: {
        name: 'Test event',
        description: undefined,
        startsAt,
        endsAt,
        isActive: undefined,
        authorId: 'admin-1',
      },
    });
  });

  it('rejects updates that put the end before the start', async () => {
    hackathonFindUnique.mockResolvedValue({
      id: 'event-1',
      startsAt: new Date(Date.now() + 60_000),
      endsAt: new Date(Date.now() + 180_000),
    });

    await expect(
      service.updateHackathon('event-1', {
        endsAt: new Date(Date.now() + 30_000).toISOString(),
      }),
    ).rejects.toBeInstanceOf(BadRequestException);
    expect(hackathonUpdate).not.toHaveBeenCalled();
  });

  it('rejects registration before the hackathon starts', async () => {
    hackathonFindUnique.mockResolvedValue({
      id: 'event-1',
      isActive: true,
      startsAt: new Date(Date.now() + 60_000),
      endsAt: new Date(Date.now() + 120_000),
    });

    await expect(
      service.joinHackathon('event-1', 'user-1'),
    ).rejects.toBeInstanceOf(BadRequestException);
    expect(participantFindUnique).not.toHaveBeenCalled();
    expect(participantCreate).not.toHaveBeenCalled();
  });
});
