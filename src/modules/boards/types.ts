export interface PaginationMeta {
  page: number;

  limit: number;

  total: number;

  totalPages: number;
}

export interface CreateBoardRequest {
  workspaceId: string;

  name: string;

  isPrivate?: boolean;

  icon?: string;
}

export interface GetBoardRequest {
  workspaceId: string;

  boardId: string;
}

export interface UpdateBoardRequest {
  workspaceId: string;

  boardId: string;

  name?: string;

  isPrivate?: boolean;

  icon?: string | null;
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

export interface FavoriteBoardRequest {
  workspaceId: string;

  boardId: string;
}

export interface UnfavoriteBoardRequest {
  workspaceId: string;

  boardId: string;
}

export interface ListBoardsRequest {
  workspaceId: string;

  page?: number;

  limit?: number;

  search?: string;

  includeArchived?: boolean;
}

export interface BoardListItem {
  id: string;

  name: string;

  isPrivate: boolean;

  icon?: string | null;

  isArchived: boolean;

  isFavorite: boolean;
}

export interface ListBoardsResponse {
  boards: BoardListItem[];

  pagination: PaginationMeta;
}

export interface BoardResponse {
  id: string;

  workspaceId: string;

  name: string;

  isPrivate: boolean;

  icon?: string | null;

  isArchived: boolean;

  createdAt: string;

  updatedAt?: string | null;
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

  pagination: PaginationMeta;
}
