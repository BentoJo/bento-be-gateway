import { AuthService } from './auth.service';
import type { RegisterRequest } from '../../../shared/types/auth/register';
import { Controller, Post, Body, UseGuards, Res, Req } from '@nestjs/common';
import type { Response, Request } from 'express';
import { ClientContextDecorator } from '../../../shared/decorators/client-context.decorator';
import type { ClientContext } from '../../../shared/middlewares/client-context.middleware';
import type { LoginRequest } from '../../../shared/types/auth/login';
import type {
  VerifyOtpRequest,
  OtpResendRequest,
} from '../../../shared/types/auth/otp';
import type { RefreshTokenRequest } from '../../../shared/types/auth/refresh-token';
import { AuthGuard } from '../../../shared/Guards/auth.guard';
import { COOKIE_OPTIONS, DEVICE_COOKIE_OPTIONS } from '../../../shared/configs/cookies.config';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/auth')
  @UseGuards(AuthGuard)
  async auth() {
    return 'This endpoint is for testing auth only';
  }

  @Post('/register')
  async register(@Body() body: RegisterRequest) {
    return this.authService.register(body);
  }

  @Post('/login')
  async login(@Body() body: LoginRequest) {
    return this.authService.login(body);
  }

  @Post('/verify-otp')
  async verifyOTP(
    @Body() body: VerifyOtpRequest,
    @ClientContextDecorator() ctx: ClientContext,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.verifyOTP(body, ctx);

    res.cookie('refreshToken', result.refreshToken, COOKIE_OPTIONS);
    res.cookie('deviceToken', result.session.deviceId, DEVICE_COOKIE_OPTIONS);

    return {
      ...result,
      refreshToken: undefined,
    };
  }

  @Post('/resend-otp')
  async resendOTP(@Body() body: OtpResendRequest) {
    return this.authService.resendOTP(body);
  }

  @Post('/refresh-token')
  async refreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      throw new Error('No refresh token provided');
    }
    const result = await this.authService.refreshToken({ refreshToken });

    res.cookie('refreshToken', result.refreshToken, COOKIE_OPTIONS);

    return {
      ...result,
      refreshToken: undefined,
    };
  }
}
