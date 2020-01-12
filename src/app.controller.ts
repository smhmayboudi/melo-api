import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import * as express from "express";
import { AppService } from "./app.service";
// import { AuthService } from "./auth/auth.service";
// import { AccessToken } from "./auth/type/AccessToken";
import { IUser } from "./user/type/IUser";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService // private readonly authService: AuthService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @UseGuards(AuthGuard("local"))
  // @Post("auth/login")
  // async login(
  //   @Request() request: express.Request & { user: IUser }
  // ): Promise<AccessToken> {
  //   return this.authService.jwt(request.user);
  // }

  @UseGuards(AuthGuard("jwt"))
  @Get("profile")
  getProfile(@Request() request: express.Request & { user: IUser }): IUser {
    return request.user;
  }

  @UseGuards(AuthGuard("telegram"))
  @Post("auth/telegram/callback")
  telegram(): string {
    return "OK";
  }
}
