import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

import { AuthGuard } from '../../../shared/Guards/auth.guard';
import { JwtVerifyService } from '../../Redis/services/jwt.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: ['user', 'common'],
          protoPath: [
            join(process.cwd(), 'src/shared/proto/IAM/user.proto'),
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
  controllers: [UserController],
  providers: [UserService, AuthGuard, JwtVerifyService],
})
export class UserModule {}
