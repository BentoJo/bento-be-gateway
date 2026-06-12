import { Module } from '@nestjs/common';
import { HoneypotController } from './honeypot.controller';
import { HoneypotService } from './honeypot.service';

@Module({
  controllers: [HoneypotController],
  providers: [HoneypotService],
})
export class HoneypotModule {}
