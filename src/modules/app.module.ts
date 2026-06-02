import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './IAM/auth/auth.module';
import { ClientContextMiddleware } from '../shared/middlewares/client-context.middleware';
import { RedisModule } from './Redis/redis.module';
import { BoardsModule } from './boards/boards.module';
import { BoardMembersModule } from './boards-members/board-members.module';
import { WorkspaceModule } from './Workspace/workspace.module';
import { WorkspaceMembersModule } from './workspace-members/workspace-members.module';
import { WorkspaceRolesModule } from './workspace-roles/workspace-roles.module';
import { TeamsModule } from './teams/teams.module';
import { ColumnsModule } from './columns/columns.module';
import { CardsModule } from './cards/cards.module';
import { UserModule } from './IAM/user/user.module';
import { SessionsModule } from './IAM/sessions/sessions.module';
import { DevicesModule } from './IAM/devices/devices.module';

@Module({
  imports: [
    AuthModule,
    RedisModule,
    BoardsModule,
    BoardMembersModule,
    WorkspaceModule,
    WorkspaceMembersModule,
    WorkspaceRolesModule,
    TeamsModule,
    ColumnsModule,
    CardsModule,
    UserModule,
    SessionsModule,
    DevicesModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Apply client context middleware to ALL routes globally
    consumer.apply(ClientContextMiddleware).forRoutes('*');
  }
}
