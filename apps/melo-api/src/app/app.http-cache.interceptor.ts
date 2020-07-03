import { CacheInterceptor, ExecutionContext, Injectable } from "@nestjs/common";

import { AuthJwtPayloadReqDto } from "@melo/common";
import fastify from "fastify";

@Injectable()
export class AppHttpCacheInterceptor extends CacheInterceptor {
  trackBy(context: ExecutionContext): string | undefined {
    const http = context.switchToHttp();
    const request = http.getRequest<
      fastify.FastifyRequest & { user: AuthJwtPayloadReqDto }
    >();
    return request.query.path;
  }
}
