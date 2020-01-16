import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Headers,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
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

  @Delete()
  delete(@Headers("token") token: string): boolean {
    this.tokenService.deleteByToken(token);
    return true;
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  find(): Promise<TokenEntity[]> {
    return this.tokenService.find();
  }
}
