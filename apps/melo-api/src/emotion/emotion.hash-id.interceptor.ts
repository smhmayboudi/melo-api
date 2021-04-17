import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";

import { AppHashIdService } from "../app/app.hash-id.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class EmotionHashIdInterceptor implements NestInterceptor {
  constructor(private readonly appHashIdService: AppHashIdService) {}

  intercept(
    _context: ExecutionContext,
    next: CallHandler
  ): Observable<unknown> {
    return next.handle().pipe(
      map((data) => {
        if (data.length === undefined) {
          return this.appHashIdService.encodeSong(data.song);
        } else {
          return data.map((value) =>
            this.appHashIdService.encodeSong(value.song)
          );
        }
      })
    );
  }
}
