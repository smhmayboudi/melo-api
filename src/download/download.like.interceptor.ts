import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";

import { AppSongService } from "../app/app.song.service";
import { AuthJwtPayloadReqDto } from "../auth/dto/req/auth.jwt-payload.req.dto";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DownloadSongResDto } from "./dto/res/download.song.res.dto";
import { Observable } from "rxjs";
import express from "express";
import { flatMap } from "rxjs/operators";

@Injectable()
export class DownloadLikeInterceptor implements NestInterceptor {
  constructor(private readonly appSongService: AppSongService) {}

  transform = (
    downloads: DownloadSongResDto[],
    sub: string
  ): Promise<DownloadSongResDto[]> =>
    Promise.all(
      downloads.map(async (value) => {
        const song = await this.appSongService.like(
          [value.song],
          parseInt(sub, 10)
        );
        return { ...value, song: song[0] } as DownloadSongResDto;
      })
    );

  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<DataPaginationResDto<DownloadSongResDto>> {
    const http = context.switchToHttp();
    const request = http.getRequest<
      express.Request & { user: AuthJwtPayloadReqDto }
    >();
    return next.handle().pipe(
      flatMap(
        async (data) =>
          ({
            results: await this.transform(data.results, request.user.sub),
            total: data.total,
          } as DataPaginationResDto<DownloadSongResDto>)
      )
    );
  }
}
