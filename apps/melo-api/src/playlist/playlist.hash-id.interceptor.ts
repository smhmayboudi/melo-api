import * as fastify from "fastify";

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";

import { AppHashIdService } from "../app/app.hash-id.service";
import { AuthJwtPayloadReqDto } from "@melo/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class PlaylistHashIdInterceptor implements NestInterceptor {
  constructor(private readonly appHashIdService: AppHashIdService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const http = context.switchToHttp();
    const request = http.getRequest<
      fastify.FastifyRequest & { user: AuthJwtPayloadReqDto }
    >();
    const reqFields = ["body", "params"];
    const reqFields2 = ["songId"];
    reqFields.forEach((value) => {
      reqFields2.forEach((value2) => {
        if (request[value][value2] !== undefined) {
          request[value][value2] = this.appHashIdService
            .decode(request[value][value2])
            .toString();
        }
      });
    });
    return next.handle().pipe(
      map((data) => {
        if (data.length === undefined) {
          return this.appHashIdService.encodePlaylist(data);
        } else {
          return data.map((value) =>
            this.appHashIdService.encodePlaylist(value)
          );
        }
      })
    );
  }
}
