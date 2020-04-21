import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";

import { AppEncodingService } from "../app/app.encoding.service";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { EmotionResDto } from "./dto/res/emotion.res.dto";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class EmotionHashIdInterceptor implements NestInterceptor {
  constructor(private readonly appEncodingService: AppEncodingService) {}

  transform = (downloads: EmotionResDto[]): EmotionResDto[] =>
    downloads.map((value) => ({
      ...value,
      song: this.appEncodingService.encodeSongs([value.song])[0],
    }));

  intercept(
    _context: ExecutionContext,
    next: CallHandler
  ): Observable<DataPaginationResDto<EmotionResDto>> {
    return next.handle().pipe(
      map(
        (data) =>
          ({
            results: this.transform(data.results),
            total: data.total,
          } as DataPaginationResDto<EmotionResDto>)
      )
    );
  }
}
