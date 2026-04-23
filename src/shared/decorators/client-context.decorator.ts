import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ClientContextDecorator = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.clientContext;
  },
);
