import { CacheInterceptor, ExecutionContext, Injectable } from "@nestjs/common";
import * as express from "express";
import { User } from "../user/type/User";

@Injectable()
export class HttpCacheInterceptor extends CacheInterceptor {
  trackBy(context: ExecutionContext): string | undefined {
    const request = context
      .switchToHttp()
      .getRequest<express.Request & { user: User }>();
    return request.path;
  }
}
