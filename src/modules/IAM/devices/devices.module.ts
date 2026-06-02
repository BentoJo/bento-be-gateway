import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

import { AuthGuard } from '../../../shared/Guards/auth.guard';
import { JwtVerifyService } from '../../Redis/services/jwt.service';
import { DevicesController } from './devices.controller';
import { DevicesService } from './devices.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'DEVICES_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: ['device', 'common'],
          protoPath: [
            join(process.cwd(), 'src/shared/proto/IAM/device.proto'),
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
  controllers: [DevicesController],
  providers: [DevicesService, AuthGuard, JwtVerifyService],
})
export class DevicesModule {}
