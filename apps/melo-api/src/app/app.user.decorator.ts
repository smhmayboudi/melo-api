import {
  BadRequestException,
  ExecutionContext,
  createParamDecorator,
} from "@nestjs/common";

import { AuthJwtPayloadReqDto } from "@melo/common";
import express from "express";

export const AppUser = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const http = context.switchToHttp();
    const request = http.getRequest<
      express.Request & { user: AuthJwtPayloadReqDto }
    >();
    if (request.user === undefined) {
      throw new BadRequestException();
    }
    return data === undefined || typeof data !== "string"
      ? request.user
      : request.user[data];
  }
);
