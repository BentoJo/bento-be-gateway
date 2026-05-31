import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'WORKSPACE_BOARDS_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'boards',
          protoPath: [
            join(process.cwd(), 'src/shared/proto/Workspace/board/board.proto'),
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
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
