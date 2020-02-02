import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Headers,
  ParseIntPipe,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { User } from "../decorator/user.decorator";
import { ErrorInterceptor } from "../interceptor/error.interceptor";
import { RtService } from "../rt/rt.service";
import { AuthService } from "./auth.service";
import { AuthAccessTokenResDto } from "./dto/res/auth.access-token.res.dto";
import { RtEntity } from "../rt/rt.entity";

@ApiTags("auth")
@Controller("auth")
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
  ): Promise<AuthAccessTokenResDto | undefined> {
    return this.authService.refreshToken(sub);
  }

  @ApiBearerAuth("token")
  @Delete("logout")
  @UseGuards(AuthGuard("token"))
  async logout(@Headers("token") token: string): Promise<RtEntity | undefined> {
    return this.rtService.deleteByToken(token);
  }

  @ApiBearerAuth("telegram")
  @Post("telegram/callback")
  @UseGuards(AuthGuard("telegram"))
  async telegram(
    @User("sub", ParseIntPipe) sub: number
  ): Promise<AuthAccessTokenResDto | undefined> {
    return this.authService.refreshToken(sub);
  }

  @ApiBearerAuth("token")
  @Post("token")
  @UseGuards(AuthGuard("token"))
  async token(
    @User("sub", ParseIntPipe) sub: number
  ): Promise<AuthAccessTokenResDto | undefined> {
    return this.authService.accessToken(sub);
  }
}
