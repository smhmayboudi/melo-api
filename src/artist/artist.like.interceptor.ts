import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from "@nestjs/common";

import { AppMixSongService } from "../app/app.mix-song.service";
import { AuthJwtPayloadReqDto } from "../auth/dto/req/auth.jwt-payload.req.dto";
import { DataArtistResDto } from "src/data/dto/res/data.artist.res.dto";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataSongResDto } from "../data/dto/res/data.song.res.dto";
import { Observable } from "rxjs";
import express from "express";
import { flatMap } from "rxjs/operators";

@Injectable()
export class ArtistLikeInterceptor implements NestInterceptor {
  constructor(private readonly appMixSongService: AppMixSongService) {}

  transform = async (
    artist: DataArtistResDto,
    sub: number
  ): Promise<DataArtistResDto> => ({
    ...artist,
    songs:
      artist.songs === undefined
        ? undefined
        : (({
            results: await this.appMixSongService.mixSong(
              artist.songs.results,
              sub
            ),
            total: artist.songs.total
          } as unknown) as DataPaginationResDto<DataSongResDto>)
  });

  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<DataPaginationResDto<DataArtistResDto> | DataArtistResDto> {
    const http = context.switchToHttp();
    const request = http.getRequest<
      express.Request & { user: AuthJwtPayloadReqDto }
    >();
    return next.handle().pipe(
      flatMap(async data => {
        if (request.user.sub === "0") {
          return data;
        } else if (data.total === undefined) {
          return this.transform(data, parseInt(request.user.sub, 10));
        } else {
          return {
            results: (await Promise.all(
              data.results.map(
                async value =>
                  await this.transform(value, parseInt(request.user.sub, 10))
              )
            )) as DataArtistResDto[],
            total: data.total
          } as DataPaginationResDto<DataArtistResDto>;
        }
      })
    );
  }
}
