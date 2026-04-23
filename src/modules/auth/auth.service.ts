import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { Observable, firstValueFrom } from 'rxjs';
import { RegisterRequest } from '../../shared/types/auth/register';

interface AuthServiceGrpc {
  Register(data: RegisterRequest): Observable<any>;
}

@Injectable()
export class AuthService implements OnModuleInit {
  private authServiceGrpc!: AuthServiceGrpc;

  constructor(@Inject('AUTH_SERVICE') private client: ClientGrpc) {}

  onModuleInit() {
    this.authServiceGrpc =
      this.client.getService<AuthServiceGrpc>('AuthService');
  }

  async register(data: RegisterRequest) {
    return firstValueFrom(this.authServiceGrpc.Register(data));
  }
}
