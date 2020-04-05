import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from "@nestjs/common";
import { AppHashIdService } from "../app/app.hash-id.service";
import { AuthJwtPayloadReqDto } from "../auth/dto/req/auth.jwt-payload.req.dto";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataSongResDto } from "../data/dto/res/data.song.res.dto";
import { Observable } from "rxjs";
import { RelationEntityType } from "../relation/relation.entity.type";
import { RelationService } from "../relation/relation.service";
import { RelationType } from "../relation/relation.type";
import express from "express";
import { flatMap } from "rxjs/operators";

@Injectable()
export class SongMixInterceptor implements NestInterceptor {
  constructor(
    private readonly appHashIdService: AppHashIdService,
    private readonly relationService: RelationService
  ) {}
  transform = async (
    songs: DataSongResDto[],
    sub: number
  ): Promise<DataSongResDto[]> => {
    const relationMultiHasResDto = await this.relationService.multiHas({
      from: {
        id: sub.toString(),
        type: RelationEntityType.user
      },
      relationType: RelationType.likedSongs,
      tos: songs.map(value => ({
        id: this.appHashIdService.decode(value.id).toString(),
        type: RelationEntityType.song
      }))
    });
    return songs.map(value => ({
      ...value,
      liked:
        relationMultiHasResDto.find(
          value2 =>
            value2.to.id === this.appHashIdService.decode(value.id).toString()
        ) !== undefined
    }));
  };

  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<DataPaginationResDto<DataSongResDto> | DataSongResDto> {
    const http = context.switchToHttp();
    const request = http.getRequest<
      express.Request & { user: AuthJwtPayloadReqDto }
    >();
    return next.handle().pipe(
      flatMap(async data => {
        if (request.user.sub === "0") {
          return data;
        } else if (data === undefined) {
          // because of sendTelegram service which is void
          return data;
        } else if (data.total === undefined) {
          const result = await this.transform(
            [data],
            parseInt(request.user.sub, 10)
          );
          return result[0];
        } else {
          const results = await this.transform(
            data.results,
            parseInt(request.user.sub, 10)
          );
          return {
            results,
            total: data.total
          };
        }
      })
    );
  }
}
