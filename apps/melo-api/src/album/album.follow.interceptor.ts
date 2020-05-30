import {
  APP_REQUEST_USER_SUB_ANONYMOUS_ID,
  AlbumResDto,
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
export class AlbumFollowInterceptor implements NestInterceptor {
  constructor(private readonly appArtistService: AppArtistService) {}

  transform = async (dto: AlbumResDto, sub: string): Promise<AlbumResDto> => ({
    ...dto,
    artists:
      dto.artists === undefined
        ? undefined
        : await this.appArtistService.follows({
            artists: dto.artists,
            sub: parseInt(sub, 10),
          }),
  });

  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<AlbumResDto[] | AlbumResDto> {
    const http = context.switchToHttp();
    const request = http.getRequest<
      express.Request & { user: AuthJwtPayloadReqDto }
    >();
    return next.handle().pipe(
      flatMap(async (data) => {
        if (request.user.sub === APP_REQUEST_USER_SUB_ANONYMOUS_ID) {
          return data;
        } else if (data.length === undefined) {
          return this.transform(data, request.user.sub);
        } else {
          return data.map((value) => this.transform(value, request.user.sub));
        }
      })
    );
  }
}
