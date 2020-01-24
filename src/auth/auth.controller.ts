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
import { AccessTokenDto } from "./dto/access.token.dto";
import { JwtPayloadDto } from "./dto/jwt.payload.dto";
import { User } from "../decorator/user.decorator";

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
    @Request() request: express.Request & { user: JwtPayloadDto }
  ): Promise<AccessTokenDto | undefined> {
    return this.authService.refreshToken(request.user);
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
  telegram(): string {
    return "telegram";
  }

  @ApiBearerAuth("token")
  @Post("token")
  @UseGuards(AuthGuard("token"))
  async token(@User("sub") sub: string): Promise<AccessTokenDto | undefined> {
    return this.authService.accessToken(sub);
  }
}
