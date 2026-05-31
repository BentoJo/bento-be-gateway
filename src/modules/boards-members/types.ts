export interface AddBoardMemberRequest {
  workspaceId: string;

  boardId: string;

  userId: string;

  overrideRoleId?: string;
}

export interface RemoveBoardMemberRequest {
  workspaceId: string;

  boardId: string;

  userId: string;
}

export interface ListBoardMembersRequest {
  workspaceId: string;

  boardId: string;

  page?: number;

  limit?: number;

  search?: string;
}

export interface BoardMemberListItem {
  userId: string;

  overrideRoleId?: string | null;

  joinedAt: string;
}

export interface PaginationMeta {
  page: number;

  limit: number;

  total: number;

  totalPages: number;
}

export interface ListBoardMembersResponse {
  members: BoardMemberListItem[];

  pagination: PaginationMeta;
}
