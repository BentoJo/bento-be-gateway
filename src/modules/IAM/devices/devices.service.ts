import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';

import type { ListDevicesRequest, ListDevicesResponse } from './types';

interface DevicesServiceGrpc {
  ListDevices(data: ListDevicesRequest): Observable<ListDevicesResponse>;
}

@Injectable()
export class DevicesService implements OnModuleInit {
  private devicesServiceGrpc!: DevicesServiceGrpc;

  constructor(@Inject('DEVICES_SERVICE') private client: ClientGrpc) {}

  onModuleInit() {
    this.devicesServiceGrpc =
      this.client.getService<DevicesServiceGrpc>('DevicesService');
  }

  listDevices(userId: string, currentDeviceId?: string) {
    return firstValueFrom(
      this.devicesServiceGrpc.ListDevices({ userId, currentDeviceId }),
    );
  }
}
