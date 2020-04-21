import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";

import { AppEncodingService } from "../app/app.encoding.service";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataSearchResDto } from "../data/dto/res/data.search.res.dto";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class SearchHashIdInterceptor implements NestInterceptor {
  constructor(private readonly appEncodingService: AppEncodingService) {}

  transform = (searches: DataSearchResDto[]): DataSearchResDto[] =>
    this.appEncodingService.encodeSearches(searches);

  intercept(
    _context: ExecutionContext,
    next: CallHandler
  ): Observable<DataPaginationResDto<DataSearchResDto> | DataSearchResDto> {
    return next.handle().pipe(
      map(
        (data) =>
          ({
            results: this.transform(data.results),
            total: data.total,
          } as DataPaginationResDto<DataSearchResDto>)
      )
    );
  }
}
