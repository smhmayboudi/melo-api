import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  UseFilters,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { HttpExceptionFilter } from "../filter/http.exception.filter";
import { ErrorInterceptor } from "../interceptor/error.interceptor";
import { JwksEntity } from "./jwks.entity";
import { JwksService } from "./jwks.service";

@ApiBearerAuth("jwt")
@ApiTags("jwks")
@Controller("jwks")
@UseFilters(HttpExceptionFilter)
@UseInterceptors(ClassSerializerInterceptor, ErrorInterceptor)
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
  find(): Promise<JwksEntity[]> {
    return this.jwksService.find();
  }

  @Get(":id")
  findOne(
    @Param("id", ParseUUIDPipe) id: string
  ): Promise<JwksEntity | undefined> {
    return this.jwksService.findOneById(id);
  }
}
