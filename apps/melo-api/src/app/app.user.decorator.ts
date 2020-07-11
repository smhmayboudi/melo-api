import * as fastify from "fastify";

import {
  BadRequestException,
  ExecutionContext,
  PipeTransform,
  Type,
  createParamDecorator,
} from "@nestjs/common";

import { AuthJwtPayloadReqDto } from "@melo/common";

export const AppUser: (
  ...dataOrPipes: (
    | string
    | PipeTransform<any, any>
    | Type<PipeTransform<any, any>>
  )[]
) => ParameterDecorator = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const http = context.switchToHttp();
    const request = http.getRequest<
      fastify.FastifyRequest & { user: AuthJwtPayloadReqDto }
    >();
    if (request.user === undefined) {
      throw new BadRequestException();
    }
    return data === undefined || typeof data !== "string"
      ? request.user
      : request.user[data];
  }
);
