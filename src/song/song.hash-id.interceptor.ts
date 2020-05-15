import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";

import { AppHashIdService } from "../app/app.hash-id.service";
import { AuthJwtPayloadReqDto } from "../auth/dto/req/auth.jwt-payload.req.dto";
import { Observable } from "rxjs";
import express from "express";
import { map } from "rxjs/operators";

@Injectable()
export class SongHashIdInterceptor implements NestInterceptor {
  constructor(private readonly appHashIdService: AppHashIdService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const http = context.switchToHttp();
    const request = http.getRequest<
      express.Request & { user: AuthJwtPayloadReqDto }
    >();
    const reqFields = ["body", "params"];
    const reqFields2 = ["id", "artistId"];
    reqFields.forEach((value) => {
      reqFields2.forEach((value2) => {
        if (request[value][value2] !== undefined) {
          // eslint-disable-next-line functional/immutable-data
          request[value][value2] = this.appHashIdService
            .decode(request[value][value2])
            .toString();
        }
      });
    });
    return next.handle().pipe(
      map((data) => {
        if (data.total === undefined) {
          return this.appHashIdService.encodeSong(data);
        } else {
          return {
            results: data.results.map((value) =>
              this.appHashIdService.encodeSong(value)
            ),
            total: data.total,
          };
        }
      })
    );
  }
}
