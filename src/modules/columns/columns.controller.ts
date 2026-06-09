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
import { ColumnsService } from './columns.service';
import type {
  ArchiveColumnRequest,
  BulkReorderColumnsRequest,
  CreateColumnRequest,
  DeleteColumnRequest,
  GetColumnRequest,
  ListBoardColumnsRequest,
  ListColumnCardsRequest,
  ReorderColumnRequest,
  RestoreColumnRequest,
  UnarchiveColumnRequest,
  UpdateColumnRequest,
} from './types';

@Controller('workspace')
@UseGuards(AuthGuard)
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @Get('/:workspaceId/boards/:boardId/columns')
  listBoardColumns(
    @Param() params: Omit<ListBoardColumnsRequest, 'includeArchived'>,
    @Query() query: Pick<ListBoardColumnsRequest, 'includeArchived'>,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.columnsService.listBoardColumns(
      { ...params, ...query },
      req.user,
    );
  }

  @Post('/:workspaceId/boards/:boardId/columns')
  createColumn(
    @Param() params: Pick<CreateColumnRequest, 'workspaceId' | 'boardId'>,
    @Body() body: Omit<CreateColumnRequest, 'workspaceId' | 'boardId'>,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.columnsService.createColumn({ ...params, ...body }, req.user);
  }

  @Post('/:workspaceId/boards/:boardId/columns/reorder')
  bulkReorderColumns(
    @Param() params: Pick<BulkReorderColumnsRequest, 'workspaceId' | 'boardId'>,
    @Body() body: Omit<BulkReorderColumnsRequest, 'workspaceId' | 'boardId'>,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.columnsService.bulkReorderColumns(
      { ...params, ...body },
      req.user,
    );
  }

  @Put('/:workspaceId/boards/:boardId/columns/:columnId')
  updateColumn(
    @Param() params: GetColumnRequest,
    @Body()
    body: Omit<UpdateColumnRequest, 'workspaceId' | 'boardId' | 'columnId'>,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.columnsService.updateColumn({ ...params, ...body }, req.user);
  }

  @Delete('/:workspaceId/boards/:boardId/columns/:columnId')
  deleteColumn(
    @Param() params: DeleteColumnRequest,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.columnsService.deleteColumn(params, req.user);
  }

  @Post('/:workspaceId/boards/:boardId/columns/:columnId/reorder')
  reorderColumn(
    @Param()
    params: Pick<ReorderColumnRequest, 'workspaceId' | 'boardId' | 'columnId'>,
    @Body()
    body: Omit<ReorderColumnRequest, 'workspaceId' | 'boardId' | 'columnId'>,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.columnsService.reorderColumn({ ...params, ...body }, req.user);
  }

  @Post('/:workspaceId/boards/:boardId/columns/:columnId/archive')
  archiveColumn(
    @Param() params: ArchiveColumnRequest,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.columnsService.archiveColumn(params, req.user);
  }

  @Post('/:workspaceId/boards/:boardId/columns/:columnId/unarchive')
  unarchiveColumn(
    @Param() params: UnarchiveColumnRequest,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.columnsService.unarchiveColumn(params, req.user);
  }

  @Post('/:workspaceId/boards/:boardId/columns/:columnId/restore')
  restoreColumn(
    @Param() params: RestoreColumnRequest,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.columnsService.restoreColumn(params, req.user);
  }

  @Get('/:workspaceId/boards/:boardId/columns/:columnId/cards')
  listColumnCards(
    @Param()
    params: Pick<
      ListColumnCardsRequest,
      'workspaceId' | 'boardId' | 'columnId'
    >,
    @Query() query: Pick<ListColumnCardsRequest, 'page' | 'limit'>,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.columnsService.listColumnCards(
      { ...params, ...query },
      req.user,
    );
  }
}
