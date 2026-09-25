import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './lib/database/prisma.module.js';
import { AuthModule } from './lib/auth/auth.module.js';
import { UserModule } from './module/user/user.module.js';
import { HackathonModule } from './module/hackathon/hackathon.module.js';
import { ArcjetSecurityModule } from './lib/security/arcjet.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UserModule,
    HackathonModule,
    ArcjetSecurityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
