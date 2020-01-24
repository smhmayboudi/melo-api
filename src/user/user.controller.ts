import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { HttpExceptionFilter } from "../filter/http.exception.filter";
import { ErrorInterceptor } from "../interceptor/error.interceptor";
import { HttpCacheInterceptor } from "../interceptor/http.cache.interceptor";
import { UserEditDto } from "./dto/user.edit.dto";
import { UserEntity } from "./user.entity";
import { UserService } from "./user.service";

@ApiBearerAuth("jwt")
@ApiTags("user")
@Controller("user")
@UseFilters(HttpExceptionFilter)
@UseGuards(AuthGuard("jwt"))
@UseInterceptors(ClassSerializerInterceptor, ErrorInterceptor)
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
  @UseInterceptors(HttpCacheInterceptor)
  async find(): Promise<UserEntity[]> {
    return this.userService.find();
  }

  @Post("profile/edit")
  async edit(@Body() dto: UserEditDto): Promise<any> {
    return this.userService.edit(dto);
  }

  @Get("profile")
  async get(): Promise<any> {
    return this.userService.get({});
  }
}
