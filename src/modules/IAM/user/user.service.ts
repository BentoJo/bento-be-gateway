import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';

import type {
  GetUserRequest,
  UpdateUserRequest,
  UserInfo,
} from './types';

interface UserServiceGrpc {
  GetUser(data: GetUserRequest): Observable<UserInfo>;
  UpdateUser(data: UpdateUserRequest): Observable<UserInfo>;
}

@Injectable()
export class UserService implements OnModuleInit {
  private userServiceGrpc!: UserServiceGrpc;

  constructor(@Inject('USER_SERVICE') private client: ClientGrpc) {}

  onModuleInit() {
    this.userServiceGrpc =
      this.client.getService<UserServiceGrpc>('UserService');
  }

  getUser(userId: string) {
    return firstValueFrom(this.userServiceGrpc.GetUser({ userId }));
  }

  updateUser(data: UpdateUserRequest) {
    return firstValueFrom(this.userServiceGrpc.UpdateUser(data));
  }
}
