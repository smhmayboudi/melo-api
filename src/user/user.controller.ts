import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { User } from "src/decorator/user.decorator";
import { HttpExceptionFilter } from "../filter/http.exception.filter";
import { ErrorInterceptor } from "../interceptor/error.interceptor";
import { HttpCacheInterceptor } from "../interceptor/http.cache.interceptor";
import { UserEditReqDto } from "./dto/req/user.edit.req.dto";
import { UserPaginationResDto } from "./dto/res/user.pagination.res.dto";
import { UserUserResDto } from "./dto/res/user.user.res.dto";
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
  async find(): Promise<UserPaginationResDto<UserUserResDto>> {
    return this.userService.find();
  }

  @Post("profile/edit")
  async edit(@Body() dto: UserEditReqDto): Promise<UserEditReqDto> {
    return this.userService.edit(dto);
  }

  @Get("profile")
  async get(@User("sub", ParseIntPipe) sub: number): Promise<UserUserResDto> {
    return this.userService.get(sub);
  }
}
