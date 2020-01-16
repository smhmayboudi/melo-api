import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  Delete
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

  @Delete(":id")
  delete(@Param("id", ParseIntPipe) id: number): boolean {
    this.tokenService.delete(id);
    return true;
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  find(): Promise<TokenEntity[]> {
    return this.tokenService.find();
  }
}
