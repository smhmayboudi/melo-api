import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseFilters,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { HttpExceptionFilter } from "src/filter/http.exception.filter";
import { ErrorInterceptor } from "../interceptor/error.interceptor";
import { JwksEntity } from "./jwks.entity";
import { JwksService } from "./jwks.service";

@ApiTags("jwks")
@Controller("jwks")
@UseFilters(HttpExceptionFilter)
@UseInterceptors(ErrorInterceptor)
@UsePipes(
  new ValidationPipe({
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    transform: true
  })
)
export class JwksController {
  constructor(private readonly jwksService: JwksService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  find(): Promise<JwksEntity[]> {
    return this.jwksService.find();
  }

  @Get(":id")
  @UseInterceptors(ClassSerializerInterceptor)
  findOne(
    @Param("id", ParseIntPipe) id: number
  ): Promise<JwksEntity | undefined> {
    return this.jwksService.findOneById(id);
  }
}
