import { status as GrpcStatus } from '@grpc/grpc-js';

interface GrpcHttpMapping {
  httpStatus: number;
  message: string;
}

const grpcToHttpMap: Record<number, GrpcHttpMapping> = {
  [GrpcStatus.OK]: { httpStatus: 200, message: 'Success' },
  [GrpcStatus.CANCELLED]: { httpStatus: 499, message: 'Request cancelled' },
  [GrpcStatus.UNKNOWN]: { httpStatus: 500, message: 'Internal server error' },
  [GrpcStatus.INVALID_ARGUMENT]: { httpStatus: 400, message: 'Bad request' },
  [GrpcStatus.DEADLINE_EXCEEDED]: {
    httpStatus: 504,
    message: 'Gateway timeout',
  },
  [GrpcStatus.NOT_FOUND]: { httpStatus: 404, message: 'Not found' },
  [GrpcStatus.ALREADY_EXISTS]: { httpStatus: 409, message: 'Conflict' },
  [GrpcStatus.PERMISSION_DENIED]: { httpStatus: 403, message: 'Forbidden' },
  [GrpcStatus.RESOURCE_EXHAUSTED]: {
    httpStatus: 429,
    message: 'Too many requests',
  },
  [GrpcStatus.FAILED_PRECONDITION]: { httpStatus: 400, message: 'Bad request' },
  [GrpcStatus.ABORTED]: { httpStatus: 409, message: 'Conflict' },
  [GrpcStatus.OUT_OF_RANGE]: { httpStatus: 400, message: 'Bad request' },
  [GrpcStatus.UNIMPLEMENTED]: { httpStatus: 501, message: 'Not implemented' },
  [GrpcStatus.INTERNAL]: { httpStatus: 500, message: 'Internal server error' },
  [GrpcStatus.UNAVAILABLE]: { httpStatus: 503, message: 'Service unavailable' },
  [GrpcStatus.DATA_LOSS]: { httpStatus: 500, message: 'Internal server error' },
  [GrpcStatus.UNAUTHENTICATED]: { httpStatus: 401, message: 'Unauthorized' },
};

export function grpcToHttpStatus(grpcCode: number): GrpcHttpMapping {
  return (
    grpcToHttpMap[grpcCode] ?? {
      httpStatus: 500,
      message: 'Internal server error',
    }
  );
}

export function mapGrpcError(error: {
  code?: number;
  details?: string;
  message?: string;
}): GrpcHttpMapping {
  const grpcCode = error.code ?? GrpcStatus.UNKNOWN;
  const mapping = grpcToHttpStatus(grpcCode);

  return {
    httpStatus: mapping.httpStatus,
    message: error.details || error.message || mapping.message,
  };
}
