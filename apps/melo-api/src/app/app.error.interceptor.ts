import * as fastify from "fastify";

import { APP_SERVICE, AuthJwtPayloadReqDto } from "@melo/common";
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from "@nestjs/common";

import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import urlparse from "url-parse";

@Injectable()
export class AppErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const http = context.switchToHttp();
    const request = http.getRequest<
      fastify.FastifyRequest & { user: AuthJwtPayloadReqDto }
    >();
    return next.handle().pipe(
      tap(undefined, (error) => {
        const url = urlparse(request.raw.url || "", true);
        Logger.error(
          `${JSON.stringify({
            path: url.pathname,
            user: request.user,
          })} => ${error}`,
          "AppErrorInterceptor",
          APP_SERVICE
        );
      })
    );
  }
}
