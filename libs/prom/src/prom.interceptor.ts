import * as express from "express";

import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import {
  PROM_INTERCEPTOR_HTTP_REQUESTS_TOTAL,
  PROM_MODULE_OPTIONS,
} from "./prom.constant";

import { Counter } from "prom-client";
import { InjectCounter } from "./prom.decorator";
import { Observable } from "rxjs";
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
    const http = context.switchToHttp();
    const request = http.getRequest<express.Request>();
    const response = http.getResponse<express.Response>();
    if (
      this.options.ignorePaths !== undefined &&
      !this.options.ignorePaths.includes(request.route.path)
    ) {
      this.counter.inc({
        method: request.method,
        path: request.route.path,
        status: response.statusCode,
      });
    }
    return next.handle();
  }
}
