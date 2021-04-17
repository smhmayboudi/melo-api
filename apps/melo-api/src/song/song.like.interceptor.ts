import * as express from "express";

import {
  APP_REQUEST_USER_SUB_ANONYMOUS_ID,
  AuthJwtPayloadReqDto,
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
import { flatMap } from "rxjs/operators";

@Injectable()
export class SongLikeInterceptor implements NestInterceptor {
  constructor(private readonly appSongService: AppSongService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<SongResDto[] | SongResDto> {
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
        } else if (data.length === undefined) {
          return await this.appSongService.like({
            song: data,
            sub: parseInt(request.user.sub, 10),
          });
        } else {
          return await this.appSongService.likes({
            songs: data,
            sub: parseInt(request.user.sub, 10),
          });
        }
      })
    );
  }
}
