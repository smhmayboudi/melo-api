import {
  Controller,
  Get,
  // Param,
  // ParseIntPipe,
  Request,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  Logger
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import * as express from "express";
import { HttpCacheInterceptor } from "src/interceptor/http.cache.interceptor";
import { User } from "./type/User";
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

  @UseInterceptors(HttpCacheInterceptor)
  @Get()
  findAll(): Promise<UserEntity[]> {
    Logger.log("findAll", "user.conotroller");
    return this.userService.findAll();
  }

  // @Get(":id")
  // findOne(
  //   @Param("id", ParseIntPipe) id: number
  // ): Promise<UserEntity | undefined> {
  //   Logger.log("findOne", "user.conotroller");
  //   return this.userService.findOne(id);
  // }

  @UseInterceptors(HttpCacheInterceptor)
  @Get("test")
  findAllTest(): Promise<User[]> {
    Logger.log("findAllTest", "user.conotroller");
    return this.userService.findAllTest();
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("profile")
  getProfile(@Request() request: express.Request & { user: User }): User {
    Logger.log("getProfile", "user.conotroller");
    return request.user;
  }
}
