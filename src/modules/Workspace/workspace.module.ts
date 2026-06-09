import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { WorkspaceController } from './workspace.controller';
import { WorkspaceService } from './workspace.service';
import { RolesController } from './roles.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'WORKSPACE_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: ['workspace', 'workspace.common', 'authz'],
          protoPath: [
            join(
              process.cwd(),
              'src/shared/proto/Workspace/workspace/workspace.proto',
            ),
            join(process.cwd(), 'src/shared/proto/Workspace/common.proto'),
            join(process.cwd(), 'src/shared/proto/authz/authz.proto'),
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
  controllers: [WorkspaceController, RolesController],
  providers: [WorkspaceService],
})
export class WorkspaceModule {}
