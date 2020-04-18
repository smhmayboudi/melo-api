import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";

import { AppEncodingService } from "../app/app.encoding.service";
import { AppHashIdService } from "../app/app.hash-id.service";
import { DataAlbumResDto } from "../data/dto/res/data.album.res.dto";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { Observable } from "rxjs";
import express from "express";
import { map } from "rxjs/operators";

@Injectable()
export class AlbumHashIdInterceptor implements NestInterceptor {
  constructor(
    private readonly appEncodingService: AppEncodingService,
    private readonly appHashIdService: AppHashIdService
  ) {}

  transform = (albums: DataAlbumResDto[]): DataAlbumResDto[] =>
    albums.map((value) => this.appEncodingService.encodeAlbums([value])[0]);

  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<DataPaginationResDto<DataAlbumResDto> | DataAlbumResDto> {
    const http = context.switchToHttp();
    const request = http.getRequest<express.Request>();
    const fields = ["id", "artistId"];
    fields.map((value) => {
      if (request.params[value] !== undefined) {
        request.params[value] = this.appHashIdService
          .decode(request.params[value])
          .toString();
      }
    });
    return next.handle().pipe(
      map((data) => {
        if (data.total === undefined) {
          return this.transform([data])[0];
        } else {
          return {
            results: this.transform(data.results),
            total: data.total,
          } as DataPaginationResDto<DataAlbumResDto>;
        }
      })
    );
  }
}
