import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { Metadata } from '@grpc/grpc-js';
import {
  CreateWorkspaceRequest,
  GetWorkspaceRequest,
  UpdateWorkspaceRequest,
  DeleteWorkspaceRequest,
  RestoreWorkspaceRequest,
  GetWorkspaceOverviewRequest,
  TransferWorkspaceOwnershipRequest,
  WorkspaceResponse,
  GetWorkspaceOverviewResponse,
  ListUserWorkspacesRequest,
  ListUserWorkspacesResponse,
} from '../../shared/types/workspace/workspace';
import { Observable } from 'rxjs';
import { ActionResponse } from '../../shared/types/workspace/common';
import type { ClientGrpc } from '@nestjs/microservices';
import type { AuthenticatedUser } from '../../shared/types/auth';
import { buildRequiredUserMetadata } from '../../shared/utils/grpc-user-metadata';

interface WorkspaceServiceGrpc {
  CreateWorkspace(
    data: CreateWorkspaceRequest,
    metadata: Metadata,
  ): Observable<WorkspaceResponse>;
  GetWorkspace(
    data: GetWorkspaceRequest,
    metadata: Metadata,
  ): Observable<ActionResponse>;
  UpdateWorkspace(
    data: UpdateWorkspaceRequest,
    metadata: Metadata,
  ): Observable<WorkspaceResponse>;
  DeleteWorkspace(
    data: DeleteWorkspaceRequest,
    metadata: Metadata,
  ): Observable<ActionResponse>;
  RestoreWorkspace(
    data: RestoreWorkspaceRequest,
    metadata: Metadata,
  ): Observable<ActionResponse>;
  GetWorkspaceOverview(
    data: GetWorkspaceOverviewRequest,
    metadata: Metadata,
  ): Observable<GetWorkspaceOverviewResponse>;
  TransferWorkspaceOwnership(
    data: TransferWorkspaceOwnershipRequest,
    metadata: Metadata,
  ): Observable<ActionResponse>;
  ListUserWorkspaces(
    data: { data: ListUserWorkspacesRequest },
    metadata: Metadata,
  ): Observable<ListUserWorkspacesResponse>;
}

@Injectable()
export class WorkspaceService implements OnModuleInit {
  private workspaceServiceGrpc!: WorkspaceServiceGrpc;

  constructor(@Inject('WORKSPACE_SERVICE') private client: ClientGrpc) {}

  onModuleInit() {
    this.workspaceServiceGrpc =
      this.client.getService<WorkspaceServiceGrpc>('WorkspaceService');
  }

  createWorkspace(data: CreateWorkspaceRequest, user: AuthenticatedUser) {
    return this.workspaceServiceGrpc.CreateWorkspace(
      data,
      buildRequiredUserMetadata(user),
    );
  }

  getWorkspaceById(data: GetWorkspaceRequest, user: AuthenticatedUser) {
    return this.workspaceServiceGrpc.GetWorkspace(
      data,
      buildRequiredUserMetadata(user),
    );
  }

  updateWorkspace(data: UpdateWorkspaceRequest, user: AuthenticatedUser) {
    return this.workspaceServiceGrpc.UpdateWorkspace(
      data,
      buildRequiredUserMetadata(user),
    );
  }

  deleteWorkspace(data: DeleteWorkspaceRequest, user: AuthenticatedUser) {
    return this.workspaceServiceGrpc.DeleteWorkspace(
      data,
      buildRequiredUserMetadata(user),
    );
  }

  restoreWorkspace(data: RestoreWorkspaceRequest, user: AuthenticatedUser) {
    return this.workspaceServiceGrpc.RestoreWorkspace(
      data,
      buildRequiredUserMetadata(user),
    );
  }

  getWorkspaceOverview(
    data: GetWorkspaceOverviewRequest,
    user: AuthenticatedUser,
  ) {
    return this.workspaceServiceGrpc.GetWorkspaceOverview(
      data,
      buildRequiredUserMetadata(user),
    );
  }

  transferWorkspaceOwnership(
    data: TransferWorkspaceOwnershipRequest,
    user: AuthenticatedUser,
  ) {
    return this.workspaceServiceGrpc.TransferWorkspaceOwnership(
      data,
      buildRequiredUserMetadata(user),
    );
  }

  listUserWorkspaces(data: ListUserWorkspacesRequest, user: AuthenticatedUser) {
    return this.workspaceServiceGrpc.ListUserWorkspaces(
      { data },
      buildRequiredUserMetadata(user),
    );
  }
}
