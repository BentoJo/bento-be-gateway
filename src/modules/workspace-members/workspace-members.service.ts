import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Metadata } from '@grpc/grpc-js';
import type { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';

import type { AuthenticatedUser } from '../../shared/types/auth';
import type { ActionResponse } from '../../shared/types/workspace/common';
import { buildRequiredUserMetadata } from '../../shared/utils/grpc-user-metadata';
import type {
  AcceptWorkspaceInviteRequest,
  GetWorkspaceMemberRequest,
  GetWorkspaceMemberRoleRequest,
  InviteWorkspaceMemberRequest,
  ListWorkspaceInvitesRequest,
  ListWorkspaceInvitesResponse,
  ListWorkspaceMembersRequest,
  ListWorkspaceMembersResponse,
  RejectWorkspaceInviteRequest,
  RemoveWorkspaceMemberRequest,
  UpdateWorkspaceMemberRoleRequest,
  ValidateWorkspaceMembershipRequest,
  ValidateWorkspaceMembershipResponse,
  WorkspaceInviteResponse,
  WorkspaceMemberResponse,
  WorkspaceMemberRoleResponse,
  WorkspaceMembershipResponse,
} from './types';

interface WorkspaceMembersServiceGrpc {
  InviteWorkspaceMember(
    data: InviteWorkspaceMemberRequest,
    metadata: Metadata,
  ): Observable<WorkspaceInviteResponse>;
  AcceptWorkspaceInvite(
    data: AcceptWorkspaceInviteRequest,
    metadata: Metadata,
  ): Observable<WorkspaceMembershipResponse>;
  RejectWorkspaceInvite(
    data: RejectWorkspaceInviteRequest,
  ): Observable<ActionResponse>;
  RemoveWorkspaceMember(
    data: RemoveWorkspaceMemberRequest,
    metadata: Metadata,
  ): Observable<ActionResponse>;
  GetWorkspaceMember(
    data: GetWorkspaceMemberRequest,
    metadata: Metadata,
  ): Observable<WorkspaceMemberResponse>;
  ListWorkspaceMembers(
    data: ListWorkspaceMembersRequest,
    metadata: Metadata,
  ): Observable<ListWorkspaceMembersResponse>;
  ListWorkspaceInvites(
    data: ListWorkspaceInvitesRequest,
    metadata: Metadata,
  ): Observable<ListWorkspaceInvitesResponse>;
  UpdateWorkspaceMemberRole(
    data: UpdateWorkspaceMemberRoleRequest,
    metadata: Metadata,
  ): Observable<WorkspaceMemberResponse>;
  GetWorkspaceMemberRole(
    data: GetWorkspaceMemberRoleRequest,
    metadata: Metadata,
  ): Observable<WorkspaceMemberRoleResponse>;
  ValidateWorkspaceMembership(
    data: ValidateWorkspaceMembershipRequest,
  ): Observable<ValidateWorkspaceMembershipResponse>;
}

@Injectable()
export class WorkspaceMembersService implements OnModuleInit {
  private workspaceMembersServiceGrpc!: WorkspaceMembersServiceGrpc;

  constructor(
    @Inject('WORKSPACE_MEMBERS_SERVICE') private client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.workspaceMembersServiceGrpc =
      this.client.getService<WorkspaceMembersServiceGrpc>(
        'WorkspaceMemberService',
      );
  }

  inviteWorkspaceMember(
    data: InviteWorkspaceMemberRequest,
    user: AuthenticatedUser,
  ) {
    return firstValueFrom(
      this.workspaceMembersServiceGrpc.InviteWorkspaceMember(
        data,
        buildRequiredUserMetadata(user),
      ),
    );
  }

  acceptWorkspaceInvite(
    data: AcceptWorkspaceInviteRequest,
    user: AuthenticatedUser,
  ) {
    return firstValueFrom(
      this.workspaceMembersServiceGrpc.AcceptWorkspaceInvite(
        data,
        buildRequiredUserMetadata(user),
      ),
    );
  }

  rejectWorkspaceInvite(data: RejectWorkspaceInviteRequest) {
    return firstValueFrom(
      this.workspaceMembersServiceGrpc.RejectWorkspaceInvite(data),
    );
  }

  removeWorkspaceMember(
    data: RemoveWorkspaceMemberRequest,
    user: AuthenticatedUser,
  ) {
    return firstValueFrom(
      this.workspaceMembersServiceGrpc.RemoveWorkspaceMember(
        data,
        buildRequiredUserMetadata(user),
      ),
    );
  }

  getWorkspaceMember(data: GetWorkspaceMemberRequest, user: AuthenticatedUser) {
    return firstValueFrom(
      this.workspaceMembersServiceGrpc.GetWorkspaceMember(
        data,
        buildRequiredUserMetadata(user),
      ),
    );
  }

  listWorkspaceMembers(
    data: ListWorkspaceMembersRequest,
    user: AuthenticatedUser,
  ) {
    return firstValueFrom(
      this.workspaceMembersServiceGrpc.ListWorkspaceMembers(
        data,
        buildRequiredUserMetadata(user),
      ),
    );
  }

  listWorkspaceInvites(
    data: ListWorkspaceInvitesRequest,
    user: AuthenticatedUser,
  ) {
    return firstValueFrom(
      this.workspaceMembersServiceGrpc.ListWorkspaceInvites(
        data,
        buildRequiredUserMetadata(user),
      ),
    );
  }

  updateWorkspaceMemberRole(
    data: UpdateWorkspaceMemberRoleRequest,
    user: AuthenticatedUser,
  ) {
    return firstValueFrom(
      this.workspaceMembersServiceGrpc.UpdateWorkspaceMemberRole(
        data,
        buildRequiredUserMetadata(user),
      ),
    );
  }

  getWorkspaceMemberRole(
    data: GetWorkspaceMemberRoleRequest,
    user: AuthenticatedUser,
  ) {
    return firstValueFrom(
      this.workspaceMembersServiceGrpc.GetWorkspaceMemberRole(
        data,
        buildRequiredUserMetadata(user),
      ),
    );
  }

  validateWorkspaceMembership(data: ValidateWorkspaceMembershipRequest) {
    return firstValueFrom(
      this.workspaceMembersServiceGrpc.ValidateWorkspaceMembership(data),
    );
  }
}
