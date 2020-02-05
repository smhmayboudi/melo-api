import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  ParseIntPipe,
  Put,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { User } from "../decorator/user.decorator";
import { ErrorInterceptor } from "../interceptor/error.interceptor";
import { HttpCacheInterceptor } from "../interceptor/http.cache.interceptor";
import { UserEditReqDto } from "./dto/req/user.edit.req.dto";
import { UserUserResDto } from "./dto/res/user.user.res.dto";
import { UserService } from "./user.service";

@ApiBearerAuth("jwt")
@ApiTags("user")
@Controller("user")
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
  async find(): Promise<UserUserResDto[]> {
    return this.userService.find();
  }

  @Get("profile")
  async get(
    @User("sub", ParseIntPipe) sub: number
  ): Promise<UserUserResDto | undefined> {
    return this.userService.get(sub);
  }

  @Put("profile")
  async edit(@Body() dto: UserEditReqDto): Promise<UserUserResDto> {
    return this.userService.put(dto);
  }
}
