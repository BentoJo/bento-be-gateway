import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

import { TeamsController } from './teams.controller.js';
import { TeamsService } from './teams.service.js';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'TEAMS_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: ['teams', 'workspace.common'],
          protoPath: [
            join(process.cwd(), 'src/shared/proto/Workspace/teams.proto'),
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
  controllers: [TeamsController],
  providers: [TeamsService],
})
export class TeamsModule {}
