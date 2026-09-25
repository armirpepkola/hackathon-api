import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../lib/database/prisma.service.js';
import { UserService } from './user.service.js';

describe('UserService', () => {
  const findUnique = vi.fn();
  const prisma = {
    user: { findUnique },
  } as unknown as PrismaService;
  let service: UserService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new UserService(prisma);
  });

  it('allows a participant to read their own safe profile fields', async () => {
    const user = { id: 'user-1', name: 'Participant', email: 'p@example.test' };
    findUnique.mockResolvedValue(user);

    await expect(
      service.findUserById('user-1', {
        id: 'user-1',
        email: 'p@example.test',
        role: 'PARTICIPANT',
      }),
    ).resolves.toEqual(user);

    expect(findUnique).toHaveBeenCalledWith({
      where: { id: 'user-1' },
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
        role: true,
        image: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  });

  it('allows an admin to read another user profile', async () => {
    findUnique.mockResolvedValue({ id: 'user-2' });

    await expect(
      service.findUserById('user-2', {
        id: 'admin-1',
        email: 'admin@example.test',
        role: 'ADMIN',
      }),
    ).resolves.toEqual({ id: 'user-2' });
  });

  it('forbids a participant from reading another user profile', async () => {
    await expect(
      service.findUserById('user-2', {
        id: 'user-1',
        email: 'p@example.test',
        role: 'PARTICIPANT',
      }),
    ).rejects.toBeInstanceOf(ForbiddenException);
    expect(findUnique).not.toHaveBeenCalled();
  });

  it('returns not found for an authorized lookup of a missing user', async () => {
    findUnique.mockResolvedValue(null);

    await expect(
      service.findUserById('missing', {
        id: 'admin-1',
        email: 'admin@example.test',
        role: 'ADMIN',
      }),
    ).rejects.toBeInstanceOf(NotFoundException);
  });
});
