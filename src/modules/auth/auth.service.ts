import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { Observable, firstValueFrom } from 'rxjs';
import {
  RegisterRequest,
  RegisterResponse,
} from '../../shared/types/auth/register';
import {
  LoginRequest,
  LoginResponse,
} from '../../shared/types/auth/login';
import {
  VerifyOtpRequest,
  VerifyOtpGrpcPayload,
  VerifyOtpResponse,
  OtpResendRequest,
  OtpResendResponse,
} from '../../shared/types/auth/otp';
import {
  RefreshTokenRequest,
  RefreshTokenResponse,
} from '../../shared/types/auth/refresh-token';
import { ClientContext } from '../../shared/middlewares/client-context.middleware';

interface AuthServiceGrpc {
  Register(data: RegisterRequest): Observable<RegisterResponse>;
  Login(data: LoginRequest): Observable<LoginResponse>;
  VerifyOTP(data: VerifyOtpGrpcPayload): Observable<VerifyOtpResponse>;
  ResendOTP(data: OtpResendRequest): Observable<OtpResendResponse>;
  RefreshToken(data: RefreshTokenRequest): Observable<RefreshTokenResponse>;
}

@Injectable()
export class AuthService implements OnModuleInit {
  private authServiceGrpc!: AuthServiceGrpc;

  constructor(@Inject('AUTH_SERVICE') private client: ClientGrpc) { }

  onModuleInit() {
    this.authServiceGrpc =
      this.client.getService<AuthServiceGrpc>('AuthService');
  }

  register(data: RegisterRequest) {
    return firstValueFrom(this.authServiceGrpc.Register(data));
  }

  login(data: LoginRequest, ctx: ClientContext) {
    return firstValueFrom(this.authServiceGrpc.Login(data));
  }

  verifyOTP(data: VerifyOtpRequest, ctx: ClientContext) {
    const payload: VerifyOtpGrpcPayload = {
      email: data.email,
      code: data.code,
      clientContext: ctx,
    };
    return firstValueFrom(this.authServiceGrpc.VerifyOTP(payload));
  }

  resendOTP(data: OtpResendRequest) {
    return firstValueFrom(this.authServiceGrpc.ResendOTP(data));
  }

  refreshToken(data: RefreshTokenRequest) {
    return firstValueFrom(this.authServiceGrpc.RefreshToken(data));
  }
}
