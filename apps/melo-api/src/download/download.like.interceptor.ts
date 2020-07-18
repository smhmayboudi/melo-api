import * as express from "express";

import {
  APP_REQUEST_USER_SUB_ANONYMOUS_ID,
  AuthJwtPayloadReqDto,
  DownloadSongResDto,
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
export class DownloadLikeInterceptor implements NestInterceptor {
  constructor(private readonly appSongService: AppSongService) {}

  transform = async (
    dto: DownloadSongResDto,
    sub: string
  ): Promise<DownloadSongResDto> => {
    const song = await this.appSongService.like({
      song: dto.song,
      sub: parseInt(sub, 10),
    });
    return {
      ...dto,
      song,
    };
  };

  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<DownloadSongResDto[] | DownloadSongResDto> {
    const http = context.switchToHttp();
    const request = http.getRequest<
      express.Request & { user: AuthJwtPayloadReqDto }
    >();
    return next.handle().pipe(
      flatMap(async (data) => {
        if (request.user.sub === APP_REQUEST_USER_SUB_ANONYMOUS_ID) {
          return data;
        } else if (data.length === undefined) {
          return this.transform(data, request.user.sub);
        } else {
          return data.map((value) => this.transform(value, request.user.sub));
        }
      })
    );
  }
}
