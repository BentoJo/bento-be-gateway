import { Module, Global } from '@nestjs/common';
import { RedisService } from './services/redis.service';
import { JwtVerifyService } from './services/jwt.service';

@Global()
@Module({
  providers: [RedisService, JwtVerifyService],
  exports: [RedisService, JwtVerifyService],
})
export class RedisModule {}
