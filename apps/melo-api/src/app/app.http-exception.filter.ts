import { APP_SERVICE, AuthJwtPayloadReqDto } from "@melo/common";
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from "@nestjs/common";

import fastify from "fastify";

@Catch(HttpException)
export class AppHttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const http = host.switchToHttp();
    const request = http.getRequest<
      fastify.FastifyRequest & { user: AuthJwtPayloadReqDto }
    >();
    const response = http.getResponse();
    const status = exception.getStatus();
    Logger.error(
      `${JSON.stringify({
        path: request.query.path,
        user: request.user,
      })} => ${exception}`,
      "AppHttpExceptionFilter",
      APP_SERVICE
    );
    response.status(status).json({
      path: request.query.url,
      statusCode: status,
      timestamp: new Date().toISOString(),
    });
  }
}
