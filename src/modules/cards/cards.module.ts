import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'WORKSPACE_CARDS_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'cards',
          protoPath: [
            join(process.cwd(), 'src/shared/proto/Workspace/cards/cards.proto'),
            join(process.cwd(), 'src/shared/proto/Workspace/common.proto'),
          ],
          url: `ws-service:${process.env.WORKSPACE_GRPC_PORT || 50054}`,
          loader: {
            keepCase: true,
            defaults: true,
            longs: String,
          },
        },
      },
    ]),
  ],
  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {}
