import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";

import { AppCheckFollowService } from "../app/app.check-follow.service";
import { AuthJwtPayloadReqDto } from "../auth/dto/req/auth.jwt-payload.req.dto";
import { DataAlbumResDto } from "../data/dto/res/data.album.res.dto";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { Observable } from "rxjs";
import express from "express";
import { flatMap } from "rxjs/operators";

@Injectable()
export class AlbumFollowInterceptor implements NestInterceptor {
  constructor(private readonly appMixArtistService: AppCheckFollowService) {}

  transform = async (
    album: DataAlbumResDto,
    sub: number
  ): Promise<DataAlbumResDto> => ({
    ...album,
    artists:
      album.artists === undefined
        ? undefined
        : await this.appMixArtistService.follow(album.artists, sub),
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
          return this.transform(data, parseInt(request.user.sub, 10));
        } else {
          return {
            results: (await Promise.all(
              data.results.map(async (value) => {
                await this.transform(value, parseInt(request.user.sub, 10));
              })
            )) as DataAlbumResDto[],
            total: data.total,
          } as DataPaginationResDto<DataAlbumResDto>;
        }
      })
    );
  }
}
