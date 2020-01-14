import {
  Controller,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
  UseInterceptors
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import * as express from "express";
import { User } from "../user/type/User";
import { AuthService } from "./auth.service";
import { AccessToken } from "./type/AccessToken";
import { ErrorsInterceptor } from "../interceptor/errors.interceptor";

@Controller("auth")
@UsePipes(
  new ValidationPipe({
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    transform: true
  })
)
@UseInterceptors(ErrorsInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard("local"))
  @Post("login")
  async login(
    @Request() request: express.Request & { user: User }
  ): Promise<AccessToken> {
    return this.authService.jwt(request.user);
  }

  @UseGuards(AuthGuard("telegram"))
  @Post("telegram/callback")
  telegram(): string {
    return "OK";
  }
}
