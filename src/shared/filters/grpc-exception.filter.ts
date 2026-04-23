import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { mapGrpcError } from '../utils/grpc-status.map';
import type { ApiResponse } from '../interfaces/api-response.interface';

const MAX_GRPC_CODE = 16;

function isGrpcError(
  error: unknown,
): error is { code: number; details?: string; message?: string } {
  if (typeof error !== 'object' || error === null) return false;

  const err = error as Record<string, unknown>;

  if (
    typeof err.code !== 'number' ||
    err.code < 0 ||
    err.code > MAX_GRPC_CODE
  ) {
    return false;
  }

  return 'details' in err || 'metadata' in err;
}

@Catch()
export class GrpcExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GrpcExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let httpStatus: number;
    let message: string;

    if (isGrpcError(exception)) {
      const mapped = mapGrpcError(exception);
      httpStatus = mapped.httpStatus;
      message = mapped.message;
    } else if (exception instanceof HttpException) {
      httpStatus = exception.getStatus();
      const res = exception.getResponse();
      message =
        typeof res === 'string'
          ? res
          : (res as Record<string, unknown>).message
            ? String((res as Record<string, unknown>).message)
            : exception.message;
    } else {
      this.logger.error('Unhandled exception:', exception);
      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal server error';
    }

    const body: ApiResponse = {
      success: false,
      message,
    };

    response.status(httpStatus).json(body);
  }
}
