import * as fastify from "fastify";

import {
  APP_REQUEST_USER_SUB_ANONYMOUS_ID,
  AlbumResDto,
  AuthJwtPayloadReqDto,
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
export class AlbumLocalizeInterceptor implements NestInterceptor {
  constructor(private readonly appSongService: AppSongService) {}

  transform = async (dto: AlbumResDto): Promise<AlbumResDto> => ({
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
  ): Observable<AlbumResDto[] | AlbumResDto> {
    const http = context.switchToHttp();
    const request = http.getRequest<
      fastify.FastifyRequest & { user: AuthJwtPayloadReqDto }
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
