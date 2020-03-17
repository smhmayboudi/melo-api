import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from "@nestjs/common";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataSongResDto } from "../data/dto/res/data.song.res.dto";
import express from "express";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AuthJwtPayloadReqDto } from "src/auth/dto/req/auth.jwt-payload.req.dto";

@Injectable()
export class SongLocalizeInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<DataPaginationResDto<DataSongResDto> | DataSongResDto> {
    const http = context.switchToHttp();
    const request = http.getRequest<
      express.Request & { user: AuthJwtPayloadReqDto }
    >();
    return next.handle().pipe(
      map(data => {
        if (request.user.sub !== "0") {
          return data;
        }
        if (data.total === undefined) {
          if (data.localized === true) {
            return {
              ...data,
              audio: undefined,
              lyrics: undefined
            };
          }
          return data;
        }
        const manipulatedData: DataPaginationResDto<DataSongResDto> = {
          results: data.results.map(value => {
            if (value.localized === true) {
              return {
                ...data,
                audio: undefined,
                lyrics: undefined
              };
            }
            return value;
          }),
          total: data.total
        } as DataPaginationResDto<DataSongResDto>;
        return manipulatedData;
      })
    );
  }
}
