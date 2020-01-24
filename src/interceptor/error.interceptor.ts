import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor
} from "@nestjs/common";
import * as express from "express";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { JwtPayloadDto } from "../auth/dto/jwt.payload.dto";

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context
      .switchToHttp()
      .getRequest<express.Request & { user: JwtPayloadDto }>();
    return next.handle().pipe(
      catchError((error: Error) => {
        Logger.error(error, "error.interceptor");
        Logger.error(
          JSON.stringify({
            requestPath: request.path,
            requestUser: request.user
          }),
          "error.interceptor"
        );
        throw error;
      })
    );
  }
}
