import { APP_SERVICE, AuthJwtPayloadReqDto } from "@melo/common";
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from "@nestjs/common";

import { Observable } from "rxjs";
import fastify from "fastify";
import { tap } from "rxjs/operators";

@Injectable()
export class AppErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const http = context.switchToHttp();
    const request = http.getRequest<
      fastify.FastifyRequest & { user: AuthJwtPayloadReqDto }
    >();
    return next.handle().pipe(
      tap(undefined, (error) => {
        Logger.error(
          `${JSON.stringify({
            path: request.query.path,
            user: request.user,
          })} => ${error}`,
          "AppErrorInterceptor",
          APP_SERVICE
        );
      })
    );
  }
}
