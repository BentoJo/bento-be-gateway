import type { ActionResponse } from '../../shared/types/workspace/common';

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

export interface UpdateTeamResponse {
  id: string;
  workspaceId: string;
  name: string;
  description?: string;
  icon?: string;
  updatedAt: string;
}

export interface DeleteTeamRequest {
  workspaceId: string;
  teamId: string;
}

export interface DeleteTeamResponse {
  success: boolean;
  message: string;
  deletedAt: string;
}

export interface RestoreTeamRequest {
  workspaceId: string;
  teamId: string;
}

export interface RestoreTeamResponse {
  success: boolean;
  message: string;
  restoredAt: string;
}

export interface ArchiveTeamRequest {
  workspaceId: string;
  teamId: string;
}

export interface ArchiveTeamResponse {
  success: boolean;
  message: string;
  archivedAt: string;
}

export interface UnarchiveTeamRequest {
  workspaceId: string;
  teamId: string;
}

export interface UnarchiveTeamResponse {
  success: boolean;
  message: string;
  unarchivedAt: string;
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

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ListTeamsResponse {
  teams: TeamListItem[];
  pagination: PaginationMeta;
}

export interface AddTeamMemberRequest {
  workspaceId: string;
  teamId: string;
  workspaceMemberId: string;
}

export interface AddTeamMemberResponse {
  id: string;
  teamId: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    avatarUrl?: string | null;
  };
  joinedAt: string;
}

export interface RemoveTeamMemberRequest {
  workspaceId: string;
  teamId: string;
  userId: string;
}

export type RemoveTeamMemberResponse = ActionResponse;

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

export type BulkTeamMembersResponse = ActionResponse;

export interface TeamMemberListItem {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    avatarUrl?: string | null;
  };
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
  pagination: PaginationMeta;
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

export type TeamGetRequest = GetTeamRequest;
export type TeamUpdateRequest = UpdateTeamRequest;
export type TeamUpdateResponse = UpdateTeamResponse;
export type TeamDeleteRequest = DeleteTeamRequest;
export type TeamDeleteResponse = DeleteTeamResponse;
export type TeamRestoreRequest = RestoreTeamRequest;
export type TeamRestoreResponse = RestoreTeamResponse;
export type TeamArchiveRequest = ArchiveTeamRequest;
export type TeamArchiveResponse = ArchiveTeamResponse;
export type TeamUnarchiveRequest = UnarchiveTeamRequest;
export type TeamUnarchiveResponse = UnarchiveTeamResponse;
export type TeamAddMemberRequest = AddTeamMemberRequest;
export type TeamAddMemberResponse = AddTeamMemberResponse;
export type TeamRemoveMemberRequest = RemoveTeamMemberRequest;
export type TeamRemoveMemberResponse = RemoveTeamMemberResponse;
export type TeamListMembersRequest = ListTeamMembersRequest;
export type TeamListMembersResponse = ListTeamMembersResponse;
export type TeamListRequest = ListTeamsRequest;
export type TeamListResponse = ListTeamsResponse;
export type TeamListMemberTeamsRequest = ListMemberTeamsRequest;
export type TeamListMemberTeamsResponse = ListMemberTeamsResponse;
