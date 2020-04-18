import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";

import { AppSong } from "../app/app.song";
import { AuthJwtPayloadReqDto } from "../auth/dto/req/auth.jwt-payload.req.dto";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataSongResDto } from "../data/dto/res/data.song.res.dto";
import { Observable } from "rxjs";
import express from "express";
import { flatMap } from "rxjs/operators";

@Injectable()
export class SongLikeInterceptor implements NestInterceptor {
  constructor(private readonly appSong: AppSong) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<DataPaginationResDto<DataSongResDto> | DataSongResDto> {
    const http = context.switchToHttp();
    const request = http.getRequest<
      express.Request & { user: AuthJwtPayloadReqDto }
    >();
    return next.handle().pipe(
      flatMap(async (data) => {
        if (request.user.sub === "0") {
          return data;
        } else if (data === undefined) {
          // because of sendTelegram service which is void
          return data;
        } else if (data.total === undefined) {
          const result = await this.appSong.like(
            [data],
            parseInt(request.user.sub, 10)
          );
          return result[0];
        } else {
          return {
            results: await this.appSong.like(
              data.results,
              parseInt(request.user.sub, 10)
            ),
            total: data.total,
          };
        }
      })
    );
  }
}
