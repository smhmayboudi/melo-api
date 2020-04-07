import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { AuthJwtPayloadReqDto } from "../auth/dto/req/auth.jwt-payload.req.dto";
import { DataAlbumResDto } from "../data/dto/res/data.album.res.dto";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataSongResDto } from "../data/dto/res/data.song.res.dto";
import { Observable } from "rxjs";
import express from "express";
import { map } from "rxjs/operators";

const transform = (album: DataAlbumResDto): DataAlbumResDto => ({
  ...album,
  songs:
    album.songs === undefined
      ? undefined
      : ({
          results: album.songs.results.map((valueSong) =>
            valueSong.localized === true
              ? {
                  ...valueSong,
                  audio: undefined,
                  lyrics: undefined,
                }
              : valueSong
          ),
          total: album.songs.total,
        } as DataPaginationResDto<DataSongResDto>),
});

@Injectable()
export class AlbumLocalizeInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<DataPaginationResDto<DataAlbumResDto> | DataAlbumResDto> {
    const http = context.switchToHttp();
    const request = http.getRequest<
      express.Request & { user: AuthJwtPayloadReqDto }
    >();
    return next.handle().pipe(
      // TODO: data should have type withuot writing
      map((data) => {
        if (request.user.sub !== "0") {
          return data;
        } else if (data.total === undefined) {
          return transform(data);
        } else {
          return {
            results: data.results.map((value) => transform(value)),
            total: data.total,
          } as DataPaginationResDto<DataAlbumResDto>;
        }
      })
    );
  }
}
