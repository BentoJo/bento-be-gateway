import { Controller, Get, Post, Req, Ip, Logger } from '@nestjs/common';
import { HoneypotService } from './honeypot.service';
import type { Request } from 'express';

@Controller()
export class HoneypotController {
  private readonly logger = new Logger(HoneypotController.name);

  constructor(private readonly honeypotService: HoneypotService) {}

  private async trigger(req: Request, ip: string) {
    this.logger.log(
      `Honeypot triggered for ${req.method} ${req.originalUrl} from ${ip}`,
    );
    const payload = {
      ip,
      method: req.method,
      url: req.originalUrl,
      headers: req.headers,
      body: req.body,
      query: req.query,
    };
    await this.honeypotService.triggerHoneypot(payload);
    // Respond with a generic 404 to avoid revealing this is a honeypot
    return {
      statusCode: 404,
      message: 'Cannot ' + req.method + ' ' + req.path,
      error: 'Not Found',
    };
  }

  @Get('.env')
  async getEnv(@Req() req: Request, @Ip() ip: string) {
    return this.trigger(req, ip);
  }

  @Get('admin')
  async getWpAdmin(@Req() req: Request, @Ip() ip: string) {
    return this.trigger(req, ip);
  }

  @Post('users')
  async postWpLogin(@Req() req: Request, @Ip() ip: string) {
    return this.trigger(req, ip);
  }

  @Get('admins')
  async getPhpMyAdmin(@Req() req: Request, @Ip() ip: string) {
    return this.trigger(req, ip);
  }

  @Get('backup')
  async getBackup(@Req() req: Request, @Ip() ip: string) {
    return this.trigger(req, ip);
  }
}
