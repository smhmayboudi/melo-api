import * as express from "express";

import {
  APP_REQUEST_USER_SUB_ANONYMOUS_ID,
  AuthJwtPayloadReqDto,
  PlaylistResDto,
} from "@melo/common";
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";

import { AppSongService } from "../app/app.song.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class PlaylistLocalizeInterceptor implements NestInterceptor {
  constructor(private readonly appSongService: AppSongService) {}

  transform = async (dto: PlaylistResDto): Promise<PlaylistResDto> => ({
    ...dto,
    songs:
      dto.songs === undefined
        ? undefined
        : await Promise.all(
            dto.songs.map(
              async (value) =>
                await this.appSongService.localize({
                  song: value,
                })
            )
          ),
  });

  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<PlaylistResDto[] | PlaylistResDto> {
    const http = context.switchToHttp();
    const request = http.getRequest<
      express.Request & { user: AuthJwtPayloadReqDto }
    >();
    return next.handle().pipe(
      map((data) => {
        if (request.user.sub !== APP_REQUEST_USER_SUB_ANONYMOUS_ID) {
          return data;
        } else if (data.length === undefined) {
          return this.transform(data);
        } else {
          return data.map((value) => this.transform(value));
        }
      })
    );
  }
}
