import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';

export interface ClientContext {
  ipAddress: string;
  userAgent: string;
  platform: string;
  deviceType: string;
  deviceFingerPrint: string;
  deviceName: string;
  devicePlatform: string | null;
  deviceHardwareConcurrency: number | null;
  deviceTimezone: string | null;
  deviceLanguage: string | null;
  deviceToken: string | null;
  clientVersion: string;
  timezone: string;
  requestId: string;
  sessionId: string | null;
}

declare module 'express' {
  interface Request {
    clientContext: ClientContext;
  }
}

@Injectable()
export class ClientContextMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const ipAddress =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0] ||
      req.socket.remoteAddress ||
      '127.0.0.1';

    const parseIntOrNull = (v: unknown) => {
      if (v === undefined || v === null) return null;
      const n = parseInt(String(v), 10);
      return Number.isNaN(n) ? null : n;
    };

    req.clientContext = {
      ipAddress,
      userAgent: (req.headers['user-agent'] as string) || 'Unknown',
      platform: (req.headers['x-platform'] as string) || 'web',
      deviceType: (req.headers['x-device-type'] as string) || 'desktop',
      clientVersion: (req.headers['x-client-version'] as string) || '1.0.0',
      timezone: (req.headers['x-timezone'] as string) || 'Asia/Amman',
      requestId: (req.headers['x-request-id'] as string) || randomUUID(),
      sessionId: (req.cookies?.sessionId as string) || null,

      deviceFingerPrint:
        (req.headers['x-device-fingerprint'] as string) || 'anonymous',
      deviceName: (req.headers['x-device-name'] as string) || 'Generic Device',
      devicePlatform: (req.headers['x-device-platform'] as string) || null,
      deviceHardwareConcurrency: parseIntOrNull(
        req.headers['x-device-hardware-concurrency'],
      ),
      deviceTimezone: (req.headers['x-device-timezone'] as string) || null,
      deviceLanguage: (req.headers['x-device-language'] as string) || null,

      deviceToken:
        (req.cookies?.device_token as string) ||
        (req.headers['x-device-token'] as string) ||
        null,
    };

    res.setHeader('X-Request-ID', req.clientContext.requestId);

    next();
  }
}
