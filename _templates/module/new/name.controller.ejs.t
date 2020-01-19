---
to: src/<%= h.changeCase.camel(name)%>/<%= h.changeCase.dot(name)%>.controller.ts
unless_exists: true
---
import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { HttpExceptionFilter } from "../filter/http.exception.filter";
import { ErrorInterceptor } from "../interceptor/error.interceptor";
import { <%= h.changeCase.pascal(name)%>Service } from "./<%= h.changeCase.dot(name)%>.service";
import { <%= h.changeCase.pascal(name)%>TestDto } from "./dto/<%= h.changeCase.dot(name)%>.test.dto";

@ApiBearerAuth("jwt")
@ApiTags("<%= h.changeCase.camel(name)%>")
@Controller("<%= h.changeCase.camel(name)%>")
@UseFilters(HttpExceptionFilter)
@UseGuards(AuthGuard("jwt"))
@UseInterceptors(ClassSerializerInterceptor, ErrorInterceptor)
@UsePipes(
  new ValidationPipe({
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    transform: true
  })
)
export class <%= h.changeCase.pascal(name)%>Controller {
  constructor(private readonly <%= h.changeCase.camel(name)%>Service: <%= h.changeCase.pascal(name)%>Service) {}

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<<%= h.changeCase.pascal(name)%>TestDto | undefined> {
    return this.<%= h.changeCase.camel(name)%>Service.findOne({
      id
    });
  }
}
