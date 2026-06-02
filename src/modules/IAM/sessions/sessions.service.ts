import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';

import type { ListSessionsRequest, ListSessionsResponse } from './types';

interface SessionsServiceGrpc {
  ListSessions(data: ListSessionsRequest): Observable<ListSessionsResponse>;
}

@Injectable()
export class SessionsService implements OnModuleInit {
  private sessionsServiceGrpc!: SessionsServiceGrpc;

  constructor(@Inject('SESSIONS_SERVICE') private client: ClientGrpc) {}

  onModuleInit() {
    this.sessionsServiceGrpc =
      this.client.getService<SessionsServiceGrpc>('SessionsService');
  }

  listSessions(userId: string, currentSessionId: string) {
    return firstValueFrom(
      this.sessionsServiceGrpc.ListSessions({ userId, currentSessionId }),
    );
  }
}
