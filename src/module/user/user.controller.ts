import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';
import { ResponseMessage } from '../../common/decorators/response-message.decorator.js';
import type { Request as ExpressRequest } from 'express';

@Controller('user')
@UseGuards(RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles('ADMIN')
  @ResponseMessage('Fetch all users')
  findAll() {
    return this.userService.findAllUsers();
  }

  @Get(':id')
  findById(@Param('id') id: string, @Request() request: ExpressRequest) {
    return this.userService.findUserById(id, request.user!);
  }
}
