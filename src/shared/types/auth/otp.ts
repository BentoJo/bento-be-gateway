import type { ClientContext } from '../../middlewares/client-context.middleware';

export interface VerifyOtpRequest {
  email: string;
  code: string;
}

export interface VerifyOtpGrpcPayload {
  email: string;
  code: string;
  clientContext: ClientContext;
}

export interface OtpResendRequest {
  email: string;
}

export interface OtpResendResponse {
  method: string;
  email: string;
  expiresIn: string;
}

export interface VerifyOtpResponse {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: string;
  refreshTokenExpiresAt: string;
  user: UserInfo;
  session: SessionInfo;
}

export interface UserInfo {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl: string | null;
}

export interface SessionInfo {
  sessionId: string;
  deviceId: string;
}
