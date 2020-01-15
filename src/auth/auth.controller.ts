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

  @UseGuards(AuthGuard("local"))
  @Post("login")
  async login(
    @Request() request: express.Request & { user: User }
  ): Promise<AccessToken | undefined> {
    return this.authService.jwt(request.user);
  }

  @Post("logout")
  async logout(
    @Request() request: express.Request & { user: User }
  ): Promise<AccessToken | undefined> {
    return this.authService.jwt(request.user);
  }

  @UseGuards(AuthGuard("telegram"))
  @Post("telegram/callback")
  telegram(): string {
    return "OK";
  }
}
