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
import { CardsService } from './cards.service';
import type {
  AddCardAssigneeRequest,
  AddCardLabelRequest,
  AddChecklistItemRequest,
  AddCommentRequest,
  ArchiveCardRequest,
  CreateCardRequest,
  CreateChecklistRequest,
  CreateLabelRequest,
  DeleteCardRequest,
  DeleteChecklistItemRequest,
  DeleteCommentRequest,
  DeleteLabelRequest,
  GetCardRequest,
  ListBoardCardsRequest,
  ListCardAssigneesRequest,
  ListCardChecklistsRequest,
  ListCardCommentsRequest,
  ListWorkspaceCardsByDateRequest,
  ListWorkspaceLabelsRequest,
  MoveCardRequest,
  RemoveCardAssigneeRequest,
  RemoveCardLabelRequest,
  RestoreCardRequest,
  ToggleChecklistItemRequest,
  UpdateCardRequest,
} from './types';

@Controller('workspace')
@UseGuards(AuthGuard)
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  // ---------------------------
  // LABELS (workspace level)
  // ---------------------------
  @Get('/:workspaceId/labels')
  listWorkspaceLabels(
    @Param() params: ListWorkspaceLabelsRequest,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.cardsService.listWorkspaceLabels(params, req.user);
  }

  @Post('/:workspaceId/labels')
  createLabel(
    @Param() params: Pick<CreateLabelRequest, 'workspaceId'>,
    @Body() body: Omit<CreateLabelRequest, 'workspaceId'>,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.cardsService.createLabel({ ...params, ...body }, req.user);
  }

  @Delete('/:workspaceId/labels/:labelId')
  deleteLabel(
    @Param() params: DeleteLabelRequest,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.cardsService.deleteLabel(params, req.user);
  }

  // ---------------------------
  // CALENDAR (workspace level)
  // ---------------------------
  @Get('/:workspaceId/calendar')
  listWorkspaceCardsByDate(
    @Param() params: Pick<ListWorkspaceCardsByDateRequest, 'workspaceId'>,
    @Query() query: Omit<ListWorkspaceCardsByDateRequest, 'workspaceId'>,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.cardsService.listWorkspaceCardsByDate(
      { ...params, ...query },
      req.user,
    );
  }

  // ---------------------------
  // CARD CRUD
  // ---------------------------
  @Get('/:workspaceId/boards/:boardId/cards')
  listBoardCards(
    @Param() params: Omit<ListBoardCardsRequest, 'includeArchived'>,
    @Query() query: Pick<ListBoardCardsRequest, 'includeArchived'>,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.cardsService.listBoardCards({ ...params, ...query }, req.user);
  }

  @Post('/:workspaceId/boards/:boardId/cards')
  createCard(
    @Param() params: Pick<CreateCardRequest, 'workspaceId' | 'boardId'>,
    @Body() body: Omit<CreateCardRequest, 'workspaceId' | 'boardId'>,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.cardsService.createCard({ ...params, ...body }, req.user);
  }

  @Get('/:workspaceId/boards/:boardId/cards/:cardId')
  getCard(@Param() params: GetCardRequest, @Req() req: AuthenticatedRequest) {
    return this.cardsService.getCard(params, req.user);
  }

  @Put('/:workspaceId/boards/:boardId/cards/:cardId')
  updateCard(
    @Param() params: GetCardRequest,
    @Body() body: Omit<UpdateCardRequest, 'workspaceId' | 'boardId' | 'cardId'>,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.cardsService.updateCard({ ...params, ...body }, req.user);
  }

  @Delete('/:workspaceId/boards/:boardId/cards/:cardId')
  deleteCard(
    @Param() params: DeleteCardRequest,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.cardsService.deleteCard(params, req.user);
  }

  @Post('/:workspaceId/boards/:boardId/cards/:cardId/move')
  moveCard(
    @Param()
    params: Pick<MoveCardRequest, 'workspaceId' | 'boardId' | 'cardId'>,
    @Body() body: Omit<MoveCardRequest, 'workspaceId' | 'boardId' | 'cardId'>,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.cardsService.moveCard({ ...params, ...body }, req.user);
  }

  @Post('/:workspaceId/boards/:boardId/cards/:cardId/archive')
  archiveCard(
    @Param() params: ArchiveCardRequest,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.cardsService.archiveCard(params, req.user);
  }

  @Post('/:workspaceId/boards/:boardId/cards/:cardId/restore')
  restoreCard(
    @Param() params: RestoreCardRequest,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.cardsService.restoreCard(params, req.user);
  }

  // ---------------------------
  // ASSIGNEES
  // ---------------------------
  @Get('/:workspaceId/boards/:boardId/cards/:cardId/assignees')
  listCardAssignees(
    @Param() params: ListCardAssigneesRequest,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.cardsService.listCardAssignees(params, req.user);
  }

  @Post('/:workspaceId/boards/:boardId/cards/:cardId/assignees')
  addCardAssignee(
    @Param()
    params: Pick<AddCardAssigneeRequest, 'workspaceId' | 'boardId' | 'cardId'>,
    @Body()
    body: Omit<AddCardAssigneeRequest, 'workspaceId' | 'boardId' | 'cardId'>,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.cardsService.addCardAssignee({ ...params, ...body }, req.user);
  }

  @Delete('/:workspaceId/boards/:boardId/cards/:cardId/assignees/:assigneeId')
  removeCardAssignee(
    @Param() params: RemoveCardAssigneeRequest,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.cardsService.removeCardAssignee(params, req.user);
  }

  // ---------------------------
  // LABELS (card level)
  // ---------------------------
  @Post('/:workspaceId/boards/:boardId/cards/:cardId/labels')
  addCardLabel(
    @Param()
    params: Pick<AddCardLabelRequest, 'workspaceId' | 'boardId' | 'cardId'>,
    @Body()
    body: Omit<AddCardLabelRequest, 'workspaceId' | 'boardId' | 'cardId'>,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.cardsService.addCardLabel({ ...params, ...body }, req.user);
  }

  @Delete('/:workspaceId/boards/:boardId/cards/:cardId/labels/:labelId')
  removeCardLabel(
    @Param() params: RemoveCardLabelRequest,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.cardsService.removeCardLabel(params, req.user);
  }

  // ---------------------------
  // COMMENTS
  // ---------------------------
  @Get('/:workspaceId/boards/:boardId/cards/:cardId/comments')
  listCardComments(
    @Param()
    params: Pick<ListCardCommentsRequest, 'workspaceId' | 'boardId' | 'cardId'>,
    @Query() query: Pick<ListCardCommentsRequest, 'page' | 'limit'>,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.cardsService.listCardComments(
      { ...params, ...query },
      req.user,
    );
  }

  @Post('/:workspaceId/boards/:boardId/cards/:cardId/comments')
  addComment(
    @Param()
    params: Pick<AddCommentRequest, 'workspaceId' | 'boardId' | 'cardId'>,
    @Body() body: Omit<AddCommentRequest, 'workspaceId' | 'boardId' | 'cardId'>,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.cardsService.addComment({ ...params, ...body }, req.user);
  }

  @Delete('/:workspaceId/boards/:boardId/cards/:cardId/comments/:commentId')
  deleteComment(
    @Param() params: DeleteCommentRequest,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.cardsService.deleteComment(params, req.user);
  }

  // ---------------------------
  // CHECKLISTS
  // ---------------------------
  @Get('/:workspaceId/boards/:boardId/cards/:cardId/checklists')
  listCardChecklists(
    @Param() params: ListCardChecklistsRequest,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.cardsService.listCardChecklists(params, req.user);
  }

  @Post('/:workspaceId/boards/:boardId/cards/:cardId/checklists')
  createChecklist(
    @Param()
    params: Pick<CreateChecklistRequest, 'workspaceId' | 'boardId' | 'cardId'>,
    @Body()
    body: Omit<CreateChecklistRequest, 'workspaceId' | 'boardId' | 'cardId'>,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.cardsService.createChecklist({ ...params, ...body }, req.user);
  }

  @Post(
    '/:workspaceId/boards/:boardId/cards/:cardId/checklists/:checklistId/items',
  )
  addChecklistItem(
    @Param()
    params: Pick<
      AddChecklistItemRequest,
      'workspaceId' | 'boardId' | 'cardId' | 'checklistId'
    >,
    @Body()
    body: Omit<
      AddChecklistItemRequest,
      'workspaceId' | 'boardId' | 'cardId' | 'checklistId'
    >,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.cardsService.addChecklistItem({ ...params, ...body }, req.user);
  }

  @Post(
    '/:workspaceId/boards/:boardId/cards/:cardId/checklists/:checklistId/items/:itemId/toggle',
  )
  toggleChecklistItem(
    @Param()
    params: Pick<
      ToggleChecklistItemRequest,
      'workspaceId' | 'boardId' | 'cardId' | 'checklistId' | 'itemId'
    >,
    @Body()
    body: Pick<ToggleChecklistItemRequest, 'isCompleted'>,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.cardsService.toggleChecklistItem(
      { ...params, ...body },
      req.user,
    );
  }

  @Delete(
    '/:workspaceId/boards/:boardId/cards/:cardId/checklists/:checklistId/items/:itemId',
  )
  deleteChecklistItem(
    @Param() params: DeleteChecklistItemRequest,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.cardsService.deleteChecklistItem(params, req.user);
  }
}
