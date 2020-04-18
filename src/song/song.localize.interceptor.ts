import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";

import { AuthJwtPayloadReqDto } from "../auth/dto/req/auth.jwt-payload.req.dto";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataSongResDto } from "../data/dto/res/data.song.res.dto";
import { Observable } from "rxjs";
import express from "express";
import { map } from "rxjs/operators";

const transform = (song: DataSongResDto): DataSongResDto =>
  song.localized === true
    ? {
        ...song,
        audio: undefined,
        lyrics: undefined,
      }
    : song;

@Injectable()
export class SongLocalizeInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<DataPaginationResDto<DataSongResDto> | DataSongResDto> {
    const http = context.switchToHttp();
    const request = http.getRequest<
      express.Request & { user: AuthJwtPayloadReqDto }
    >();
    return next.handle().pipe(
      map((data) => {
        if (request.user.sub !== "0") {
          return data;
        } else if (data.total === undefined) {
          return transform(data);
        } else {
          return {
            results: data.results.map((value) => transform(value)),
            total: data.total,
          } as DataPaginationResDto<DataSongResDto>;
        }
      })
    );
  }
}
