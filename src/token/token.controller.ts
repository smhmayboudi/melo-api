import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { HttpCacheInterceptor } from "src/interceptor/http.cache.interceptor";
import { ErrorInterceptor } from "../interceptor/error.interceptor";
import { TokenEntity } from "./token.entity";
import { TokenService } from "./token.service";

@ApiTags("token")
@Controller("token")
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
