import { Controller, Get, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import * as express from "express";
import { IUser } from "./type/IUser";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("profile")
  getProfile(@Request() request: express.Request & { user: IUser }): IUser {
    return request.user;
  }
}
