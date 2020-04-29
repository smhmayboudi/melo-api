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
export class AlbumHashIdInterceptor implements NestInterceptor {
  constructor(private readonly appHashIdService: AppHashIdService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const http = context.switchToHttp();
    const request = http.getRequest<
      express.Request & { user: AuthJwtPayloadReqDto }
    >();
    const fields = ["id", "artistId"];
    fields.map((value) => {
      if (request.params[value] !== undefined) {
        request.params[value] = this.appHashIdService
          .decode(request.params[value])
          .toString();
      }
    });
    return next.handle().pipe(
      map((data) => {
        if (data.total === undefined) {
          return this.appHashIdService.encodeAlbum(data);
        } else {
          return {
            results: data.results.map((value) =>
              this.appHashIdService.encodeAlbum(value)
            ),
            total: data.total,
          };
        }
      })
    );
  }
}
