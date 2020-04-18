import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";

import { AppSong } from "../app/app.song";
import { AuthJwtPayloadReqDto } from "../auth/dto/req/auth.jwt-payload.req.dto";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { EmotionResDto } from "./dto/res/emotion.res.dto";
import { Observable } from "rxjs";
import express from "express";
import { flatMap } from "rxjs/operators";

@Injectable()
export class EmotionLikeInterceptor implements NestInterceptor {
  constructor(private readonly appSong: AppSong) {}

  transform = async (
    emotion: EmotionResDto,
    sub: number
  ): Promise<EmotionResDto> => {
    const song = await this.appSong.like([emotion.song], sub);
    return { ...emotion, song: song[0] };
  };

  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<DataPaginationResDto<EmotionResDto>> {
    const http = context.switchToHttp();
    const request = http.getRequest<
      express.Request & { user: AuthJwtPayloadReqDto }
    >();
    return next.handle().pipe(
      flatMap(async (data) => {
        return {
          results: (await Promise.all(
            data.results.map(
              async (value) =>
                await this.transform(value, parseInt(request.user.sub, 10))
            )
          )) as EmotionResDto[],
          total: data.total,
        } as DataPaginationResDto<EmotionResDto>;
      })
    );
  }
}
