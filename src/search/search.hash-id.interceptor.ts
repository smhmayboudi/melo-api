import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";

import { AppEncodingService } from "../app/app.encoding.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class SearchHashIdInterceptor implements NestInterceptor {
  constructor(private readonly appEncodingService: AppEncodingService) {}

  intercept(
    _context: ExecutionContext,
    next: CallHandler
  ): Observable<unknown> {
    return next.handle().pipe(
      map((data) => ({
        results: data.results.map((value) =>
          this.appEncodingService.search(value)
        ),
        total: data.total,
      }))
    );
  }
}
