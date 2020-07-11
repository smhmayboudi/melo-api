import * as fastify from "fastify";

import {
  APP_REQUEST_USER_SUB_ANONYMOUS_ID,
  ArtistResDto,
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
export class ArtistLocalizeInterceptor implements NestInterceptor {
  constructor(private readonly appSongService: AppSongService) {}

  transform = async (dto: ArtistResDto): Promise<ArtistResDto> =>
    ({
      ...dto,
      albums:
        dto.albums === undefined
          ? undefined
          : dto.albums.map(async (value) => ({
              ...value,
              songs:
                value.songs === undefined
                  ? undefined
                  : await Promise.all(
                      value.songs.map(
                        async (value) =>
                          await this.appSongService.localize({
                            song: value,
                          })
                      )
                    ),
            })),
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
    } as ArtistResDto);

  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<ArtistResDto[] | ArtistResDto> {
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
