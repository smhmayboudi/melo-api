import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from "@nestjs/common";
import express from "express";
import { Counter } from "prom-client";
import { Observable } from "rxjs";
import { AuthJwtPayloadReqDto } from "../auth/dto/req/auth.jwt-payload.req.dto";
import { HTTP_REQUESTS_TOTAL } from "./prom.constant";
import { InjectCounter } from "./prom.decorators";

@Injectable()
export class PromInterceptor implements NestInterceptor {
  constructor(
    @InjectCounter(HTTP_REQUESTS_TOTAL)
    private readonly counter: Counter<string>
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<Response> {
    const request = context
      .switchToHttp()
      .getRequest<express.Request & { user: AuthJwtPayloadReqDto }>();
    this.counter.inc({
      method: request.method,
      path: request.route.path,
      status: 200
    });
    return next.handle();
  }
}
