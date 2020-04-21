import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";

import { AppEncodingService } from "../app/app.encoding.service";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DownloadSongResDto } from "./dto/res/download.song.res.dto";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class DownloadHashIdInterceptor implements NestInterceptor {
  constructor(private readonly appEncodingService: AppEncodingService) {}

  transform = (downloads: DownloadSongResDto[]): DownloadSongResDto[] =>
    downloads.map((value) => ({
      ...value,
      song: this.appEncodingService.encodeSongs([value.song])[0],
    }));

  intercept(
    _context: ExecutionContext,
    next: CallHandler
  ): Observable<DataPaginationResDto<DownloadSongResDto>> {
    return next.handle().pipe(
      map(
        (data) =>
          ({
            results: this.transform(data.results),
            total: data.total,
          } as DataPaginationResDto<DownloadSongResDto>)
      )
    );
  }
}
