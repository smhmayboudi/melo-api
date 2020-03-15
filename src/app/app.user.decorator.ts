import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext
} from "@nestjs/common";
import express from "express";
import { AuthJwtPayloadReqDto } from "../auth/dto/req/auth.jwt-payload.req.dto";

export const AppUser = createParamDecorator(
  (data: string | undefined, context: ExecutionContext) => {
    const http = context.switchToHttp();
    const request = http.getRequest<
      express.Request & { user: AuthJwtPayloadReqDto }
    >();
    if (request.user === undefined) {
      throw new BadRequestException();
    }
    return data === undefined ? request.user : request.user[data];
  }
);
