import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './IAM/auth/auth.module';
import { ClientContextMiddleware } from '../shared/middlewares/client-context.middleware';
import { RedisModule } from './Redis/redis.module';
import { WorkspaceModule } from './Workspace/workspace.module';

@Module({
  imports: [AuthModule, RedisModule, WorkspaceModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Apply client context middleware to ALL routes globally
    consumer.apply(ClientContextMiddleware).forRoutes('*');
  }
}
