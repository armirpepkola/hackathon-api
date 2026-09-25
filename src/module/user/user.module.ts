import { Module } from '@nestjs/common';
import { UserService } from './user.service.js';
import { UserController } from './user.controller.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';

@Module({
  controllers: [UserController],
  providers: [UserService, RolesGuard],
})
export class UserModule {}
