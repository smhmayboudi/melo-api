import {
  ClassSerializerInterceptor,
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
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import * as express from "express";
import { DeleteResult } from "typeorm";
import { HttpExceptionFilter } from "../filter/http.exception.filter";
import { ErrorInterceptor } from "../interceptor/error.interceptor";
import { RtService } from "../rt/rt.service";
import { AuthService } from "./auth.service";
import { AccessToken } from "./type/AccessToken";
import { JwtPayload } from "./type/JwtPayload";

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
  test(@Request() request: express.Request & { user: JwtPayload }): any {
    console.log("request.user", request.user);
    return { test: "test" };
  }

  @ApiBearerAuth("local")
  @Post("login")
  @UseGuards(AuthGuard("local"))
  async login(
    @Request() request: express.Request & { user: JwtPayload }
  ): Promise<AccessToken | undefined> {
    throw new Error("TEST");
    console.log("request.user", request.user);
    return this.authService.refreshToken(request.user);
  }

  @ApiBearerAuth("token")
  @Delete("logout")
  @UseGuards(AuthGuard("token"))
  async logout(@Headers("token") token: string): Promise<DeleteResult> {
    console.log("request.user", token);
    return this.rtService.deleteByToken(token);
  }

  // @ApiBearerAuth("telegram")
  @Post("telegram/callback")
  @UseGuards(AuthGuard("telegram"))
  telegram(): string {
    return "telegram";
  }

  @ApiBearerAuth("token")
  @Post("token")
  @UseGuards(AuthGuard("token"))
  async token(
    @Request() request: express.Request & { user: JwtPayload }
  ): Promise<AccessToken | undefined> {
    console.log("request.user", request.user);
    return this.authService.accessToken(request.user);
  }
}
