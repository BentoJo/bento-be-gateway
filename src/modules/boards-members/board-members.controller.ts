import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '../../shared/Guards/auth.guard';
import type { AuthenticatedRequest } from '../../shared/types/auth';
import { BoardMembersService } from './board-members.service';
import type {
  AddBoardMemberRequest,
  ListBoardMembersRequest,
  RemoveBoardMemberRequest,
} from './types';

@Controller('workspace')
@UseGuards(AuthGuard)
export class BoardMembersController {
  constructor(private readonly boardMembersService: BoardMembersService) {}

  @Post('/:workspaceId/boards/:boardId/members')
  addBoardMember(
    @Param('workspaceId') workspaceId: string,
    @Param('boardId') boardId: string,
    @Body() body: Omit<AddBoardMemberRequest, 'workspaceId' | 'boardId'>,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.boardMembersService.addBoardMember(
      { workspaceId, boardId, ...body },
      req.user,
    );
  }

  @Get('/:workspaceId/boards/:boardId/members')
  listBoardMembers(
    @Param('workspaceId') workspaceId: string,
    @Param('boardId') boardId: string,
    @Query() query: Omit<ListBoardMembersRequest, 'workspaceId' | 'boardId'>,
  ) {
    return this.boardMembersService.listBoardMembers({
      workspaceId,
      boardId,
      ...query,
    });
  }

  @Delete('/:workspaceId/boards/:boardId/members/:userId')
  removeBoardMember(
    @Param() params: RemoveBoardMemberRequest,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.boardMembersService.removeBoardMember(params, req.user);
  }
}
