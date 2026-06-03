import {
  ForbiddenException,
  Inject,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { Metadata } from '@grpc/grpc-js';
import type { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';

import type { AuthenticatedUser } from '../../shared/types/auth';
import type { ActionResponse } from '../../shared/types/workspace/common';
import { buildRequiredUserMetadata } from '../../shared/utils/grpc-user-metadata';
import type {
  AuthzAssignPermissionsRequest,
  AuthzAssignPermissionsResponse,
  AuthzCreateRoleRequest,
  AuthzCreateRoleResponse,
  CheckPermissionRequest,
  CheckPermissionResponse,
  CreateWorkspaceRoleRequest,
  CreateWorkspaceRoleResponse,
  DeleteWorkspaceRoleReferenceRequest,
  GetWorkspaceMemberRoleRequest,
  GetWorkspaceMemberRoleResponse,
  GetWorkspaceRoleFromAuthZRequest,
  GetWorkspaceRolesPermissionsFromAuthZRequest,
  GetWorkspaceRolesRequest,
  GetWorkspaceRolesResponse,
  WorkspaceRolePermissionsResponse,
  WorkspaceRoleReferenceResponse,
} from './types';

interface WorkspaceRolesServiceGrpc {
  GetWorkspaceRoleFromAuthZ(
    data: GetWorkspaceRoleFromAuthZRequest,
    metadata: Metadata,
  ): Observable<WorkspaceRoleReferenceResponse>;
  GetWorkspaceRolesPermissionsFromAuthZ(
    data: GetWorkspaceRolesPermissionsFromAuthZRequest,
  ): Observable<WorkspaceRolePermissionsResponse>;
  DeleteWorkspaceRole(
    data: DeleteWorkspaceRoleReferenceRequest,
    metadata: Metadata,
  ): Observable<ActionResponse>;
  GetWorkspaceMemberRole(
    data: GetWorkspaceMemberRoleRequest,
  ): Observable<GetWorkspaceMemberRoleResponse>;
  CheckPermission(
    data: CheckPermissionRequest,
  ): Observable<CheckPermissionResponse>;
  GetWorkspaceRoles(
    data: GetWorkspaceRolesRequest,
    metadata: Metadata,
  ): Observable<GetWorkspaceRolesResponse>;
}

interface AuthzServiceGrpc {
  CreateRole(data: AuthzCreateRoleRequest): Observable<AuthzCreateRoleResponse>;
  AssignPermissionsToRole(
    data: AuthzAssignPermissionsRequest,
  ): Observable<AuthzAssignPermissionsResponse>;
}

@Injectable()
export class WorkspaceRolesService implements OnModuleInit {
  private workspaceRolesServiceGrpc!: WorkspaceRolesServiceGrpc;
  private authzServiceGrpc!: AuthzServiceGrpc;

  constructor(
    @Inject('WORKSPACE_ROLES_SERVICE') private client: ClientGrpc,
    @Inject('AUTHZ_SERVICE') private authzClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.workspaceRolesServiceGrpc =
      this.client.getService<WorkspaceRolesServiceGrpc>('WorkspaceRoleService');
    this.authzServiceGrpc = this.authzClient.getService<AuthzServiceGrpc>(
      'AuthorizationService',
    );
  }

  /**
   * Resolves the caller's authz role id for a workspace.
   *
   * The ws-side PermissionsGuard reads `data.roleId` and runs
   * authz.checkPermission({ roleId, scopeId, permission }). The gateway must
   * therefore resolve the current user's role for the workspace BEFORE calling
   * any permission-gated roles RPC, otherwise `roleId` is undefined and the
   * guard denies the request (even for the workspace owner).
   *
   * Uses the existing, NON permission-gated `GetWorkspaceMemberRole`
   * (workspaceId, userId) RPC which returns the member's `authzRoleId`.
   *
   * @throws ForbiddenException if the user is not a member of the workspace
   *   (no role can be resolved) -> surfaces as a clean 403.
   */
  private async resolveMemberRoleId(
    workspaceId: string,
    userId: string,
  ): Promise<string> {
    let authzRoleId: string | undefined;
    try {
      const res = await firstValueFrom(
        this.workspaceRolesServiceGrpc.GetWorkspaceMemberRole({
          workspaceId,
          userId,
        }),
      );
      authzRoleId = res?.authzRoleId;
    } catch {
      authzRoleId = undefined;
    }

    if (!authzRoleId) {
      throw new ForbiddenException('You do not have a role in this workspace');
    }

    return authzRoleId;
  }

  async getWorkspaceRoleFromAuthZ(
    data: GetWorkspaceRoleFromAuthZRequest,
    user: AuthenticatedUser,
  ) {
    // const roleId = await this.resolveMemberRoleId(data.workspaceId, user.id);
    return firstValueFrom(
      this.workspaceRolesServiceGrpc.GetWorkspaceRoleFromAuthZ(
        data,
        buildRequiredUserMetadata(user),
      ),
    );
  }

  async getWorkspaceRolesPermissionsFromAuthZ(
    data: GetWorkspaceRolesPermissionsFromAuthZRequest,
  ) {
    // const roleId = await this.resolveMemberRoleId(data.workspaceId, user.id);
    return firstValueFrom(
      this.workspaceRolesServiceGrpc.GetWorkspaceRolesPermissionsFromAuthZ(
        data,
      ),
    );
  }

  async deleteWorkspaceRole(
    data: DeleteWorkspaceRoleReferenceRequest,
    user: AuthenticatedUser,
  ) {
    // const roleId = await this.resolveMemberRoleId(data.workspaceId, user.id);
    return firstValueFrom(
      this.workspaceRolesServiceGrpc.DeleteWorkspaceRole(
        data,
        buildRequiredUserMetadata(user),
      ),
    );
  }

  getWorkspaceMemberRole(data: GetWorkspaceMemberRoleRequest) {
    return firstValueFrom(
      this.workspaceRolesServiceGrpc.GetWorkspaceMemberRole(data),
    );
  }

  checkPermission(data: CheckPermissionRequest) {
    return firstValueFrom(this.workspaceRolesServiceGrpc.CheckPermission(data));
  }

  async getWorkspaceRoles(
    data: GetWorkspaceRolesRequest,
    user: AuthenticatedUser,
  ) {
    // const roleId = await this.resolveMemberRoleId(data.workspaceId, user.id);
    return firstValueFrom(
      this.workspaceRolesServiceGrpc.GetWorkspaceRoles(
        data,
        buildRequiredUserMetadata(user),
      ),
    );
    // TODO(BE): include `assignedUsersCount` per role in the response.
    // Not added here because it is not cheaply available: it would require
    // paginating the full ListWorkspaceMembers result and grouping members by
    // authzRoleId. Prefer a dedicated ws RPC (e.g. CountMembersByRole) before
    // surfacing this field. Do not fabricate the count.
  }

  /**
   * Creates a custom workspace role with the selected permissions by proxying
   * to the AuthZ AuthorizationService:
   *   1. CreateRole(name, scopeType='workspace', scopeId=workspaceId, ...)
   *   2. AssignPermissionsToRole(roleId, permissionIds, scopeId=workspaceId)
   *
   * The caller's role is resolved first so a non-member gets a clean 403.
   */
  async createWorkspaceRole(
    workspaceId: string,
    body: CreateWorkspaceRoleRequest,
    user: AuthenticatedUser,
  ): Promise<CreateWorkspaceRoleResponse> {
    // Ensure the caller belongs to the workspace before mutating roles.
    await this.resolveMemberRoleId(workspaceId, user.id);

    const created = await firstValueFrom(
      this.authzServiceGrpc.CreateRole({
        name: body.name,
        scopeType: 'workspace',
        scopeId: workspaceId,
        isSystem: false,
        createdBy: user.id,
      }),
    );

    const permissions = body.permissions ?? [];
    if (permissions.length > 0) {
      await firstValueFrom(
        this.authzServiceGrpc.AssignPermissionsToRole({
          roleId: created.roleId,
          scopeId: workspaceId,
          permissionIds: permissions,
        }),
      );
    }

    return {
      roleId: created.roleId,
      name: body.name,
      permissions,
    };
  }
}
