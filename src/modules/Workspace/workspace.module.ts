import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { WorkspaceController } from './workspace.controller';
import { WorkspaceService } from './workspace.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'WORKSPACE_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: ['workspace', 'workspace.common'],
          protoPath: [
            join(
              __dirname,
              '../../../shared/proto/Workspace/workspace/workspace.proto',
            ),
            join(__dirname, '../../../shared/proto/Workspace/common.proto'),
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
  controllers: [WorkspaceController],
  providers: [WorkspaceService],
})
export class WorkspaceModule {}
