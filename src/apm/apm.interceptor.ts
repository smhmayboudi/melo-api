import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from "@nestjs/common";
import express from "express";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { AuthJwtPayloadReqDto } from "../auth/dto/req/auth.jwt-payload.req.dto";
import { ApmService } from "./apm.service";

@Injectable()
export class ApmInterceptor implements NestInterceptor {
  constructor(private readonly apmService: ApmService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<Response> {
    const http = context.switchToHttp();
    const request = http.getRequest<
      express.Request & { user: AuthJwtPayloadReqDto }
    >();
    this.apmService.setUserContext({
      id: request.user && request.user.sub
    });
    return next.handle().pipe(
      tap(undefined, error => {
        this.apmService.captureError(error);
      })
    );
  }
}
