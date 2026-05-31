import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Metadata } from '@grpc/grpc-js';
import type { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';

import type { AuthenticatedUser } from '../../shared/types/auth';
import type { ActionResponse } from '../../shared/types/workspace/common';
import { buildRequiredUserMetadata } from '../../shared/utils/grpc-user-metadata';
import type {
  CheckPermissionRequest,
  CheckPermissionResponse,
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

@Injectable()
export class WorkspaceRolesService implements OnModuleInit {
  private workspaceRolesServiceGrpc!: WorkspaceRolesServiceGrpc;

  constructor(@Inject('WORKSPACE_ROLES_SERVICE') private client: ClientGrpc) {}

  onModuleInit() {
    this.workspaceRolesServiceGrpc =
      this.client.getService<WorkspaceRolesServiceGrpc>('WorkspaceRoleService');
  }

  getWorkspaceRoleFromAuthZ(
    data: GetWorkspaceRoleFromAuthZRequest,
    user: AuthenticatedUser,
  ) {
    return firstValueFrom(
      this.workspaceRolesServiceGrpc.GetWorkspaceRoleFromAuthZ(
        data,
        buildRequiredUserMetadata(user),
      ),
    );
  }

  getWorkspaceRolesPermissionsFromAuthZ(
    data: GetWorkspaceRolesPermissionsFromAuthZRequest,
  ) {
    return firstValueFrom(
      this.workspaceRolesServiceGrpc.GetWorkspaceRolesPermissionsFromAuthZ(
        data,
      ),
    );
  }

  deleteWorkspaceRole(
    data: DeleteWorkspaceRoleReferenceRequest,
    user: AuthenticatedUser,
  ) {
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

  getWorkspaceRoles(data: GetWorkspaceRolesRequest, user: AuthenticatedUser) {
    return firstValueFrom(
      this.workspaceRolesServiceGrpc.GetWorkspaceRoles(
        data,
        buildRequiredUserMetadata(user),
      ),
    );
  }
}
