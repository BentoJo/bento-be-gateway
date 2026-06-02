import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

import { AuthGuard } from '../../../shared/Guards/auth.guard';
import { JwtVerifyService } from '../../Redis/services/jwt.service';
import { SessionsController } from './sessions.controller';
import { SessionsService } from './sessions.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SESSIONS_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: ['session', 'common'],
          protoPath: [
            join(process.cwd(), 'src/shared/proto/IAM/session.proto'),
            join(process.cwd(), 'src/shared/proto/IAM/common.proto'),
          ],
          url: `iam-service:${process.env.IAM_GRPC_PORT || 50052}`,
          loader: {
            keepCase: true,
            defaults: true,
            longs: String,
          },
        },
      },
    ]),
  ],
  controllers: [SessionsController],
  providers: [SessionsService, AuthGuard, JwtVerifyService],
})
export class SessionsModule {}
