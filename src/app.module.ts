import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SericesModule } from './services/services.module';

@Module({
  imports: [SericesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
