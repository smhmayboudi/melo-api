import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";

import { AppSongService } from "../app/app.song.service";
import { AuthJwtPayloadReqDto } from "../auth/dto/req/auth.jwt-payload.req.dto";
import { DataAlbumResDto } from "../data/dto/res/data.album.res.dto";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataSongResDto } from "../data/dto/res/data.song.res.dto";
import { Observable } from "rxjs";
import express from "express";
import { map } from "rxjs/operators";

@Injectable()
export class AlbumLocalizeInterceptor implements NestInterceptor {
  constructor(private readonly appSongService: AppSongService) {}

  transform = (album: DataAlbumResDto): DataAlbumResDto => ({
    ...album,
    songs:
      album.songs === undefined
        ? undefined
        : ({
            results: album.songs.results.map((value) =>
              this.appSongService.localize(value)
            ),
            total: album.songs.total,
          } as DataPaginationResDto<DataSongResDto>),
  });

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
          return this.transform(data);
        } else {
          return {
            results: data.results.map((value) => this.transform(value)),
            total: data.total,
          };
        }
      })
    );
  }
}
