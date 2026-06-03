import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Metadata } from '@grpc/grpc-js';
import type { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';

import type { AuthenticatedUser } from '../../shared/types/auth';
import type { ActionResponse } from '../../shared/types/workspace/common';
import { buildRequiredUserMetadata } from '../../shared/utils/grpc-user-metadata';
import type {
  AcceptWorkspaceInviteRequest,
  EnrichedListWorkspaceMembersResponse,
  GetUsersByIdsResponse,
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
  WorkspaceInviteListItem,
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

interface IamUserServiceGrpc {
  GetUsersByIds(data: { userIds: string[] }): Observable<GetUsersByIdsResponse>;
}

@Injectable()
export class WorkspaceMembersService implements OnModuleInit {
  private readonly logger = new Logger(WorkspaceMembersService.name);
  private workspaceMembersServiceGrpc!: WorkspaceMembersServiceGrpc;
  private iamUserServiceGrpc!: IamUserServiceGrpc;

  constructor(
    @Inject('WORKSPACE_MEMBERS_SERVICE') private client: ClientGrpc,
    @Inject('IAM_USER_SERVICE') private iamUserClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.workspaceMembersServiceGrpc =
      this.client.getService<WorkspaceMembersServiceGrpc>(
        'WorkspaceMemberService',
      );
    this.iamUserServiceGrpc =
      this.iamUserClient.getService<IamUserServiceGrpc>('UserService');
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

  async listWorkspaceMembers(
    data: ListWorkspaceMembersRequest,
    user: AuthenticatedUser,
  ): Promise<EnrichedListWorkspaceMembersResponse> {
    const result = await firstValueFrom(
      this.workspaceMembersServiceGrpc.ListWorkspaceMembers(
        data,
        buildRequiredUserMetadata(user),
      ),
    );

    const members = result.members ?? [];
    const profilesById = await this.fetchUserProfiles(
      members.map((member) => member.userId),
    );

    return {
      ...result,
      members: members.map((member) => {
        const profile = profilesById.get(member.userId);
        return {
          ...member,
          firstName: profile?.firstName ?? null,
          lastName: profile?.lastName ?? null,
          email: profile?.email ?? null,
          avatarUrl: profile?.avatarUrl ?? null,
        };
      }),
    };
  }

  /**
   * Batch-loads IAM user profiles, degrading gracefully: if the IAM call
   * fails (or returns nothing) we log and return an empty map so member
   * listing still succeeds without enrichment rather than crashing.
   */
  private async fetchUserProfiles(userIds: string[]) {
    const profilesById = new Map<
      string,
      GetUsersByIdsResponse['users'][number]
    >();

    const uniqueIds = [...new Set(userIds.filter(Boolean))];
    if (uniqueIds.length === 0) {
      return profilesById;
    }

    try {
      const { users } = await firstValueFrom(
        this.iamUserServiceGrpc.GetUsersByIds({ userIds: uniqueIds }),
      );
      for (const profile of users ?? []) {
        profilesById.set(profile.id, profile);
      }
    } catch (error) {
      this.logger.warn(
        `IAM GetUsersByIds enrichment failed; returning members without profiles: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }

    return profilesById;
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

  /**
   * Lists the current user's pending invitations across all workspaces.
   *
   * TODO(BE): The Workspace service does not yet expose a by-user / by-email
   * invite RPC — `ListWorkspaceInvites` is strictly per-workspace and filters
   * by workspaceId only. There is no cross-workspace "my invites" query, and
   * the gateway has no list of workspaceIds to fan out over for a non-member
   * invitee. We therefore return an empty list rather than fabricating data.
   * Once WS adds e.g. `ListInvitesForUser({ userId | email })`, wire it here.
   */
  listMyInvitations(): {
    invites: WorkspaceInviteListItem[];
  } {
    return { invites: [] };
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
