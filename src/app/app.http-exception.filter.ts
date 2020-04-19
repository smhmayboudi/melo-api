import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from "@nestjs/common";
import express from "express";

@Catch(HttpException)
export class AppHttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<express.Response>();
    const request = ctx.getRequest<express.Request>();
    const status = exception.getStatus();

    Logger.error(
      `${JSON.stringify({
        path: request.path,
        user: request.user,
      })} => ${exception}`,
      undefined,
      "AppHttpExceptionFilter"
    );

    response.status(status).json({
      path: request.url,
      statusCode: status,
      timestamp: new Date().toISOString(),
    });
  }
}
