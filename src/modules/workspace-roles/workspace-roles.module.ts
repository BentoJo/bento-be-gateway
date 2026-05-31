import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

import { WorkspaceRolesController } from './workspace-roles.controller';
import { WorkspaceRolesService } from './workspace-roles.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'WORKSPACE_ROLES_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'workspaceRoles',
          protoPath: [
            join(
              process.cwd(),
              'src/shared/proto/Workspace/workspace/workspace-role.proto',
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
  controllers: [WorkspaceRolesController],
  providers: [WorkspaceRolesService],
})
export class WorkspaceRolesModule {}
