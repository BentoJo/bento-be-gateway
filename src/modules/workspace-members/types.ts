export interface InviteWorkspaceMemberRequest {
  workspaceId: string;

  email: string;

  authzRoleId: string;

  message?: string;
}

export interface WorkspaceInviteResponse {
  inviteId: string;

  workspaceId: string;

  email: string;

  authzRoleId: string;

  token: string;

  expiresAt: string;

  invitedBy: string;

  status: 'unspecified' | 'pending' | 'accepted' | 'expired' | 'revoked';

  createdAt: string;
}

export interface AcceptWorkspaceInviteRequest {
  token: string;
}

export interface WorkspaceMembershipResponse {
  membershipId: string;

  workspaceId: string;

  userId: string;

  authzRoleId: string;

  joinedAt: string;
}

export interface WorkspaceMemberResponse {
  id: string;

  workspaceId: string;

  userId: string;

  authzRoleId: string;

  joinedAt: string;
}

export interface UpdateWorkspaceMemberRoleRequest {
  workspaceId: string;

  memberId: string;

  authzRoleId: string;
}

export interface GetWorkspaceMemberRoleRequest {
  workspaceId: string;

  memberId: string;
}

export interface WorkspaceMemberRoleResponse {
  authzRoleId: string;
}

export interface ValidateWorkspaceMembershipRequest {
  workspaceId: string;

  userId: string;
}

export interface ValidateWorkspaceMembershipResponse {
  isMember: boolean;

  membershipId?: string;

  authzRoleId?: string;
}

export interface RejectWorkspaceInviteRequest {
  token: string;
}

export interface RejectWorkspaceInviteResponse {
  membershipId: string;

  workspaceId: string;

  userId: string;

  authzRoleId: string;

  joinedAt: string;
}

export interface GetWorkspaceMemberRequest {
  workspaceId: string;

  memberId: string;
}

export interface RemoveWorkspaceMemberRequest {
  workspaceId: string;

  memberId: string;
}

export interface ListWorkspaceMembersRequest {
  workspaceId: string;

  page?: number;

  limit?: number;

  search?: string;
}

export interface WorkspaceMemberListItem {
  id: string;

  userId: string;

  authzRoleId: string;
  joinedAt: string;
}

export interface ListWorkspaceMembersResponse {
  members: WorkspaceMemberListItem[];

  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Shape returned by IAM UserService.GetUsersByIds (user.proto UserProfile).
export interface IamUserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
}

export interface GetUsersByIdsResponse {
  users: IamUserProfile[];
}

// Member enriched with the IAM profile fields merged in by the gateway.
export interface EnrichedWorkspaceMemberListItem extends WorkspaceMemberListItem {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  avatarUrl: string | null;
}

export interface EnrichedListWorkspaceMembersResponse {
  members: EnrichedWorkspaceMemberListItem[];

  pagination: ListWorkspaceMembersResponse['pagination'];
}

export interface ListWorkspaceInvitesRequest {
  workspaceId: string;

  page?: number;

  limit?: number;

  status?: 'pending' | 'accepted' | 'expired' | 'revoked';

  search?: string;
}

export interface WorkspaceInviteListItem {
  id: string;

  workspaceId: string;

  email: string;

  authzRoleId: string;

  status: string;

  expiresAt: string;

  createdAt: string;
}

export interface ListWorkspaceInvitesResponse {
  invites: WorkspaceInviteListItem[];

  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface CreateWorkspaceRequest {
  name: string;
  logoUrl?: string;
}
