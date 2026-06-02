import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

import { BoardMembersController } from './board-members.controller';
import { BoardMembersService } from './board-members.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'WORKSPACE_BOARD_MEMBERS_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'boardMembers',
          protoPath: [
            join(
              process.cwd(),
              'src/shared/proto/Workspace/board/board-members.proto',
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
  controllers: [BoardMembersController],
  providers: [BoardMembersService],
})
export class BoardMembersModule {}
