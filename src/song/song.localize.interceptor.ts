import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from "@nestjs/common";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataSongResDto } from "../data/dto/res/data.song.res.dto";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class SongLocalizeInterceptor implements NestInterceptor {
  intercept(
    _context: ExecutionContext,
    next: CallHandler
  ): Observable<DataPaginationResDto<DataSongResDto> | DataSongResDto> {
    return next.handle().pipe(
      map(data => {
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
