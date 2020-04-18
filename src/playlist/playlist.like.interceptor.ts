import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";

import { AppSong } from "../app/app.song";
import { AuthJwtPayloadReqDto } from "../auth/dto/req/auth.jwt-payload.req.dto";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataPlaylistResDto } from "../data/dto/res/data.playlist.res.dto";
import { DataSongResDto } from "../data/dto/res/data.song.res.dto";
import { Observable } from "rxjs";
import express from "express";
import { flatMap } from "rxjs/operators";

@Injectable()
export class PlaylistLikeInterceptor implements NestInterceptor {
  constructor(private readonly appSong: AppSong) {}

  transform = async (
    playlist: DataPlaylistResDto,
    sub: number
  ): Promise<DataPlaylistResDto> => ({
    ...playlist,
    songs:
      playlist.songs === undefined
        ? undefined
        : ({
            results: await this.appSong.like(playlist.songs.results, sub),
            total: playlist.songs.total,
          } as DataPaginationResDto<DataSongResDto>),
  });

  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<DataPaginationResDto<DataPlaylistResDto> | DataPlaylistResDto> {
    const http = context.switchToHttp();
    const request = http.getRequest<
      express.Request & { user: AuthJwtPayloadReqDto }
    >();
    return next.handle().pipe(
      flatMap(async (data) => {
        if (request.user.sub === "0") {
          return data;
        } else if (data.total === undefined) {
          return this.transform(data, parseInt(request.user.sub, 10));
        } else {
          return {
            results: (await Promise.all(
              data.results.map(
                async (value) =>
                  await this.transform(value, parseInt(request.user.sub, 10))
              )
            )) as DataPlaylistResDto[],
            total: data.total,
          } as DataPaginationResDto<DataPlaylistResDto>;
        }
      })
    );
  }
}
