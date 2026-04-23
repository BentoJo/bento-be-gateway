import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { GrpcExceptionFilter } from './shared/filters/grpc-exception.filter';
import { ResponseInterceptor } from './shared/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global gRPC → HTTP error translation
  app.useGlobalFilters(new GrpcExceptionFilter());

  // Wrap every successful response in { success, message, data }
  app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(process.env.PORT ?? 5000);
  console.log(
    `API Gateway is running on http://localhost:${process.env.PORT ?? 5000}/api`,
  );
}
bootstrap();
