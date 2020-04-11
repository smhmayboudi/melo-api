import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";

import { AppCheckLikeService } from "../app/app.check-like.service";
import { AuthJwtPayloadReqDto } from "../auth/dto/req/auth.jwt-payload.req.dto";
import { DataArtistResDto } from "src/data/dto/res/data.artist.res.dto";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataSongResDto } from "../data/dto/res/data.song.res.dto";
import { Observable } from "rxjs";
import express from "express";
import { flatMap } from "rxjs/operators";

@Injectable()
export class ArtistLikeInterceptor implements NestInterceptor {
  constructor(private readonly appCheckLikeService: AppCheckLikeService) {}

  transform = async (
    artists: DataArtistResDto[],
    sub: string
  ): Promise<DataArtistResDto[]> =>
    Promise.all(
      artists.map(async (value) => ({
        ...value,
        songs:
          value.songs === undefined
            ? undefined
            : ({
                results: await this.appCheckLikeService.like(
                  value.songs.results,
                  parseInt(sub, 10)
                ),
                total: value.songs.total,
              } as DataPaginationResDto<DataSongResDto>),
      }))
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
      flatMap(async (data) => {
        if (request.user.sub === "0") {
          return data;
        } else if (data.total === undefined) {
          const result = await this.transform([data], request.user.sub);
          return result[0];
        } else {
          return {
            results: await this.transform(data.result, request.user.sub),
            total: data.total,
          } as DataPaginationResDto<DataArtistResDto>;
        }
      })
    );
  }
}
