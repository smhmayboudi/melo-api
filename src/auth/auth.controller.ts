import {
  Controller,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags } from "@nestjs/swagger";
import * as express from "express";
import { ErrorInterceptor } from "../interceptor/error.interceptor";
import { User } from "../user/type/User";
import { AuthService } from "./auth.service";
import { AccessToken } from "./type/AccessToken";

@ApiTags("auth")
@Controller("auth")
@UseInterceptors(ErrorInterceptor)
@UsePipes(
  new ValidationPipe({
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    transform: true
  })
)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @UseGuards(AuthGuard("local"))
  async login(
    @Request() request: express.Request & { user: User }
  ): Promise<AccessToken | undefined> {
    return this.authService.refreshToken(request.user);
  }

  @Post("logout")
  @UseGuards(AuthGuard("jwt"))
  async logout(
    @Request() request: express.Request & { user: User }
  ): Promise<AccessToken | undefined> {
    return this.authService.accessToken(request.user);
  }

  @Post("telegram/callback")
  @UseGuards(AuthGuard("telegram"))
  telegram(): string {
    return "telegram";
  }

  @Post("token/remove")
  @UseGuards(AuthGuard("jwt"))
  tokenRenew(
    @Request() request: express.Request & { user: User }
  ): Promise<AccessToken | undefined> {
    return this.authService.accessToken(request.user);
  }

  @Post("token/renew")
  @UseGuards(AuthGuard("token"))
  tokenRemove(
    @Request() request: express.Request & { user: User }
  ): Promise<AccessToken | undefined> {
    return this.authService.accessToken(request.user);
  }
}
