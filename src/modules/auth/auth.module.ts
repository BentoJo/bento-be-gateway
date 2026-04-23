import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: ['auth', 'common'],
          protoPath: [
            join(__dirname, '../../shared/proto/auth.proto'),
            join(__dirname, '../../shared/proto/common.proto'),
          ],
          url: '0.0.0.0:50052',
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
  providers: [AuthService],
})
export class AuthModule {}
