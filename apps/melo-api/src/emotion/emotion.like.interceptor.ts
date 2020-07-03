import {
  APP_REQUEST_USER_SUB_ANONYMOUS_ID,
  AuthJwtPayloadReqDto,
  EmotionEmotionsResDto,
} from "@melo/common";
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";

import { AppSongService } from "../app/app.song.service";
import { Observable } from "rxjs";
import fastify from "fastify";
import { flatMap } from "rxjs/operators";

@Injectable()
export class EmotionLikeInterceptor implements NestInterceptor {
  constructor(private readonly appSongService: AppSongService) {}

  transform = async (
    dto: EmotionEmotionsResDto,
    sub: string
  ): Promise<EmotionEmotionsResDto> => {
    const song = await this.appSongService.like({
      song: dto.song,
      sub: parseInt(sub, 10),
    });
    return {
      ...dto,
      song,
    };
  };

  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<EmotionEmotionsResDto[]> {
    const http = context.switchToHttp();
    const request = http.getRequest<
      fastify.FastifyRequest & { user: AuthJwtPayloadReqDto }
    >();
    return next.handle().pipe(
      flatMap(async (data) => {
        if (request.user.sub === APP_REQUEST_USER_SUB_ANONYMOUS_ID) {
          return data;
        } else if (data.length === undefined) {
          return this.transform(data, request.user.sub);
        } else {
          return data.map((value) => this.transform(value, request.user.sub));
        }
      })
    );
  }
}
