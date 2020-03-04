import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor
} from "@nestjs/common";
import express from "express";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { AuthJwtPayloadReqDto } from "../auth/dto/req/auth.jwt-payload.req.dto";

@Injectable()
export class AppErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const http = context.switchToHttp();
    const request = http.getRequest<
      express.Request & { user: AuthJwtPayloadReqDto }
    >();
    return next.handle().pipe(
      tap(undefined, error => {
        Logger.error(
          `${JSON.stringify({
            path: request.path,
            user: request.user
          })} => ${error}`,
          undefined,
          "AppErrorInterceptor"
        );
      })
    );
  }
}
