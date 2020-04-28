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
export class EmotionHashIdInterceptor implements NestInterceptor {
  constructor(private readonly appEncodingService: AppEncodingService) {}

  intercept(
    _context: ExecutionContext,
    next: CallHandler
  ): Observable<unknown> {
    return next.handle().pipe(
      map((data) => ({
        results: data.results.map((value) => ({
          ...value,
          song: this.appEncodingService.song(value.song),
        })),
        total: data.total,
      }))
    );
  }
}
