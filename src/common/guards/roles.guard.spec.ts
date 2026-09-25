import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesGuard } from './roles.guard.js';

describe('RolesGuard', () => {
  const getAllAndOverride = vi.fn();
  const reflector = { getAllAndOverride } as unknown as Reflector;
  const handler = () => undefined;
  const controller = class {};
  let guard: RolesGuard;

  beforeEach(() => {
    vi.clearAllMocks();
    guard = new RolesGuard(reflector);
  });

  function contextFor(user?: Express.User) {
    return {
      getHandler: () => handler,
      getClass: () => controller,
      switchToHttp: () => ({ getRequest: () => ({ user }) }),
    } as unknown as ExecutionContext;
  }

  it('allows routes without role metadata', () => {
    getAllAndOverride.mockReturnValue(undefined);

    expect(guard.canActivate(contextFor())).toBe(true);
  });

  it('allows a user with a required role', () => {
    getAllAndOverride.mockReturnValue(['PARTICIPANT']);

    expect(
      guard.canActivate(
        contextFor({
          id: 'user-1',
          email: 'user@example.test',
          role: 'PARTICIPANT',
        }),
      ),
    ).toBe(true);
  });

  it('forbids a user with the wrong role', () => {
    getAllAndOverride.mockReturnValue(['ADMIN']);

    expect(() =>
      guard.canActivate(
        contextFor({
          id: 'user-1',
          email: 'user@example.test',
          role: 'PARTICIPANT',
        }),
      ),
    ).toThrow(ForbiddenException);
  });

  it('forbids missing user role data', () => {
    getAllAndOverride.mockReturnValue(['ADMIN']);

    expect(() => guard.canActivate(contextFor())).toThrow(ForbiddenException);
  });
});
