import { Controller, Get, UsePipes, ValidationPipe } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
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
