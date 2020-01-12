import { Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import * as express from "express";
import { IUser } from "src/user/type/IUser";
import { AuthService } from "./auth.service";
import { AccessToken } from "./type/AccessToken";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard("local"))
  @Post()
  async login(
    @Request() request: express.Request & { user: IUser }
  ): Promise<AccessToken> {
    return this.authService.jwt(request.user);
  }
}
