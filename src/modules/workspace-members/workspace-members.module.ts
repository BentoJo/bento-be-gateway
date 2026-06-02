import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { WorkspaceMembersController } from './workspace-members.controller.js';
import { WorkspaceMembersService } from './workspace-members.service.js';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'WORKSPACE_MEMBERS_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: ['workspaceMembers', 'workspace.common'],
          protoPath: [
            join(
              process.cwd(),
              'src/shared/proto/Workspace/workspace/workspace-members.proto',
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
      {
        // IAM user gRPC client used to enrich member lists with profile data.
        name: 'IAM_USER_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: ['user', 'common'],
          protoPath: [
            join(process.cwd(), 'src/shared/proto/IAM/user.proto'),
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
  controllers: [WorkspaceMembersController],
  providers: [WorkspaceMembersService],
})
export class WorkspaceMembersModule {}
