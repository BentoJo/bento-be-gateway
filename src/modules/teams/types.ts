export interface CreateTeamRequest {
  workspaceId: string;

  name: string;

  description?: string;

  icon?: string;
}

export interface TeamResponse {
  id: string;

  workspaceId: string;

  name: string;

  description?: string;

  icon?: string;

  isArchived: boolean;

  createdAt: string;

  updatedAt?: string;
}

export interface GetTeamRequest {
  workspaceId: string;

  teamId: string;
}

export interface UpdateTeamRequest {
  workspaceId: string;

  teamId: string;

  name?: string;

  description?: string;

  icon?: string;
}

export interface DeleteTeamRequest {
  workspaceId: string;

  teamId: string;
}

export interface RestoreTeamRequest {
  workspaceId: string;

  teamId: string;
}

export interface ArchiveTeamRequest {
  workspaceId: string;

  teamId: string;
}

export interface UnarchiveTeamRequest {
  workspaceId: string;

  teamId: string;
}

export interface ListTeamsRequest {
  workspaceId: string;

  page?: number;

  limit?: number;

  search?: string;

  includeArchived?: boolean;
}

export interface TeamListItem {
  id: string;

  name: string;

  icon?: string;

  isArchived: boolean;

  membersCount: number;
}

export interface ListTeamsResponse {
  teams: TeamListItem[];

  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface AddTeamMemberRequest {
  workspaceId: string;

  teamId: string;

  userId: string;
}

export interface RemoveTeamMemberRequest {
  workspaceId: string;

  teamId: string;

  userId: string;
}

export interface BulkAddTeamMembersRequest {
  workspaceId: string;

  teamId: string;

  userIds: string[];
}

export interface BulkRemoveTeamMembersRequest {
  workspaceId: string;

  teamId: string;

  userIds: string[];
}

export interface TeamMemberListItem {
  userId: string;

  joinedAt: string;
}

export interface ListTeamMembersRequest {
  workspaceId: string;

  teamId: string;

  page?: number;

  limit?: number;

  search?: string;
}

export interface ListTeamMembersResponse {
  members: TeamMemberListItem[];

  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ListMemberTeamsRequest {
  workspaceId: string;

  userId: string;
}

export interface MemberTeamListItem {
  teamId: string;

  name: string;

  icon?: string;
}

export interface ListMemberTeamsResponse {
  teams: MemberTeamListItem[];
}

export interface ResolveEffectiveTeamMembersRequest {
  workspaceId: string;

  teamIds: string[];
}

export interface ResolveEffectiveTeamMembersResponse {
  userIds: string[];
}
