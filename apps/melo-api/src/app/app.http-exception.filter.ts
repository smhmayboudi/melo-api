import * as fastify from "fastify";

import { APP_SERVICE, AuthJwtPayloadReqDto } from "@melo/common";
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from "@nestjs/common";

import urlparse from "url-parse";

@Catch(HttpException)
export class AppHttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const http = host.switchToHttp();
    const request = http.getRequest<
      fastify.FastifyRequest & { user: AuthJwtPayloadReqDto }
    >();
    const response = http.getResponse();
    const status = exception.getStatus();
    const url = urlparse(request.raw.url || "", true);
    Logger.error(
      `${JSON.stringify({
        path: url.pathname,
        user: request.user,
      })} => ${exception}`,
      "AppHttpExceptionFilter",
      APP_SERVICE
    );
    response.status(status).json({
      path: url.pathname,
      statusCode: status,
      timestamp: new Date().toISOString(),
    });
  }
}
