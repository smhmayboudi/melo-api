import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor
} from "@nestjs/common";
import express from "express";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthJwtPayloadDto } from "../auth/dto/auth.jwt-payload.dto";

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context
      .switchToHttp()
      .getRequest<express.Request & { user: AuthJwtPayloadDto }>();
    return next.handle().pipe(
      catchError((error: Error) => {
        Logger.error(error, undefined, "error.interceptor");
        Logger.error(
          JSON.stringify({
            path: request.path,
            user: request.user
          }),
          undefined,
          "error.interceptor"
        );
        throw error;
      })
    );
  }
}
