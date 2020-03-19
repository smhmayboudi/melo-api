import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from "@nestjs/common";

import { AuthJwtPayloadReqDto } from "src/auth/dto/req/auth.jwt-payload.req.dto";
import { DataAlbumResDto } from "src/data/dto/res/data.album.res.dto";
import { DataArtistResDto } from "../data/dto/res/data.artist.res.dto";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataSongResDto } from "../data/dto/res/data.song.res.dto";
import { Observable } from "rxjs";
import express from "express";
import { map } from "rxjs/operators";

const transform = (artist: DataArtistResDto): DataArtistResDto => ({
  ...artist,
  albums:
    artist.albums === undefined
      ? undefined
      : ({
          results: artist.albums.results.map(value => ({
            ...value,
            songs:
              value.songs === undefined
                ? undefined
                : value.songs.results.map(songValue => {
                    songValue.localized === true
                      ? {
                          ...songValue,
                          audio: undefined,
                          lyrics: undefined
                        }
                      : songValue;
                  })
          })),
          total: artist.albums.total
        } as DataPaginationResDto<DataAlbumResDto>),
  songs:
    artist.songs === undefined
      ? undefined
      : (({
          results: artist.songs.results.map(value => {
            value.localized === true
              ? {
                  ...value,
                  audio: undefined,
                  lyrics: undefined
                }
              : value;
          }),
          total: artist.songs.total
        } as unknown) as DataPaginationResDto<DataSongResDto>)
});

@Injectable()
export class ArtistLocalizeInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<DataPaginationResDto<DataArtistResDto> | DataArtistResDto> {
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
          } as DataPaginationResDto<DataArtistResDto>;
        }
      })
    );
  }
}
