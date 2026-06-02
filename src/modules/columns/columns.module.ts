import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

import { ColumnsController } from './columns.controller';
import { ColumnsService } from './columns.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'WORKSPACE_COLUMNS_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'columns',
          protoPath: [
            join(
              process.cwd(),
              'src/shared/proto/Workspace/columns/columns.proto',
            ),
            join(process.cwd(), 'src/shared/proto/Workspace/common.proto'),
          ],
          url: `ws-service:${process.env.WORKSPACE_GRPC_PORT || 50054}`,
          loader: {
            keepCase: true,
            defaults: true,
            longs: String,
          },
        },
      },
    ]),
  ],
  controllers: [ColumnsController],
  providers: [ColumnsService],
})
export class ColumnsModule {}
