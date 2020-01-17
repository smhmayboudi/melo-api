import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseFilters,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { HttpExceptionFilter } from "../filter/http.exception.filter";
import { ErrorInterceptor } from "../interceptor/error.interceptor";
import { AtEntity } from "./at.entity";
import { AtService } from "./at.service";

@ApiBearerAuth("jwt")
@ApiTags("rt")
@Controller("rt")
@UseFilters(HttpExceptionFilter)
@UseInterceptors(ClassSerializerInterceptor, ErrorInterceptor)
@UsePipes(
  new ValidationPipe({
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    transform: true
  })
)
export class AtController {
  constructor(private readonly atService: AtService) {}

  @Get()
  find(): Promise<AtEntity[]> {
    return this.atService.find();
  }
}
