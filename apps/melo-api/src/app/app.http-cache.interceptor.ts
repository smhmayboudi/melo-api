import * as express from "express";

import { CacheInterceptor, ExecutionContext, Injectable } from "@nestjs/common";

import { AuthJwtPayloadReqDto } from "@melo/common";

@Injectable()
export class AppHttpCacheInterceptor extends CacheInterceptor {
  trackBy(context: ExecutionContext): string | undefined {
    const http = context.switchToHttp();
    const request = http.getRequest<
      express.Request & { user: AuthJwtPayloadReqDto }
    >();
    return request.path;
  }
}
