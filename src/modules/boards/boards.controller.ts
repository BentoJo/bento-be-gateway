import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '../../shared/Guards/auth.guard';
import type { AuthenticatedRequest } from '../../shared/types/auth';
import { BoardsService } from './boards.service';
import type {
  ArchiveBoardRequest,
  CreateBoardRequest,
  DeleteBoardRequest,
  FavoriteBoardRequest,
  GetBoardRequest,
  ListBoardsRequest,
  ListFavoriteBoardsRequest,
  RestoreBoardRequest,
  UnarchiveBoardRequest,
  UnfavoriteBoardRequest,
  UpdateBoardRequest,
} from './types';

@Controller('workspace')
@UseGuards(AuthGuard)
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post('/:workspaceId/boards')
  createBoard(
    @Param('workspaceId') workspaceId: string,
    @Body() body: Omit<CreateBoardRequest, 'workspaceId'>,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.boardsService.createBoard({ workspaceId, ...body }, req.user);
  }

  @Get('/:workspaceId/boards/favorites')
  listFavoriteBoards(
    @Param('workspaceId') workspaceId: string,
    @Query() query: Omit<ListFavoriteBoardsRequest, 'workspaceId'>,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.boardsService.listFavoriteBoards(
      { workspaceId, ...query },
      req.user,
    );
  }

  @Get('/:workspaceId/boards')
  listWorkspaceBoards(
    @Param('workspaceId') workspaceId: string,
    @Query() query: Omit<ListBoardsRequest, 'workspaceId'>,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.boardsService.listWorkspaceBoards(
      { workspaceId, ...query },
      req.user,
    );
  }

  @Get('/:workspaceId/boards/:boardId')
  getBoard(@Param() params: GetBoardRequest, @Req() req: AuthenticatedRequest) {
    return this.boardsService.getBoard(params, req.user);
  }

  @Put('/:workspaceId/boards/:boardId')
  updateBoard(
    @Param() params: GetBoardRequest,
    @Body() body: Omit<UpdateBoardRequest, 'workspaceId' | 'boardId'>,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.boardsService.updateBoard({ ...params, ...body }, req.user);
  }

  @Delete('/:workspaceId/boards/:boardId')
  deleteBoard(
    @Param() params: DeleteBoardRequest,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.boardsService.deleteBoard(params, req.user);
  }

  @Post('/:workspaceId/boards/:boardId/restore')
  restoreBoard(
    @Param() params: RestoreBoardRequest,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.boardsService.restoreBoard(params, req.user);
  }

  @Post('/:workspaceId/boards/:boardId/archive')
  archiveBoard(
    @Param() params: ArchiveBoardRequest,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.boardsService.archiveBoard(params, req.user);
  }

  @Post('/:workspaceId/boards/:boardId/unarchive')
  unarchiveBoard(
    @Param() params: UnarchiveBoardRequest,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.boardsService.unarchiveBoard(params, req.user);
  }

  @Post('/:workspaceId/boards/:boardId/favorite')
  favoriteBoard(
    @Param() params: FavoriteBoardRequest,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.boardsService.favoriteBoard(params, req.user);
  }

  @Post('/:workspaceId/boards/:boardId/unfavorite')
  unfavoriteBoard(
    @Param() params: UnfavoriteBoardRequest,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.boardsService.unfavoriteBoard(params, req.user);
  }
}
