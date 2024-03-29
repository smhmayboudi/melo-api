import * as express from "express";

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
export class TagHashIdInterceptor implements NestInterceptor {
  constructor(private readonly appHashIdService: AppHashIdService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const http = context.switchToHttp();
    const request = http.getRequest<
      express.Request & { user: AuthJwtPayloadReqDto }
    >();
    const reqFields = ["body", "params"];
    const reqFields2 = ["id", "typeId, categoryId, tagId"];
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
        if (data === undefined) {
          return data;
        } else {
          if (data.length === undefined) {
            return this.appHashIdService.encodeTag(data);
          } else {
            return data.map((value) => this.appHashIdService.encodeTag(value));
          }
        }
      })
    );
  }
}
