import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";

import { AppArtist } from "../app/app.artist";
import { AuthJwtPayloadReqDto } from "../auth/dto/req/auth.jwt-payload.req.dto";
import { DataArtistResDto } from "../data/dto/res/data.artist.res.dto";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { Observable } from "rxjs";
import express from "express";
import { flatMap } from "rxjs/operators";

@Injectable()
export class ArtistFollowInterceptor implements NestInterceptor {
  constructor(private readonly appArtist: AppArtist) {}

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
          const result = await this.appArtist.follow(
            [data],
            parseInt(request.user.sub, 10)
          );
          return result[0];
        } else {
          return {
            results: await this.appArtist.follow(
              data.results,
              parseInt(request.user.sub, 10)
            ),
            total: data.total,
          } as DataPaginationResDto<DataArtistResDto>;
        }
      })
    );
  }
}
