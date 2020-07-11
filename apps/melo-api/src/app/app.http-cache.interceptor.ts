import * as fastify from "fastify";

import { CacheInterceptor, ExecutionContext, Injectable } from "@nestjs/common";

import { AuthJwtPayloadReqDto } from "@melo/common";
import urlparse from "url-parse";

@Injectable()
export class AppHttpCacheInterceptor extends CacheInterceptor {
  trackBy(context: ExecutionContext): string | undefined {
    const http = context.switchToHttp();
    const request = http.getRequest<
      fastify.FastifyRequest & { user: AuthJwtPayloadReqDto }
    >();
    const url = urlparse(request.raw.url || "", true);
    return url.pathname;
  }
}
