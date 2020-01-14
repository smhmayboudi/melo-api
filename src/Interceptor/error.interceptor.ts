import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor
} from "@nestjs/common";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import * as express from "express";
import { User } from "../user/type/User";

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context
      .switchToHttp()
      .getRequest<express.Request & { user: User }>();
    Logger.log(`request.path: ${request.path}`, "error.interceptor");
    return next.handle().pipe(
      catchError((error: Error) => {
        Logger.log(`${error}`, "error.interceptor");
        throw error;
      })
    );
  }
}
