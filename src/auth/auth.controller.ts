import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import {
  Controller,
  Delete,
  Headers,
  ParseIntPipe,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";

import { AppUser } from "../app/app.user.decorator";
import { AuthAccessTokenResDto } from "./dto/res/auth.access-token.res.dto";
import { AuthGuard } from "@nestjs/passport";
import { AuthRefreshTokenResDto } from "./dto/res/auth.refresh-token.res.dto";
import { AuthService } from "./auth.service";
import { RtService } from "../rt/rt.service";

@ApiTags("auth")
@Controller("auth")
@UsePipes(
  new ValidationPipe({
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    transform: true,
  })
)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly rtService: RtService
  ) {}

  @ApiBearerAuth("local")
  @Post("login")
  @UseGuards(AuthGuard("local"))
  async login(
    @AppUser("sub", ParseIntPipe) sub: number
  ): Promise<AuthRefreshTokenResDto | undefined> {
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
  ): Promise<AuthRefreshTokenResDto | undefined> {
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
