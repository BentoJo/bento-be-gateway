import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common';

import { AuthGuard } from '../../../shared/Guards/auth.guard';
import type { AuthenticatedRequest } from '../../../shared/types/auth';
import type { UpdateUserBody } from './types';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  getMe(@Req() req: AuthenticatedRequest) {
    return this.userService.getUser(req.user.id);
  }

  // avatar: IAM exposes no binary upload RPC. avatarUrl is accepted as a
  // plain string field on UpdateUser; binary avatar upload is not supported yet.
  @Put('/me')
  updateMe(@Body() body: UpdateUserBody, @Req() req: AuthenticatedRequest) {
    return this.userService.updateUser({ userId: req.user.id, ...body });
  }
}
