import {
  APP_REQUEST_USER_SUB_ANONYMOUS_ID,
  AuthJwtPayloadReqDto,
  DataPaginationResDto,
  PlaylistResDto,
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
import { map } from "rxjs/operators";

@Injectable()
export class PlaylistLocalizeInterceptor implements NestInterceptor {
  constructor(private readonly appSongService: AppSongService) {}

  transform = async (dto: PlaylistResDto): Promise<PlaylistResDto> => ({
    ...dto,
    songs:
      dto.songs === undefined
        ? undefined
        : ({
            results: await Promise.all(
              dto.songs.results.map(
                async (value) =>
                  await this.appSongService.localize({ song: value })
              )
            ),
            total: dto.songs.total,
          } as DataPaginationResDto<SongResDto>),
  });

  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<DataPaginationResDto<PlaylistResDto> | PlaylistResDto> {
    const http = context.switchToHttp();
    const request = http.getRequest<
      express.Request & { user: AuthJwtPayloadReqDto }
    >();
    return next.handle().pipe(
      map((data) => {
        if (request.user.sub !== APP_REQUEST_USER_SUB_ANONYMOUS_ID) {
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
