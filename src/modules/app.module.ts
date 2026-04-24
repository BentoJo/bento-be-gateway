import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './IAM/auth/auth.module';
import { ClientContextMiddleware } from '../shared/middlewares/client-context.middleware';

@Module({
  imports: [AuthModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Apply client context middleware to ALL routes globally
    consumer.apply(ClientContextMiddleware).forRoutes('*');
  }
}
