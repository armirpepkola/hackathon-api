import 'dotenv/config';

import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ArcjetGuard, ArcjetModule, shield, slidingWindow } from '@arcjet/nest';

const arcjetKey = process.env.ARCJET_KEY;
if (!arcjetKey) {
  throw new Error('ARCJET_KEY must be set to enable Arcjet protection');
}

const arcjetEnvironment = process.env.ARCJET_ENV ?? 'development';
if (!['development', 'test', 'production'].includes(arcjetEnvironment)) {
  throw new Error('ARCJET_ENV must be development, test, or production');
}
const mode = arcjetEnvironment === 'production' ? 'LIVE' : 'DRY_RUN';
const rateLimitMax = Number(process.env.ARCJET_RATE_LIMIT_MAX ?? 60);
const rateLimitInterval = process.env.ARCJET_RATE_LIMIT_INTERVAL ?? '1m';
if (!Number.isInteger(rateLimitMax) || rateLimitMax < 1) {
  throw new Error('ARCJET_RATE_LIMIT_MAX must be a positive integer');
}
if (!/^[1-9]\d*(s|m|h|d)$/.test(rateLimitInterval)) {
  throw new Error(
    'ARCJET_RATE_LIMIT_INTERVAL must use seconds, minutes, hours, or days',
  );
}

@Module({
  imports: [
    ArcjetModule.forRoot({
      isGlobal: true,
      key: arcjetKey,
      rules: [
        shield({ mode }),
        slidingWindow({
          mode,
          interval: rateLimitInterval,
          max: rateLimitMax,
        }),
      ],
    }),
  ],
  providers: [{ provide: APP_GUARD, useClass: ArcjetGuard }],
})
export class ArcjetSecurityModule {}
