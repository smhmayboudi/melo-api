import {
  APP_REQUEST_USER_SUB_ANONYMOUS_ID,
  ArtistResDto,
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
export class ArtistLikeInterceptor implements NestInterceptor {
  constructor(private readonly appSongService: AppSongService) {}

  transform = async (
    dto: ArtistResDto,
    sub: string
  ): Promise<ArtistResDto> => ({
    ...dto,
    songs:
      dto.songs === undefined
        ? undefined
        : ({
            results: await this.appSongService.likes({
              songs: dto.songs.results,
              sub: parseInt(sub, 10),
            }),
            total: dto.songs.total,
          } as DataPaginationResDto<SongResDto>),
  });

  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<DataPaginationResDto<ArtistResDto> | ArtistResDto> {
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
