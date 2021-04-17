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
export class SearchHashIdInterceptor implements NestInterceptor {
  constructor(private readonly appHashIdService: AppHashIdService) {}

  intercept(
    _context: ExecutionContext,
    next: CallHandler
  ): Observable<unknown> {
    return next.handle().pipe(
      map((data) => {
        if (data.length === undefined) {
          return this.appHashIdService.encodeSearch(data);
        } else {
          return data.map((value) => this.appHashIdService.encodeSearch(value));
        }
      })
    );
  }
}
