import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";

import { AppArtist } from "../app/app.artist";
import { AuthJwtPayloadReqDto } from "../auth/dto/req/auth.jwt-payload.req.dto";
import { DataAlbumResDto } from "../data/dto/res/data.album.res.dto";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { Observable } from "rxjs";
import express from "express";
import { flatMap } from "rxjs/operators";

@Injectable()
export class AlbumFollowInterceptor implements NestInterceptor {
  constructor(private readonly appArtist: AppArtist) {}

  transform = async (
    album: DataAlbumResDto,
    sub: number
  ): Promise<DataAlbumResDto> => ({
    ...album,
    artists:
      album.artists === undefined
        ? undefined
        : await this.appArtist.follow(album.artists, sub),
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
      flatMap(async (data) => {
        if (request.user.sub === "0") {
          return data;
        } else if (data.total === undefined) {
          const result = await this.transform([data], request.user.sub);
          return result[0];
        } else {
          return {
            results: await this.transform(data.results, request.user.sub),
            total: data.total,
          } as DataPaginationResDto<DataAlbumResDto>;
        }
      })
    );
  }
}
