import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { Metadata } from '@grpc/grpc-js';
import { firstValueFrom, Observable } from 'rxjs';

import type { AuthenticatedUser } from '../../shared/types/auth/authenticated-user';
import type { ActionResponse } from '../../shared/types/workspace/common';
import { buildRequiredUserMetadata } from '../../shared/utils/grpc-user-metadata';
import type {
  AddCardAssigneeRequest,
  AddCardLabelRequest,
  AddChecklistItemRequest,
  AddCommentRequest,
  ArchiveCardRequest,
  CardResponse,
  ChecklistItemResponse,
  ChecklistResponse,
  CommentResponse,
  CreateCardRequest,
  CreateChecklistRequest,
  CreateLabelRequest,
  DeleteCardRequest,
  DeleteChecklistItemRequest,
  DeleteChecklistRequest,
  DeleteCommentRequest,
  DeleteLabelRequest,
  GetCardRequest,
  LabelResponse,
  ListBoardCardsRequest,
  ListCardAssigneesRequest,
  ListCardAssigneesResponse,
  ListCardChecklistsRequest,
  ListCardCommentsRequest,
  ListCardsResponse,
  ListChecklistsResponse,
  ListCommentsResponse,
  ListLabelsResponse,
  ListWorkspaceCardsByDateRequest,
  ListWorkspaceLabelsRequest,
  MoveCardRequest,
  RemoveCardAssigneeRequest,
  RemoveCardLabelRequest,
  RestoreCardRequest,
  ToggleChecklistItemRequest,
  UpdateCardRequest,
} from './types';

interface CardsServiceGrpc {
  CreateCard(
    data: CreateCardRequest,
    metadata: Metadata,
  ): Observable<CardResponse>;
  GetCard(data: GetCardRequest, metadata: Metadata): Observable<CardResponse>;
  UpdateCard(
    data: UpdateCardRequest,
    metadata: Metadata,
  ): Observable<CardResponse>;
  DeleteCard(
    data: DeleteCardRequest,
    metadata: Metadata,
  ): Observable<ActionResponse>;
  RestoreCard(
    data: RestoreCardRequest,
    metadata: Metadata,
  ): Observable<ActionResponse>;
  ArchiveCard(
    data: ArchiveCardRequest,
    metadata: Metadata,
  ): Observable<ActionResponse>;
  MoveCard(
    data: MoveCardRequest,
    metadata: Metadata,
  ): Observable<ActionResponse>;
  ListBoardCards(
    data: ListBoardCardsRequest,
    metadata: Metadata,
  ): Observable<ListCardsResponse>;
  ListWorkspaceCardsByDate(
    data: ListWorkspaceCardsByDateRequest,
    metadata: Metadata,
  ): Observable<ListCardsResponse>;
  AddCardAssignee(
    data: AddCardAssigneeRequest,
    metadata: Metadata,
  ): Observable<ActionResponse>;
  RemoveCardAssignee(
    data: RemoveCardAssigneeRequest,
    metadata: Metadata,
  ): Observable<ActionResponse>;
  ListCardAssignees(
    data: ListCardAssigneesRequest,
    metadata: Metadata,
  ): Observable<ListCardAssigneesResponse>;
  AddCardLabel(
    data: AddCardLabelRequest,
    metadata: Metadata,
  ): Observable<ActionResponse>;
  RemoveCardLabel(
    data: RemoveCardLabelRequest,
    metadata: Metadata,
  ): Observable<ActionResponse>;
  CreateLabel(
    data: CreateLabelRequest,
    metadata: Metadata,
  ): Observable<LabelResponse>;
  ListWorkspaceLabels(
    data: ListWorkspaceLabelsRequest,
    metadata: Metadata,
  ): Observable<ListLabelsResponse>;
  DeleteLabel(
    data: DeleteLabelRequest,
    metadata: Metadata,
  ): Observable<ActionResponse>;
  AddComment(
    data: AddCommentRequest,
    metadata: Metadata,
  ): Observable<CommentResponse>;
  ListCardComments(
    data: ListCardCommentsRequest,
    metadata: Metadata,
  ): Observable<ListCommentsResponse>;
  DeleteComment(
    data: DeleteCommentRequest,
    metadata: Metadata,
  ): Observable<ActionResponse>;
  CreateChecklist(
    data: CreateChecklistRequest,
    metadata: Metadata,
  ): Observable<ChecklistResponse>;
  AddChecklistItem(
    data: AddChecklistItemRequest,
    metadata: Metadata,
  ): Observable<ChecklistItemResponse>;
  ToggleChecklistItem(
    data: ToggleChecklistItemRequest,
    metadata: Metadata,
  ): Observable<ChecklistItemResponse>;
  ListCardChecklists(
    data: ListCardChecklistsRequest,
    metadata: Metadata,
  ): Observable<ListChecklistsResponse>;
  DeleteChecklist(
    data: DeleteChecklistRequest,
    metadata: Metadata,
  ): Observable<ActionResponse>;
  DeleteChecklistItem(
    data: DeleteChecklistItemRequest,
    metadata: Metadata,
  ): Observable<ActionResponse>;
}

@Injectable()
export class CardsService implements OnModuleInit {
  private cardsServiceGrpc!: CardsServiceGrpc;

  constructor(@Inject('WORKSPACE_CARDS_SERVICE') private client: ClientGrpc) {}

  onModuleInit() {
    this.cardsServiceGrpc =
      this.client.getService<CardsServiceGrpc>('CardService');
  }

  // ---------------------------
  // CARD CRUD
  // ---------------------------
  createCard(data: CreateCardRequest, user: AuthenticatedUser) {
    return firstValueFrom(
      this.cardsServiceGrpc.CreateCard(data, buildRequiredUserMetadata(user)),
    );
  }

  getCard(data: GetCardRequest, user: AuthenticatedUser) {
    return firstValueFrom(
      this.cardsServiceGrpc.GetCard(data, buildRequiredUserMetadata(user)),
    );
  }

  updateCard(data: UpdateCardRequest, user: AuthenticatedUser) {
    return firstValueFrom(
      this.cardsServiceGrpc.UpdateCard(data, buildRequiredUserMetadata(user)),
    );
  }

  deleteCard(data: DeleteCardRequest, user: AuthenticatedUser) {
    return firstValueFrom(
      this.cardsServiceGrpc.DeleteCard(data, buildRequiredUserMetadata(user)),
    );
  }

  restoreCard(data: RestoreCardRequest, user: AuthenticatedUser) {
    return firstValueFrom(
      this.cardsServiceGrpc.RestoreCard(data, buildRequiredUserMetadata(user)),
    );
  }

  archiveCard(data: ArchiveCardRequest, user: AuthenticatedUser) {
    return firstValueFrom(
      this.cardsServiceGrpc.ArchiveCard(data, buildRequiredUserMetadata(user)),
    );
  }

  moveCard(data: MoveCardRequest, user: AuthenticatedUser) {
    return firstValueFrom(
      this.cardsServiceGrpc.MoveCard(data, buildRequiredUserMetadata(user)),
    );
  }

  listBoardCards(data: ListBoardCardsRequest, user: AuthenticatedUser) {
    return firstValueFrom(
      this.cardsServiceGrpc.ListBoardCards(
        data,
        buildRequiredUserMetadata(user),
      ),
    );
  }

  listWorkspaceCardsByDate(
    data: ListWorkspaceCardsByDateRequest,
    user: AuthenticatedUser,
  ) {
    return firstValueFrom(
      this.cardsServiceGrpc.ListWorkspaceCardsByDate(
        data,
        buildRequiredUserMetadata(user),
      ),
    );
  }

  // ---------------------------
  // ASSIGNEES
  // ---------------------------
  addCardAssignee(data: AddCardAssigneeRequest, user: AuthenticatedUser) {
    return firstValueFrom(
      this.cardsServiceGrpc.AddCardAssignee(
        data,
        buildRequiredUserMetadata(user),
      ),
    );
  }

  removeCardAssignee(data: RemoveCardAssigneeRequest, user: AuthenticatedUser) {
    return firstValueFrom(
      this.cardsServiceGrpc.RemoveCardAssignee(
        data,
        buildRequiredUserMetadata(user),
      ),
    );
  }

  listCardAssignees(data: ListCardAssigneesRequest, user: AuthenticatedUser) {
    return firstValueFrom(
      this.cardsServiceGrpc.ListCardAssignees(
        data,
        buildRequiredUserMetadata(user),
      ),
    );
  }

  // ---------------------------
  // LABELS
  // ---------------------------
  addCardLabel(data: AddCardLabelRequest, user: AuthenticatedUser) {
    return firstValueFrom(
      this.cardsServiceGrpc.AddCardLabel(
        data,
        buildRequiredUserMetadata(user),
      ),
    );
  }

  removeCardLabel(data: RemoveCardLabelRequest, user: AuthenticatedUser) {
    return firstValueFrom(
      this.cardsServiceGrpc.RemoveCardLabel(
        data,
        buildRequiredUserMetadata(user),
      ),
    );
  }

  createLabel(data: CreateLabelRequest, user: AuthenticatedUser) {
    return firstValueFrom(
      this.cardsServiceGrpc.CreateLabel(data, buildRequiredUserMetadata(user)),
    );
  }

  listWorkspaceLabels(
    data: ListWorkspaceLabelsRequest,
    user: AuthenticatedUser,
  ) {
    return firstValueFrom(
      this.cardsServiceGrpc.ListWorkspaceLabels(
        data,
        buildRequiredUserMetadata(user),
      ),
    );
  }

  deleteLabel(data: DeleteLabelRequest, user: AuthenticatedUser) {
    return firstValueFrom(
      this.cardsServiceGrpc.DeleteLabel(data, buildRequiredUserMetadata(user)),
    );
  }

  // ---------------------------
  // COMMENTS
  // ---------------------------
  addComment(data: AddCommentRequest, user: AuthenticatedUser) {
    return firstValueFrom(
      this.cardsServiceGrpc.AddComment(data, buildRequiredUserMetadata(user)),
    );
  }

  listCardComments(data: ListCardCommentsRequest, user: AuthenticatedUser) {
    return firstValueFrom(
      this.cardsServiceGrpc.ListCardComments(
        data,
        buildRequiredUserMetadata(user),
      ),
    );
  }

  deleteComment(data: DeleteCommentRequest, user: AuthenticatedUser) {
    return firstValueFrom(
      this.cardsServiceGrpc.DeleteComment(
        data,
        buildRequiredUserMetadata(user),
      ),
    );
  }

  // ---------------------------
  // CHECKLISTS
  // ---------------------------
  createChecklist(data: CreateChecklistRequest, user: AuthenticatedUser) {
    return firstValueFrom(
      this.cardsServiceGrpc.CreateChecklist(
        data,
        buildRequiredUserMetadata(user),
      ),
    );
  }

  listCardChecklists(data: ListCardChecklistsRequest, user: AuthenticatedUser) {
    return firstValueFrom(
      this.cardsServiceGrpc.ListCardChecklists(
        data,
        buildRequiredUserMetadata(user),
      ),
    );
  }

  addChecklistItem(data: AddChecklistItemRequest, user: AuthenticatedUser) {
    return firstValueFrom(
      this.cardsServiceGrpc.AddChecklistItem(
        data,
        buildRequiredUserMetadata(user),
      ),
    );
  }

  toggleChecklistItem(
    data: ToggleChecklistItemRequest,
    user: AuthenticatedUser,
  ) {
    return firstValueFrom(
      this.cardsServiceGrpc.ToggleChecklistItem(
        data,
        buildRequiredUserMetadata(user),
      ),
    );
  }

  deleteChecklist(data: DeleteChecklistRequest, user: AuthenticatedUser) {
    return firstValueFrom(
      this.cardsServiceGrpc.DeleteChecklist(
        data,
        buildRequiredUserMetadata(user),
      ),
    );
  }

  deleteChecklistItem(
    data: DeleteChecklistItemRequest,
    user: AuthenticatedUser,
  ) {
    return firstValueFrom(
      this.cardsServiceGrpc.DeleteChecklistItem(
        data,
        buildRequiredUserMetadata(user),
      ),
    );
  }
}
