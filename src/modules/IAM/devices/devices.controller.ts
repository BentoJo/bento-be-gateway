import { Controller, Get, Req, UseGuards } from '@nestjs/common';

import { AuthGuard } from '../../../shared/Guards/auth.guard';
import type { AuthenticatedRequest } from '../../../shared/types/auth';
import { DevicesService } from './devices.service';

@Controller('devices')
@UseGuards(AuthGuard)
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Get('/')
  listDevices(@Req() req: AuthenticatedRequest) {
    // currentDeviceId is used by IAM to flag the caller's own device.
    // It is carried in the deviceToken cookie (set on verify-otp).
    const currentDeviceId = req.cookies?.deviceToken ?? undefined;
    return this.devicesService.listDevices(req.user.id, currentDeviceId);
  }
}
