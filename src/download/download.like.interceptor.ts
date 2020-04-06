import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from "@nestjs/common";

import { AppMixSongService } from "../app/app.mix-song.service";
import { AuthJwtPayloadReqDto } from "../auth/dto/req/auth.jwt-payload.req.dto";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DownloadSongResDto } from "./dto/res/download.song.res.dto";
import { Observable } from "rxjs";
import express from "express";
import { flatMap } from "rxjs/operators";

@Injectable()
export class DownloadLikeInterceptor implements NestInterceptor {
  constructor(private readonly appMixSongService: AppMixSongService) {}

  transform = async (
    download: DownloadSongResDto,
    sub: number
  ): Promise<DownloadSongResDto> => {
    const song = await this.appMixSongService.mixSong([download.song], sub);
    return { ...download, song: song[0] };
  };

  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<DataPaginationResDto<DownloadSongResDto>> {
    const http = context.switchToHttp();
    const request = http.getRequest<
      express.Request & { user: AuthJwtPayloadReqDto }
    >();
    return next.handle().pipe(
      flatMap(async data => {
        return {
          results: (await Promise.all(
            data.results.map(
              async value =>
                await this.transform(value, parseInt(request.user.sub, 10))
            )
          )) as DownloadSongResDto[],
          total: data.total
        } as DataPaginationResDto<DownloadSongResDto>;
      })
    );
  }
}
