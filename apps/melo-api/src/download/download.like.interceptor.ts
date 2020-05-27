import {
  APP_REQUEST_USER_SUB_ANONYMOUS_ID,
  AuthJwtPayloadReqDto,
  DataPaginationResDto,
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
import express from "express";
import { flatMap } from "rxjs/operators";

@Injectable()
export class DownloadLikeInterceptor implements NestInterceptor {
  constructor(private readonly appSongService: AppSongService) {}

  transform = async (
    dto: DownloadSongResDto,
    sub: string
  ): Promise<DownloadSongResDto> => ({
    ...dto,
    song: await this.appSongService.like({
      song: dto.song,
      sub: parseInt(sub, 10),
    }),
  });

  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<DataPaginationResDto<DownloadSongResDto> | DownloadSongResDto> {
    const http = context.switchToHttp();
    const request = http.getRequest<
      express.Request & { user: AuthJwtPayloadReqDto }
    >();
    return next.handle().pipe(
      flatMap(async (data) => {
        if (request.user.sub === APP_REQUEST_USER_SUB_ANONYMOUS_ID) {
          return data;
        } else if (data.total === undefined) {
          return this.transform(data, request.user.sub);
        } else {
          return {
            results: data.results.map((value) =>
              this.transform(value, request.user.sub)
            ),
            total: data.total,
          };
        }
      })
    );
  }
}
