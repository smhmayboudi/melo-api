import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";

import { AppSongService } from "../app/app.song.service";
import { AuthJwtPayloadReqDto } from "../auth/dto/req/auth.jwt-payload.req.dto";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataSongResDto } from "../data/dto/res/data.song.res.dto";
import { Observable } from "rxjs";
import express from "express";
import { flatMap } from "rxjs/operators";

@Injectable()
export class SongLikeInterceptor implements NestInterceptor {
  constructor(private readonly appSongService: AppSongService) {}

  transform = (
    songs: DataSongResDto[],
    sub: string
  ): Promise<DataSongResDto[]> =>
    this.appSongService.like(songs, parseInt(sub, 10));

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
          const result = await this.transform(data.results, request.user.sub);
          return result[0];
        } else {
          return {
            results: await this.transform(data.results, request.user.sub),
            total: data.total,
          };
        }
      })
    );
  }
}
