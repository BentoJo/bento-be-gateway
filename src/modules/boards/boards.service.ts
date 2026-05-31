import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { Metadata } from '@grpc/grpc-js';
import { firstValueFrom, Observable } from 'rxjs';

import type { AuthenticatedUser } from '../../shared/types/auth/authenticated-user';
import type { ActionResponse } from '../../shared/types/workspace/common';
import { buildRequiredUserMetadata } from '../../shared/utils/grpc-user-metadata';
import type {
  ArchiveBoardRequest,
  BoardResponse,
  CreateBoardRequest,
  DeleteBoardRequest,
  FavoriteBoardRequest,
  GetBoardRequest,
  ListBoardsRequest,
  ListBoardsResponse,
  ListFavoriteBoardsRequest,
  ListFavoriteBoardsResponse,
  RestoreBoardRequest,
  UnarchiveBoardRequest,
  UnfavoriteBoardRequest,
  UpdateBoardRequest,
} from './types';

interface BoardsServiceGrpc {
  CreateBoard(
    data: CreateBoardRequest,
    metadata: Metadata,
  ): Observable<BoardResponse>;
  GetBoard(
    data: GetBoardRequest,
    metadata: Metadata,
  ): Observable<BoardResponse>;
  UpdateBoard(
    data: UpdateBoardRequest,
    metadata: Metadata,
  ): Observable<BoardResponse>;
  DeleteBoard(
    data: DeleteBoardRequest,
    metadata: Metadata,
  ): Observable<ActionResponse>;
  RestoreBoard(
    data: RestoreBoardRequest,
    metadata: Metadata,
  ): Observable<ActionResponse>;
  ArchiveBoard(
    data: ArchiveBoardRequest,
    metadata: Metadata,
  ): Observable<ActionResponse>;
  UnarchiveBoard(
    data: UnarchiveBoardRequest,
    metadata: Metadata,
  ): Observable<ActionResponse>;
  FavoriteBoard(
    data: FavoriteBoardRequest,
    metadata: Metadata,
  ): Observable<ActionResponse>;
  UnfavoriteBoard(
    data: UnfavoriteBoardRequest,
    metadata: Metadata,
  ): Observable<ActionResponse>;
  ListWorkspaceBoards(
    data: ListBoardsRequest,
    metadata: Metadata,
  ): Observable<ListBoardsResponse>;
  ListFavoriteBoards(
    data: ListFavoriteBoardsRequest,
    metadata: Metadata,
  ): Observable<ListFavoriteBoardsResponse>;
}

@Injectable()
export class BoardsService implements OnModuleInit {
  private boardsServiceGrpc!: BoardsServiceGrpc;

  constructor(@Inject('WORKSPACE_BOARDS_SERVICE') private client: ClientGrpc) {}

  onModuleInit() {
    this.boardsServiceGrpc =
      this.client.getService<BoardsServiceGrpc>('BoardService');
  }

  createBoard(data: CreateBoardRequest, user: AuthenticatedUser) {
    return firstValueFrom(
      this.boardsServiceGrpc.CreateBoard(data, buildRequiredUserMetadata(user)),
    );
  }

  getBoard(data: GetBoardRequest, user: AuthenticatedUser) {
    return firstValueFrom(
      this.boardsServiceGrpc.GetBoard(data, buildRequiredUserMetadata(user)),
    );
  }

  updateBoard(data: UpdateBoardRequest, user: AuthenticatedUser) {
    return firstValueFrom(
      this.boardsServiceGrpc.UpdateBoard(data, buildRequiredUserMetadata(user)),
    );
  }

  deleteBoard(data: DeleteBoardRequest, user: AuthenticatedUser) {
    return firstValueFrom(
      this.boardsServiceGrpc.DeleteBoard(data, buildRequiredUserMetadata(user)),
    );
  }

  restoreBoard(data: RestoreBoardRequest, user: AuthenticatedUser) {
    return firstValueFrom(
      this.boardsServiceGrpc.RestoreBoard(
        data,
        buildRequiredUserMetadata(user),
      ),
    );
  }

  archiveBoard(data: ArchiveBoardRequest, user: AuthenticatedUser) {
    return firstValueFrom(
      this.boardsServiceGrpc.ArchiveBoard(
        data,
        buildRequiredUserMetadata(user),
      ),
    );
  }

  unarchiveBoard(data: UnarchiveBoardRequest, user: AuthenticatedUser) {
    return firstValueFrom(
      this.boardsServiceGrpc.UnarchiveBoard(
        data,
        buildRequiredUserMetadata(user),
      ),
    );
  }

  favoriteBoard(data: FavoriteBoardRequest, user: AuthenticatedUser) {
    return firstValueFrom(
      this.boardsServiceGrpc.FavoriteBoard(
        data,
        buildRequiredUserMetadata(user),
      ),
    );
  }

  unfavoriteBoard(data: UnfavoriteBoardRequest, user: AuthenticatedUser) {
    return firstValueFrom(
      this.boardsServiceGrpc.UnfavoriteBoard(
        data,
        buildRequiredUserMetadata(user),
      ),
    );
  }

  listWorkspaceBoards(data: ListBoardsRequest, user: AuthenticatedUser) {
    return firstValueFrom(
      this.boardsServiceGrpc.ListWorkspaceBoards(
        data,
        buildRequiredUserMetadata(user),
      ),
    );
  }

  listFavoriteBoards(data: ListFavoriteBoardsRequest, user: AuthenticatedUser) {
    return firstValueFrom(
      this.boardsServiceGrpc.ListFavoriteBoards(
        data,
        buildRequiredUserMetadata(user),
      ),
    );
  }
}
