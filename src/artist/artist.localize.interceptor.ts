import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";

import { AppSongService } from "../app/app.song.service";
import { AuthJwtPayloadReqDto } from "../auth/dto/req/auth.jwt-payload.req.dto";
import { DataArtistResDto } from "../data/dto/res/data.artist.res.dto";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { Observable } from "rxjs";
import express from "express";
import { map } from "rxjs/operators";

@Injectable()
export class ArtistLocalizeInterceptor implements NestInterceptor {
  constructor(private readonly appSongService: AppSongService) {}

  transform = (artists: DataArtistResDto[]): DataArtistResDto[] =>
    artists.map(
      (value) =>
        ({
          ...value,
          albums:
            value.albums === undefined
              ? undefined
              : {
                  results: value.albums.results.map((value) => ({
                    ...value,
                    songs:
                      value.songs === undefined
                        ? undefined
                        : {
                            results: value.songs.results.map((value) =>
                              this.appSongService.localize(value)
                            ),
                            total: value.songs.total,
                          },
                  })),
                  total: value.albums.total,
                },
          songs:
            value.songs === undefined
              ? undefined
              : {
                  results: value.songs.results.map((value) =>
                    this.appSongService.localize(value)
                  ),
                  total: value.songs.total,
                },
        } as DataArtistResDto)
    );

  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<DataPaginationResDto<DataArtistResDto> | DataArtistResDto> {
    const http = context.switchToHttp();
    const request = http.getRequest<
      express.Request & { user: AuthJwtPayloadReqDto }
    >();
    return next.handle().pipe(
      map((data) => {
        if (request.user.sub !== "0") {
          return data;
        } else if (data.total === undefined) {
          return this.transform([data])[0];
        } else {
          return {
            results: this.transform(data.results),
            total: data.total,
          };
        }
      })
    );
  }
}
