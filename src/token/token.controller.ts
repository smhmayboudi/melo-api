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
import { TokenEntity } from "./token.entity";
import { TokenService } from "./token.service";

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
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor, HttpCacheInterceptor)
  find(): Promise<TokenEntity[]> {
    return this.tokenService.find();
  }
}
