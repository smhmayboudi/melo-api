import {
  Controller,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import * as express from "express";
import { IUser } from "../user/type/IUser";
import { AuthService } from "./auth.service";
import { AccessToken } from "./type/AccessToken";

@Controller("auth")
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
    @Request() request: express.Request & { user: IUser }
  ): Promise<AccessToken> {
    return this.authService.jwt(request.user);
  }

  @UseGuards(AuthGuard("telegram"))
  @Post("telegram/callback")
  telegram(): string {
    return "OK";
  }
}
