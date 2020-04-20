import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";

import { AppEncodingService } from "../app/app.encoding.service";
import { AppHashIdService } from "../app/app.hash-id.service";
import { AuthJwtPayloadReqDto } from "../auth/dto/req/auth.jwt-payload.req.dto";
import { DataArtistResDto } from "../data/dto/res/data.artist.res.dto";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { Observable } from "rxjs";
import express from "express";
import { map } from "rxjs/operators";

@Injectable()
export class ArtistHashIdInterceptor implements NestInterceptor {
  constructor(
    private readonly appEncodingService: AppEncodingService,
    private readonly appHashIdService: AppHashIdService
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<DataPaginationResDto<DataArtistResDto> | DataArtistResDto> {
    const http = context.switchToHttp();
    const request = http.getRequest<
      express.Request & { user: AuthJwtPayloadReqDto }
    >();
    const fields = ["id"];
    const reqFields = ["body", "params"];
    reqFields.map((reqField) => {
      fields.map((value) => {
        if (request[reqField][value] !== undefined) {
          request[reqField][value] = this.appHashIdService
            .decode(request[reqField][value])
            .toString();
        }
      });
    });
    return next.handle().pipe(
      map((data) => {
        if (data.total === undefined) {
          return this.appEncodingService.encodeArtists([data])[0];
        } else {
          return {
            results: this.appEncodingService.encodeArtists(data.results),
            total: data.total,
          } as DataPaginationResDto<DataArtistResDto>;
        }
      })
    );
  }
}
