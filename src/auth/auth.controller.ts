import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Headers,
  ParseIntPipe,
  Post,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { DeleteResult } from "typeorm";
import { User } from "../decorator/user.decorator";
import { HttpExceptionFilter } from "../filter/http.exception.filter";
import { ErrorInterceptor } from "../interceptor/error.interceptor";
import { RtService } from "../rt/rt.service";
import { AuthService } from "./auth.service";
import { AuthAccessTokenDto } from "./dto/auth.access-token.dto";

@ApiTags("auth")
@Controller("auth")
@UseFilters(HttpExceptionFilter)
@UseInterceptors(ClassSerializerInterceptor, ErrorInterceptor)
@UsePipes(
  new ValidationPipe({
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    transform: true
  })
)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly rtService: RtService
  ) {}

  @ApiBearerAuth("jwt")
  @Get("test")
  @UseGuards(AuthGuard())
  test(): any {
    return { test: "test" };
  }

  @ApiBearerAuth("local")
  @Post("login")
  @UseGuards(AuthGuard("local"))
  async login(
    @User("sub", ParseIntPipe) sub: number
  ): Promise<AuthAccessTokenDto | undefined> {
    return this.authService.refreshToken(sub);
  }

  @ApiBearerAuth("token")
  @Delete("logout")
  @UseGuards(AuthGuard("token"))
  async logout(@Headers("token") token: string): Promise<DeleteResult> {
    return this.rtService.deleteByToken(token);
  }

  @ApiBearerAuth("telegram")
  @Post("telegram/callback")
  @UseGuards(AuthGuard("telegram"))
  async telegram(
    @User("sub", ParseIntPipe) sub: number
  ): Promise<AuthAccessTokenDto | undefined> {
    return this.authService.refreshToken(sub);
  }

  @ApiBearerAuth("token")
  @Post("token")
  @UseGuards(AuthGuard("token"))
  async token(
    @User("sub", ParseIntPipe) sub: number
  ): Promise<AuthAccessTokenDto | undefined> {
    return this.authService.accessToken(sub);
  }
}
