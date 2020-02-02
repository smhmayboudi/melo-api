import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ErrorInterceptor } from "../interceptor/error.interceptor";
import { HttpCacheInterceptor } from "../interceptor/http.cache.interceptor";
import { UserEditReqDto } from "./dto/req/user.edit.req.dto";
import { UserEntity } from "./user.entity";
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
  async find(): Promise<UserEntity[]> {
    return this.userService.find();
  }

  @Post("profile/edit")
  async edit(@Body() dto: UserEditReqDto): Promise<any> {
    return this.userService.edit(dto);
  }

  @Get("profile")
  async get(): Promise<any> {
    return this.userService.get();
  }
}
