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
import { HttpCacheInterceptor } from "../interceptor/http.cache.interceptor";
import { ErrorInterceptor } from "../interceptor/error.interceptor";
import { RtEntity } from "./rt.entity";
import { RtService } from "./rt.service";

@ApiTags("token")
@Controller("token")
@UseFilters(HttpExceptionFilter)
@UseInterceptors(ErrorInterceptor)
@UsePipes(
  new ValidationPipe({
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    transform: true
  })
)
export class RtController {
  constructor(private readonly rtService: RtService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor, HttpCacheInterceptor)
  find(): Promise<RtEntity[]> {
    return this.rtService.find();
  }
}
