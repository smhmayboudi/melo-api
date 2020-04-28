import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";

import { AppEncodingService } from "../app/app.encoding.service";
import { AppHashIdService } from "../app/app.hash-id.service";
import { AuthJwtPayloadReqDto } from "../auth/dto/req/auth.jwt-payload.req.dto";
import { Observable } from "rxjs";
import express from "express";
import { map } from "rxjs/operators";

@Injectable()
export class PlaylistHashIdInterceptor implements NestInterceptor {
  constructor(
    private readonly appEncodingService: AppEncodingService,
    private readonly appHashIdService: AppHashIdService
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const http = context.switchToHttp();
    const request = http.getRequest<
      express.Request & { user: AuthJwtPayloadReqDto }
    >();
    const fields = ["songId"];
    const reqFields = ["body", "params"];
    reqFields.map((value) => {
      fields.map((value2) => {
        if (request[value][value2] !== undefined) {
          request[value][value2] = this.appHashIdService
            .decode(request[value][value2])
            .toString();
        }
      });
    });
    return next.handle().pipe(
      map((data) => {
        if (data.total === undefined) {
          return this.appEncodingService.playlist(data);
        } else {
          return {
            results: data.results.map((value) =>
              this.appEncodingService.playlist(value)
            ),
            total: data.total,
          };
        }
      })
    );
  }
}
