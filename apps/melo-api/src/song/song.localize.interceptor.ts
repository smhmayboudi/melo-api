import * as fastify from "fastify";

import {
  APP_REQUEST_USER_SUB_ANONYMOUS_ID,
  AuthJwtPayloadReqDto,
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
import { map } from "rxjs/operators";

@Injectable()
export class SongLocalizeInterceptor implements NestInterceptor {
  constructor(private readonly appSongService: AppSongService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<SongResDto[] | SongResDto> {
    const http = context.switchToHttp();
    const request = http.getRequest<
      fastify.FastifyRequest & { user: AuthJwtPayloadReqDto }
    >();
    return next.handle().pipe(
      map((data) => {
        if (request.user.sub !== APP_REQUEST_USER_SUB_ANONYMOUS_ID) {
          return data;
        } else if (data.length === undefined) {
          return this.appSongService.localize({
            song: data,
          });
        } else {
          return data.map((value) =>
            this.appSongService.localize({
              song: value,
            })
          );
        }
      })
    );
  }
}
