import { Controller, Get, Req, UseGuards } from '@nestjs/common';

import { AuthGuard } from '../../../shared/Guards/auth.guard';
import type { AuthenticatedRequest } from '../../../shared/types/auth';
import { SessionsService } from './sessions.service';

@Controller('sessions')
@UseGuards(AuthGuard)
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Get('/')
  listSessions(@Req() req: AuthenticatedRequest) {
    // currentSessionId is used by IAM to flag the caller's own session.
    // It is carried in the sessionId cookie (set on verify-otp).
    const currentSessionId = req.cookies?.sessionId ?? '';
    return this.sessionsService.listSessions(req.user.id, currentSessionId);
  }
}
