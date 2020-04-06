import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from "@nestjs/common";
import { AppMixSongService } from "../app/app.mix-song.service";
import { AuthJwtPayloadReqDto } from "../auth/dto/req/auth.jwt-payload.req.dto";
import { DataAlbumResDto } from "../data/dto/res/data.album.res.dto";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataSongResDto } from "../data/dto/res/data.song.res.dto";
import { Observable } from "rxjs";
import express from "express";
import { flatMap } from "rxjs/operators";

@Injectable()
export class AlbumLikeInterceptor implements NestInterceptor {
  constructor(private readonly appMixSongService: AppMixSongService) {}

  transform = async (
    album: DataAlbumResDto,
    sub: number
  ): Promise<DataAlbumResDto> => ({
    ...album,
    songs:
      album.songs === undefined
        ? undefined
        : (({
            results: await this.appMixSongService.mixSong(
              album.songs.results,
              sub
            ),
            total: album.songs.total
          } as unknown) as DataPaginationResDto<DataSongResDto>)
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
            )) as DataAlbumResDto[],
            total: data.total
          } as DataPaginationResDto<DataAlbumResDto>;
        }
      })
    );
  }
}
