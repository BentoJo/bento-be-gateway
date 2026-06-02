export interface ListSessionsRequest {
  userId: string;
  currentSessionId: string;
}

export interface SessionListItem {
  id: string;
  ipAddress: string | null;
  lastActivity: string;
  isCurrent: boolean;
  createdAt: string;
}

export interface ListSessionsResponse {
  sessions: SessionListItem[];
}
