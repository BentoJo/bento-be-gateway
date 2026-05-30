import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtVerifyService } from '../../modules/Redis/services/jwt.service';
import type { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtVerifyService: JwtVerifyService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing token');
    }

    const token = authHeader.split(' ')[1];

    try {
      const payload = await this.jwtVerifyService
        .verifyAccessToken(token)
        .catch((err) => {
          const errorMessage = err instanceof Error ? err.message : String(err);
          console.error('Token verification failed:', errorMessage);
          throw new UnauthorizedException('Invalid token');
        });

      const userId = typeof payload.sub === 'string' ? payload.sub : undefined;

      if (!userId) {
        throw new UnauthorizedException('Invalid token');
      }

      request.user = {
        id: userId,
      };
      return true;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
