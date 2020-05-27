import {
  APP_REQUEST_USER_SUB_ANONYMOUS_ID,
  ArtistResDto,
  AuthJwtPayloadReqDto,
  DataPaginationResDto,
} from "@melo/common";
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";

import { AppArtistService } from "../app/app.artist.service";
import { Observable } from "rxjs";
import express from "express";
import { flatMap } from "rxjs/operators";

@Injectable()
export class ArtistFollowInterceptor implements NestInterceptor {
  constructor(private readonly appArtistService: AppArtistService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<DataPaginationResDto<ArtistResDto> | ArtistResDto> {
    const http = context.switchToHttp();
    const request = http.getRequest<
      express.Request & { user: AuthJwtPayloadReqDto }
    >();
    return next.handle().pipe(
      flatMap(async (data) => {
        if (request.user.sub === APP_REQUEST_USER_SUB_ANONYMOUS_ID) {
          return data;
        } else if (data.total === undefined) {
          return this.appArtistService.follow({
            artist: data,
            sub: parseInt(request.user.sub, 10),
          });
        } else {
          return {
            results: await this.appArtistService.follows({
              artists: data.results,
              sub: parseInt(request.user.sub, 10),
            }),
            total: data.total,
          };
        }
      })
    );
  }
}
