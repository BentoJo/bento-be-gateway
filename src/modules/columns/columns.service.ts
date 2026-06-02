import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { Metadata } from '@grpc/grpc-js';
import { firstValueFrom, Observable } from 'rxjs';

import type { AuthenticatedUser } from '../../shared/types/auth/authenticated-user';
import type { ActionResponse } from '../../shared/types/workspace/common';
import { buildRequiredUserMetadata } from '../../shared/utils/grpc-user-metadata';
import type {
  ArchiveColumnRequest,
  BulkReorderColumnsRequest,
  ColumnResponse,
  CreateColumnRequest,
  DeleteColumnRequest,
  ListBoardColumnsRequest,
  ListBoardColumnsResponse,
  ListColumnCardsRequest,
  ListColumnCardsResponse,
  ReorderColumnRequest,
  RestoreColumnRequest,
  UnarchiveColumnRequest,
  UpdateColumnRequest,
} from './types';

interface ColumnsServiceGrpc {
  CreateColumn(
    data: CreateColumnRequest,
    metadata: Metadata,
  ): Observable<ColumnResponse>;
  UpdateColumn(
    data: UpdateColumnRequest,
    metadata: Metadata,
  ): Observable<ColumnResponse>;
  DeleteColumn(
    data: DeleteColumnRequest,
    metadata: Metadata,
  ): Observable<ActionResponse>;
  RestoreColumn(
    data: RestoreColumnRequest,
    metadata: Metadata,
  ): Observable<ActionResponse>;
  ArchiveColumn(
    data: ArchiveColumnRequest,
    metadata: Metadata,
  ): Observable<ActionResponse>;
  UnarchiveColumn(
    data: UnarchiveColumnRequest,
    metadata: Metadata,
  ): Observable<ActionResponse>;
  ListBoardColumns(
    data: ListBoardColumnsRequest,
    metadata: Metadata,
  ): Observable<ListBoardColumnsResponse>;
  ReorderColumn(
    data: ReorderColumnRequest,
    metadata: Metadata,
  ): Observable<ActionResponse>;
  BulkReorderColumns(
    data: BulkReorderColumnsRequest,
    metadata: Metadata,
  ): Observable<ActionResponse>;
  ListColumnCards(
    data: ListColumnCardsRequest,
    metadata: Metadata,
  ): Observable<ListColumnCardsResponse>;
}

@Injectable()
export class ColumnsService implements OnModuleInit {
  private columnsServiceGrpc!: ColumnsServiceGrpc;

  constructor(
    @Inject('WORKSPACE_COLUMNS_SERVICE') private client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.columnsServiceGrpc =
      this.client.getService<ColumnsServiceGrpc>('ColumnService');
  }

  createColumn(data: CreateColumnRequest, user: AuthenticatedUser) {
    return firstValueFrom(
      this.columnsServiceGrpc.CreateColumn(
        data,
        buildRequiredUserMetadata(user),
      ),
    );
  }

  updateColumn(data: UpdateColumnRequest, user: AuthenticatedUser) {
    return firstValueFrom(
      this.columnsServiceGrpc.UpdateColumn(
        data,
        buildRequiredUserMetadata(user),
      ),
    );
  }

  deleteColumn(data: DeleteColumnRequest, user: AuthenticatedUser) {
    return firstValueFrom(
      this.columnsServiceGrpc.DeleteColumn(
        data,
        buildRequiredUserMetadata(user),
      ),
    );
  }

  restoreColumn(data: RestoreColumnRequest, user: AuthenticatedUser) {
    return firstValueFrom(
      this.columnsServiceGrpc.RestoreColumn(
        data,
        buildRequiredUserMetadata(user),
      ),
    );
  }

  archiveColumn(data: ArchiveColumnRequest, user: AuthenticatedUser) {
    return firstValueFrom(
      this.columnsServiceGrpc.ArchiveColumn(
        data,
        buildRequiredUserMetadata(user),
      ),
    );
  }

  unarchiveColumn(data: UnarchiveColumnRequest, user: AuthenticatedUser) {
    return firstValueFrom(
      this.columnsServiceGrpc.UnarchiveColumn(
        data,
        buildRequiredUserMetadata(user),
      ),
    );
  }

  listBoardColumns(data: ListBoardColumnsRequest, user: AuthenticatedUser) {
    return firstValueFrom(
      this.columnsServiceGrpc.ListBoardColumns(
        data,
        buildRequiredUserMetadata(user),
      ),
    );
  }

  reorderColumn(data: ReorderColumnRequest, user: AuthenticatedUser) {
    return firstValueFrom(
      this.columnsServiceGrpc.ReorderColumn(
        data,
        buildRequiredUserMetadata(user),
      ),
    );
  }

  bulkReorderColumns(data: BulkReorderColumnsRequest, user: AuthenticatedUser) {
    return firstValueFrom(
      this.columnsServiceGrpc.BulkReorderColumns(
        data,
        buildRequiredUserMetadata(user),
      ),
    );
  }

  listColumnCards(data: ListColumnCardsRequest, user: AuthenticatedUser) {
    return firstValueFrom(
      this.columnsServiceGrpc.ListColumnCards(
        data,
        buildRequiredUserMetadata(user),
      ),
    );
  }
}
