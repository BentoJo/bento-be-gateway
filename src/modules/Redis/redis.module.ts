import { Module, Global } from '@nestjs/common';
import { RedisService } from './redis.service';

@Global() // optional: makes it available everywhere
@Module({
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
