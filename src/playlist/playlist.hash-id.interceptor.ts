import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";

import { AppEncodingService } from "../app/app.encoding.service";
import { AppHashIdService } from "../app/app.hash-id.service";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataPlaylistResDto } from "../data/dto/res/data.playlist.res.dto";
import { Observable } from "rxjs";
import express from "express";
import { map } from "rxjs/operators";

@Injectable()
export class PlaylistHashIdInterceptor implements NestInterceptor {
  constructor(
    private readonly appEncodingService: AppEncodingService,
    private readonly appHashIdService: AppHashIdService
  ) {}

  transform = (playlists: DataPlaylistResDto[]): DataPlaylistResDto[] =>
    this.appEncodingService.encodePlaylists(playlists);

  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<DataPaginationResDto<DataPlaylistResDto> | DataPlaylistResDto> {
    const http = context.switchToHttp();
    const request = http.getRequest<express.Request>();
    const fields = ["songId"];
    const reqFields = ["body", "params"];
    reqFields.map((reqField) => {
      fields.map((value) => {
        if (request[reqField][value] !== undefined) {
          request[reqField][value] = this.appHashIdService
            .decode(request[reqField][value])
            .toString();
        }
      });
    });
    return next.handle().pipe(
      map((data) => {
        if (data.total === undefined) {
          return this.transform([data])[0];
        } else {
          return {
            results: this.transform(data.results),
            total: data.total,
          } as DataPaginationResDto<DataPlaylistResDto>;
        }
      })
    );
  }
}
