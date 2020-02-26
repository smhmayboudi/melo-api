import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor
} from "@nestjs/common";
import express from "express";
import { Counter } from "prom-client";
import { Observable } from "rxjs";
import { AuthJwtPayloadReqDto } from "../auth/dto/req/auth.jwt-payload.req.dto";
import {
  PROM_INTERCEPTOR_HTTP_REQUESTS_TOTAL,
  PROM_MODULE_OPTIONS
} from "./prom.constant";
import { InjectCounter } from "./prom.decorator";
import { PromModuleOptions } from "./prom.module.interface";

@Injectable()
export class PromInterceptor implements NestInterceptor {
  constructor(
    @InjectCounter(PROM_INTERCEPTOR_HTTP_REQUESTS_TOTAL)
    private readonly counter: Counter<string>,
    @Inject(PROM_MODULE_OPTIONS)
    private readonly options: PromModuleOptions
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<Response> {
    const request = context
      .switchToHttp()
      .getRequest<express.Request & { user: AuthJwtPayloadReqDto }>();
    if (
      this.options.ignorePaths !== undefined &&
      !this.options.ignorePaths.includes(request.route.path)
    ) {
      this.counter.inc({
        method: request.method,
        path: request.route.path,
        status: 200
      });
    }
    return next.handle();
  }
}
