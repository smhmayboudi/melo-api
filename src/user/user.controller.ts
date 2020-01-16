import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ErrorInterceptor } from "../interceptor/error.interceptor";
import { HttpCacheInterceptor } from "../interceptor/http.cache.interceptor";
import { UserEntity } from "./user.entity";
import { UserService } from "./user.service";

@ApiTags("user")
@Controller("user")
@UseInterceptors(ErrorInterceptor)
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
  @UseInterceptors(ClassSerializerInterceptor, HttpCacheInterceptor)
  find(): Promise<UserEntity[]> {
    return this.userService.find();
  }
}
