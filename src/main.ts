import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { GrpcExceptionFilter } from './shared/filters/grpc-exception.filter';
import { ResponseInterceptor } from './shared/interceptors/response.interceptor';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set global API prefix to /api/v1
  app.setGlobalPrefix('api/v1');

  // Enable cookie parsing for incoming  requests
  app.use(cookieParser());

  // Global gRPC → HTTP error translation
  app.useGlobalFilters(new GrpcExceptionFilter());

  // Wrap every successful response in { success, message, data }
  app.useGlobalInterceptors(new ResponseInterceptor());

  app.enableCors({
    origin: process.env.CORS_ORIGIN?.split(',') ?? true,
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 5000);
  console.log(
    `API Gateway is running on http://localhost:${process.env.PORT ?? 5000}`,
  );
}
bootstrap();
