import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseFilters,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { HttpExceptionFilter } from "../filter/http.exception.filter";
import { ErrorInterceptor } from "../interceptor/error.interceptor";
import { HttpCacheInterceptor } from "../interceptor/http.cache.interceptor";
import { AtEntity } from "./at.entity";
import { AtService } from "./at.service";

@ApiTags("rt")
@Controller("rt")
@UseFilters(HttpExceptionFilter)
@UseInterceptors(ErrorInterceptor)
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
  @UseInterceptors(ClassSerializerInterceptor, HttpCacheInterceptor)
  find(): Promise<AtEntity[]> {
    return this.atService.find();
  }
}
