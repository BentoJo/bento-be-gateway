import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AuthGuard } from '../../../shared/Guards/auth.guard';
import { JwtVerifyService } from '../../Redis/services/jwt.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: ['auth', 'common'],
          protoPath: [
            join(process.cwd(), 'src/shared/proto/IAM/auth.proto'),
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
  controllers: [AuthController],
  providers: [AuthService, AuthGuard, JwtVerifyService],
})
export class AuthModule {}
