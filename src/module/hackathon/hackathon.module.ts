import { Module } from '@nestjs/common';
import { HackathonService } from './hackathon.service.js';
import { HackathonController } from './hackathon.controller.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';

@Module({
  controllers: [HackathonController],
  providers: [HackathonService, RolesGuard],
})
export class HackathonModule {}
