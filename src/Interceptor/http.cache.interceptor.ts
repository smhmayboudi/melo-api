import { CacheInterceptor, ExecutionContext, Injectable } from "@nestjs/common";
import * as express from "express";
import { IUser } from "src/user/type/IUser";

@Injectable()
export class HttpCacheInterceptor extends CacheInterceptor {
  trackBy(context: ExecutionContext): string | undefined {
    const request = context
      .switchToHttp()
      .getRequest<express.Request & { user: IUser }>();
    return request.path;
  }
}
