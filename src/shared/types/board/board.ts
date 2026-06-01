export type BoardVisibility = 'public' | 'private';

export interface CreateBoardRequest {
  workspaceId: string;

  name: string;

  icon?: string;

  visibility?: BoardVisibility;
}

export interface UpdateBoardRequest {
  workspaceId: string;

  boardId: string;

  name?: string;

  icon?: string | null;

  visibility?: BoardVisibility;
}

export interface DeleteBoardRequest {
  workspaceId: string;

  boardId: string;
}

export interface RestoreBoardRequest {
  workspaceId: string;

  boardId: string;
}

export interface ArchiveBoardRequest {
  workspaceId: string;

  boardId: string;
}

export interface UnarchiveBoardRequest {
  workspaceId: string;

  boardId: string;
}

export interface GetBoardRequest {
  workspaceId: string;

  boardId: string;
}

export interface BoardResponse {
  id: string;

  workspaceId: string;

  name: string;

  visibility: BoardVisibility;

  icon?: string | null;

  isArchived: boolean;

  createdAt: string;

  updatedAt?: string;
}

export interface ListWorkspaceBoardsRequest {
  workspaceId: string;

  page?: number;

  limit?: number;

  search?: string;

  includeArchived?: boolean;
}

export interface BoardListItem {
  id: string;

  name: string;

  visibility: BoardVisibility;

  icon?: string | null;

  isArchived: boolean;

  isFavorite: boolean;
}

export interface ListWorkspaceBoardsResponse {
  boards: BoardListItem[];

  pagination: {
    page: number;

    limit: number;

    total: number;

    totalPages: number;
  };
}

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

  overrideRoleId?: string;

  joinedAt: string;
}

export interface ListBoardMembersResponse {
  members: BoardMemberListItem[];

  pagination: {
    page: number;

    limit: number;

    total: number;

    totalPages: number;
  };
}

export interface FavoriteBoardRequest {
  workspaceId: string;

  boardId: string;
}

export interface UnfavoriteBoardRequest {
  workspaceId: string;

  boardId: string;
}

export interface ListFavoriteBoardsRequest {
  workspaceId: string;

  page?: number;

  limit?: number;
}

export interface FavoriteBoardListItem {
  boardId: string;

  name: string;

  icon?: string | null;

  isPrivate: boolean;
}

export interface ListFavoriteBoardsResponse {
  boards: FavoriteBoardListItem[];

  pagination: {
    page: number;

    limit: number;

    total: number;

    totalPages: number;
  };
}
