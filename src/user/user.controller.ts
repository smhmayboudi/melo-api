import {
  Controller,
  Get,
  Request,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import * as express from "express";
import { HttpCacheInterceptor } from "src/Interceptor/http.cache.interceptor";
import { IUser } from "./type/IUser";
import { UserEntity } from "./user.entity";
import { UserService } from "./user.service";

@Controller("user")
@UsePipes(
  new ValidationPipe({
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    transform: true
  })
)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @UseInterceptors(HttpCacheInterceptor)
  @Get("test")
  findAllTest(): Promise<IUser[]> {
    return this.userService.findAllTest();
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("profile")
  getProfile(@Request() request: express.Request & { user: IUser }): IUser {
    return request.user;
  }
}
