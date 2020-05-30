import {
  APP_REQUEST_USER_SUB_ANONYMOUS_ID,
  ArtistResDto,
  AuthJwtPayloadReqDto,
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
  ): Observable<ArtistResDto[] | ArtistResDto> {
    const http = context.switchToHttp();
    const request = http.getRequest<
      express.Request & { user: AuthJwtPayloadReqDto }
    >();
    return next.handle().pipe(
      flatMap(async (data) => {
        if (request.user.sub === APP_REQUEST_USER_SUB_ANONYMOUS_ID) {
          return data;
        } else if (data.length === undefined) {
          return this.appArtistService.follow({
            artist: data,
            sub: parseInt(request.user.sub, 10),
          });
        } else {
          return await this.appArtistService.follows({
            artists: data,
            sub: parseInt(request.user.sub, 10),
          });
        }
      })
    );
  }
}
