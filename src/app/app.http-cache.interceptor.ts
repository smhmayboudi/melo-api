import { CacheInterceptor, ExecutionContext, Injectable } from "@nestjs/common";

import { AuthJwtPayloadReqDto } from "../auth/dto/req/auth.jwt-payload.req.dto";
import express from "express";

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
