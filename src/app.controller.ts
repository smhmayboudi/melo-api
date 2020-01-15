import {
  Controller,
  Get,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { AppService } from "./app.service";
import { ErrorInterceptor } from "./interceptor/error.interceptor";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("app")
@Controller()
@UseInterceptors(ErrorInterceptor)
@UsePipes(
  new ValidationPipe({
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    transform: true
  })
)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
