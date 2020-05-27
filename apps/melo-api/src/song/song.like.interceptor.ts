import {
  APP_REQUEST_USER_SUB_ANONYMOUS_ID,
  AuthJwtPayloadReqDto,
  DataPaginationResDto,
  SongResDto,
} from "@melo/common";
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";

import { AppSongService } from "../app/app.song.service";
import { Observable } from "rxjs";
import express from "express";
import { flatMap } from "rxjs/operators";

@Injectable()
export class SongLikeInterceptor implements NestInterceptor {
  constructor(private readonly appSongService: AppSongService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<DataPaginationResDto<SongResDto> | SongResDto> {
    const http = context.switchToHttp();
    const request = http.getRequest<
      express.Request & { user: AuthJwtPayloadReqDto }
    >();
    return next.handle().pipe(
      flatMap(async (data) => {
        if (request.user.sub === APP_REQUEST_USER_SUB_ANONYMOUS_ID) {
          return data;
        } else if (data === undefined) {
          // because of sendTelegram service which is void
          return data;
        } else if (data.total === undefined) {
          return await this.appSongService.like({
            song: data,
            sub: parseInt(request.user.sub, 10),
          });
        } else {
          return {
            results: await this.appSongService.likes({
              songs: data.results,
              sub: parseInt(request.user.sub, 10),
            }),
            total: data.total,
          };
        }
      })
    );
  }
}
