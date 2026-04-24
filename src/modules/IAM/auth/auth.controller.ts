import { AuthService } from './auth.service';
import type { RegisterRequest } from '../../../shared/types/auth/register';
import { Controller, Post, Body } from '@nestjs/common';
import { ClientContextDecorator } from '../../../shared/decorators/client-context.decorator';
import type { ClientContext } from '../../../shared/middlewares/client-context.middleware';
import type { LoginRequest } from '../../../shared/types/auth/login';
import type {
  VerifyOtpRequest,
  OtpResendRequest,
} from '../../../shared/types/auth/otp';
import type { RefreshTokenRequest } from '../../../shared/types/auth/refresh-token';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
  ) {
    return this.authService.verifyOTP(body, ctx);
  }

  @Post('/resend-otp')
  async resendOTP(@Body() body: OtpResendRequest) {
    return this.authService.resendOTP(body);
  }

  @Post('/refresh-token')
  async refreshToken(@Body() body: RefreshTokenRequest) {
    return this.authService.refreshToken(body);
  }
}
