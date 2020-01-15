import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ErrorInterceptor } from "../interceptor/error.interceptor";
import { JwksEntity } from "./jwks.entity";
import { JwksService } from "./jwks.service";

@ApiTags("jwks")
@Controller("jwks")
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
    @Param("id", ParseUUIDPipe) id: string
  ): Promise<JwksEntity | undefined> {
    return this.jwksService.findOne(id);
  }
}
