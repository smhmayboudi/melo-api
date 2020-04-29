import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";

import { AppSongService } from "../app/app.song.service";
import { AuthJwtPayloadReqDto } from "../auth/dto/req/auth.jwt-payload.req.dto";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataPlaylistResDto } from "../data/dto/res/data.playlist.res.dto";
import { DataSongResDto } from "../data/dto/res/data.song.res.dto";
import { Observable } from "rxjs";
import express from "express";
import { flatMap } from "rxjs/operators";

@Injectable()
export class PlaylistLikeInterceptor implements NestInterceptor {
  constructor(private readonly appSongService: AppSongService) {}

  transform = async (
    playlist: DataPlaylistResDto,
    sub: string
  ): Promise<DataPlaylistResDto> => ({
    ...playlist,
    songs:
      playlist.songs === undefined
        ? undefined
        : ({
            results: await this.appSongService.likes(
              playlist.songs.results,
              parseInt(sub, 10)
            ),
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
