import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Metadata } from '@grpc/grpc-js';
import type { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';

import type { AuthenticatedUser } from '../../shared/types/auth/authenticated-user';
import type { ActionResponse } from '../../shared/types/workspace/common';
import { buildRequiredUserMetadata } from '../../shared/utils/grpc-user-metadata';
import type {
  AddBoardMemberRequest,
  ListBoardMembersRequest,
  ListBoardMembersResponse,
  RemoveBoardMemberRequest,
} from './types';

interface BoardMembersServiceGrpc {
  AddBoardMember(
    data: AddBoardMemberRequest,
    metadata: Metadata,
  ): Observable<ActionResponse>;
  RemoveBoardMember(
    data: RemoveBoardMemberRequest,
    metadata: Metadata,
  ): Observable<ActionResponse>;
  ListBoardMembers(
    data: ListBoardMembersRequest,
  ): Observable<ListBoardMembersResponse>;
}

@Injectable()
export class BoardMembersService implements OnModuleInit {
  private boardMembersServiceGrpc!: BoardMembersServiceGrpc;

  constructor(
    @Inject('WORKSPACE_BOARD_MEMBERS_SERVICE') private client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.boardMembersServiceGrpc =
      this.client.getService<BoardMembersServiceGrpc>('BoardMembersService');
  }

  addBoardMember(data: AddBoardMemberRequest, user: AuthenticatedUser) {
    return firstValueFrom(
      this.boardMembersServiceGrpc.AddBoardMember(
        data,
        buildRequiredUserMetadata(user),
      ),
    );
  }

  removeBoardMember(data: RemoveBoardMemberRequest, user: AuthenticatedUser) {
    return firstValueFrom(
      this.boardMembersServiceGrpc.RemoveBoardMember(
        data,
        buildRequiredUserMetadata(user),
      ),
    );
  }

  listBoardMembers(data: ListBoardMembersRequest) {
    return firstValueFrom(this.boardMembersServiceGrpc.ListBoardMembers(data));
  }
}
