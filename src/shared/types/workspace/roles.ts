export interface CreateRoleRequest {
  name: string;
  scopeType: string;
  scopeId: string;
}

export interface CreateRoleResponse {
  roleId: string;
}

export interface UpdateRoleRequest {
  roleId: string;
  name?: string;
  isEditable?: boolean;
  isDeletable?: boolean;
  scopeId: string;
}

export interface UpdateRoleResponse {
  success: boolean;
}

export interface DeleteRoleRequest {
  roleId: string;
  scopeId: string;
}

export interface DeleteRoleResponse {
  success: boolean;
}

export interface AssignPermissionsRequest {
  roleId: string;
  permissionIds: string[];
  scopeId: string;
}

export interface AssignPermissionsResponse {
  success: boolean;
}

export interface RemovePermissionsRequest {
  roleId: string;
  scopeId: string;
  permissionIds: string[];
}

export interface RemovePermissionsResponse {
  success: boolean;
}
