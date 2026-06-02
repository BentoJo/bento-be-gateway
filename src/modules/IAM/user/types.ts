export interface GetUserRequest {
  userId: string;
}

export interface UpdateUserRequest {
  userId: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  bio?: string;
  phone?: string;
  dob?: string;
  gender?: string;
}

export type UpdateUserBody = Omit<UpdateUserRequest, 'userId'>;

export interface UserInfo {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl: string | null;
  bio: string | null;
  phone: string | null;
  dob: string | null;
  gender: string | null;
  authStatus: string | null;
  globalRole: string | null;
  createdAt: string;
  updatedAt: string;
}
