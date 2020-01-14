import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor
} from "@nestjs/common";
import { Observable } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import * as express from "express";
import { User } from "../user/type/User";

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context
      .switchToHttp()
      .getRequest<express.Request & { user: User }>();
    Logger.log(`request.path: ${request.path}`, "errors.interceptor");
    return next.handle().pipe(
      catchError(err => {
        console.log("ERRR", err);
        throw err;
      }),
      tap(x => Logger.log(`XXX: ${x}`, "errors.interceptor"))
    );
  }
}
