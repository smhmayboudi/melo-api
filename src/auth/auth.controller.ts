import {
  Controller,
  Delete,
  Get,
  Headers,
  Post,
  Request,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags } from "@nestjs/swagger";
import * as express from "express";
import { DeleteResult } from "typeorm";
import { HttpExceptionFilter } from "../filter/http.exception.filter";
import { ErrorInterceptor } from "../interceptor/error.interceptor";
import { TokenService } from "../token/token.service";
import { AuthService } from "./auth.service";
import { AccessToken } from "./type/AccessToken";
import { JwtPayload } from "./type/JwtPayload";

@ApiTags("auth")
@Controller("auth")
@UseFilters(HttpExceptionFilter)
@UseInterceptors(ErrorInterceptor)
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
    private readonly tokenService: TokenService
  ) {}

  @Get("test")
  @UseGuards(AuthGuard())
  test(@Request() request: express.Request & { user: JwtPayload }): any {
    console.log("request.user", request.user);
    return { test: "test" };
  }

  @Post("login")
  @UseGuards(AuthGuard("local"))
  async login(
    @Request() request: express.Request & { user: JwtPayload }
  ): Promise<AccessToken | undefined> {
    console.log("request.user", request.user);
    return this.authService.refreshToken(request.user);
  }

  @Delete("logout")
  @UseGuards(AuthGuard("token"))
  async logout(@Headers("token") token: string): Promise<DeleteResult> {
    console.log("request.user", token);
    return this.tokenService.deleteByToken(token);
  }

  @Post("telegram/callback")
  @UseGuards(AuthGuard("telegram"))
  telegram(): string {
    return "telegram";
  }

  @Post("token")
  @UseGuards(AuthGuard("token"))
  token(
    @Request() request: express.Request & { user: JwtPayload }
  ): Promise<AccessToken | undefined> {
    console.log("request.user", request.user);
    return this.authService.accessToken(request.user);
  }
}
