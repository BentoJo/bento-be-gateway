import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './IAM/auth/auth.module';
import { ClientContextMiddleware } from '../shared/middlewares/client-context.middleware';
import { RedisModule } from './Redis/redis.module';
import { BoardsModule } from './boards/boards.module';
import { BoardMembersModule } from './boards-members/board-members.module';
import { WorkspaceModule } from './Workspace/workspace.module';
import { WorkspaceMembersModule } from './workspace-members/workspace-members.module';
import { WorkspaceRolesModule } from './workspace-roles/workspace-roles.module';

@Module({
  imports: [
    AuthModule,
    RedisModule,
    BoardsModule,
    BoardMembersModule,
    WorkspaceModule,
    WorkspaceMembersModule,
    WorkspaceRolesModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Apply client context middleware to ALL routes globally
    consumer.apply(ClientContextMiddleware).forRoutes('*');
  }
}
