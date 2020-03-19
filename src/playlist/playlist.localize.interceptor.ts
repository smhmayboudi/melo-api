import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from "@nestjs/common";
import { AuthJwtPayloadReqDto } from "src/auth/dto/req/auth.jwt-payload.req.dto";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataPlaylistResDto } from "src/data/dto/res/data.playlist.res.dto";
import { DataSongResDto } from "../data/dto/res/data.song.res.dto";
import { Observable } from "rxjs";
import express from "express";
import { map } from "rxjs/operators";

const transform = (playlist: DataPlaylistResDto): DataPlaylistResDto => ({
  ...playlist,
  songs:
    playlist.songs === undefined
      ? undefined
      : ({
          results: playlist.songs.results.map(value =>
            value.localized === true
              ? {
                  ...value,
                  audio: undefined,
                  lyrics: undefined
                }
              : value
          ),
          total: playlist.songs.total
        } as DataPaginationResDto<DataSongResDto>)
});

@Injectable()
export class PlaylistLocalizeInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<DataPaginationResDto<DataPlaylistResDto> | DataPlaylistResDto> {
    const http = context.switchToHttp();
    const request = http.getRequest<
      express.Request & { user: AuthJwtPayloadReqDto }
    >();
    return next.handle().pipe(
      map(data => {
        if (request.user.sub !== "0") {
          return data;
        } else if (data.total === undefined) {
          return transform(data);
        } else {
          return {
            results: data.results.map(value => transform(value)),
            total: data.total
          } as DataPaginationResDto<DataPlaylistResDto>;
        }
      })
    );
  }
}
