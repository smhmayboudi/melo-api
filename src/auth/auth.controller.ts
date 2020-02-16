import {
  Controller,
  Delete,
  Get,
  Headers,
  ParseIntPipe,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AppUser } from "../app/app.user.decorator";
import { RtService } from "../rt/rt.service";
import { AuthService } from "./auth.service";
import { AuthAccessTokenResDto } from "./dto/res/auth.access-token.res.dto";

@ApiTags("auth")
@Controller("auth")
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
  @UseGuards(AuthGuard(["anonymId", "jwt"]))
  test(@AppUser("sub", ParseIntPipe) sub: number): any {
    return { sub };
  }

  @ApiBearerAuth("local")
  @Post("login")
  @UseGuards(AuthGuard("local"))
  async login(
    @AppUser("sub", ParseIntPipe) sub: number
  ): Promise<AuthAccessTokenResDto | undefined> {
    return this.authService.refreshToken(sub);
  }

  @ApiBearerAuth("token")
  @Delete("logout")
  @UseGuards(AuthGuard("token"))
  async logout(@Headers("token") token: string): Promise<void> {
    return this.rtService.deleteByToken(token);
  }

  @ApiBearerAuth("telegram")
  @Post("telegram/callback")
  @UseGuards(AuthGuard("telegram"))
  async telegram(
    @AppUser("sub", ParseIntPipe) sub: number
  ): Promise<AuthAccessTokenResDto | undefined> {
    return this.authService.refreshToken(sub);
  }

  @ApiBearerAuth("token")
  @Post("token")
  @UseGuards(AuthGuard("token"))
  async token(
    @AppUser("sub", ParseIntPipe) sub: number
  ): Promise<AuthAccessTokenResDto | undefined> {
    return this.authService.accessToken(sub);
  }
}
