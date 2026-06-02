export interface GetWorkspaceRolesRequest {
  workspaceId: string;

  // Caller's resolved authz role id for this workspace (read by ws PermissionsGuard).
  roleId?: string;
}

export interface WorkspaceRole {
  authzRoleId: string;

  roleName: string;

  isSystemRole: boolean;
}

export interface GetWorkspaceRolesResponse {
  workspaceId: string;

  roles: WorkspaceRole[];
}

export interface WorkspaceRoleReferenceResponse {
  id: string;

  workspaceId: string;

  authzRoleId: string;

  roleName: string;

  isSystemRole: boolean;
}

export interface DeleteWorkspaceRoleReferenceRequest {
  workspaceId: string;

  authzRoleId: string;

  // Caller's resolved authz role id (read by ws PermissionsGuard).
  roleId?: string;
}

export interface GetWorkspaceRoleFromAuthZRequest {
  workspaceId: string;

  authzRoleId: string;

  // Caller's resolved authz role id (read by ws PermissionsGuard).
  roleId?: string;
}

export interface GetWorkspaceRolesPermissionsFromAuthZRequest {
  workspaceId: string;

  authzRoleId: string;

  // Caller's resolved authz role id (read by ws PermissionsGuard).
  roleId?: string;
}

export interface WorkspaceRolePermissionsResponse {
  permissions: string[];
}

export interface GetWorkspaceMemberRoleRequest {
  workspaceId: string;

  userId: string;
}

export interface GetWorkspaceMemberRoleResponse {
  authzRoleId: string;
}

export interface CheckPermissionRequest {
  workspaceId: string;

  scopeType: string;

  scopeId: string;

  resourceType: string;

  action: string;

  userId: string;
}

export interface CheckPermissionResponse {
  allowed: boolean;
}

// --- Role creation (proxied to AuthZ AuthorizationService) ---

export interface CreateWorkspaceRoleRequest {
  name: string;

  permissions: string[];
}

// AuthZ CreateRole RPC shape
export interface AuthzCreateRoleRequest {
  name: string;

  scopeType: string;

  scopeId: string;

  isSystem: boolean;

  createdBy: string;
}

export interface AuthzCreateRoleResponse {
  roleId: string;
}

// AuthZ AssignPermissionsToRole RPC shape
export interface AuthzAssignPermissionsRequest {
  roleId: string;

  permissionIds: string[];

  scopeId: string;
}

export interface AuthzAssignPermissionsResponse {
  success: boolean;
}

export interface CreateWorkspaceRoleResponse {
  roleId: string;

  name: string;

  permissions: string[];
}
