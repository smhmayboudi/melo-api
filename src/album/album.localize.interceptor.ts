import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from "@nestjs/common";
import { AuthJwtPayloadReqDto } from "src/auth/dto/req/auth.jwt-payload.req.dto";
import { DataAlbumResDto } from "../data/dto/res/data.album.res.dto";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { Observable } from "rxjs";
import express from "express";
import { map } from "rxjs/operators";

@Injectable()
export class AlbumLocalizeInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<DataPaginationResDto<DataAlbumResDto> | DataAlbumResDto> {
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
          return {
            ...data,
            songs:
              data.songs === undefined
                ? undefined
                : {
                    results: data.songs.results.map(value => {
                      if (value.localized === true) {
                        return {
                          ...value,
                          audio: undefined,
                          lyrics: undefined
                        };
                      }
                      return value;
                    }),
                    total: data.songs.total
                  }
          };
        }
        const manipulatedData: DataPaginationResDto<DataAlbumResDto> = {
          results: data.results.map(value => ({
            ...value,
            songs:
              value.songs === undefined
                ? undefined
                : {
                    results: value.songs.results.map(songValue => {
                      if (value.localized === true) {
                        return {
                          ...songValue,
                          audio: undefined,
                          lyrics: undefined
                        };
                      }
                      return songValue;
                    }),
                    total: value.songs.total
                  }
          })),
          total: data.total
        } as DataPaginationResDto<DataAlbumResDto>;
        return manipulatedData;
      })
    );
  }
}
