import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule as NestBetterAuthModule } from '@thallesp/nestjs-better-auth';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaService } from '../database/prisma.service.js';
import { PrismaModule } from '../database/prisma.module.js';

@Module({
  imports: [
    NestBetterAuthModule.forRootAsync({
      imports: [ConfigModule, PrismaModule],
      inject: [PrismaService, ConfigService],
      useFactory: (prisma: PrismaService, config: ConfigService) => ({
        auth: betterAuth({
          database: prismaAdapter(prisma, { provider: 'postgresql' }),
          baseURL: getRequiredAuthUrl(config),
          secret: getRequiredAuthSecret(config),
          emailAndPassword: { enabled: true },
          user: {
            additionalFields: {
              role: {
                type: 'string',
                required: true,
                defaultValue: 'PARTICIPANT',
                input: false,
              },
            },
          },
        }),
      }),
    }),
  ],
})
export class AuthModule {}

function getRequiredAuthUrl(config: ConfigService) {
  const value = config.getOrThrow<string>('BETTER_AUTH_URL');
  try {
    const url = new URL(value);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      throw new Error();
    }
  } catch {
    throw new Error('BETTER_AUTH_URL must be an absolute URL');
  }
  return value;
}

function getRequiredAuthSecret(config: ConfigService) {
  const value = config.getOrThrow<string>('BETTER_AUTH_SECRET');
  if (value.length < 32) {
    throw new Error('BETTER_AUTH_SECRET must contain at least 32 characters');
  }
  return value;
}
