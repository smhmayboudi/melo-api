import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";

import { AppUser } from "../app/app.user.decorator";
import { AuthGuard } from "@nestjs/passport";
import { UserEditReqDto } from "./dto/req/user.edit.req.dto";
import { UserService } from "./user.service";
import { UserUserResDto } from "./dto/res/user.user.res.dto";

@ApiBearerAuth("jwt")
@ApiTags("user")
@Controller("user")
@UseGuards(AuthGuard("jwt"))
@UsePipes(
  new ValidationPipe({
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    transform: true,
  })
)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async find(): Promise<UserUserResDto[]> {
    return this.userService.find();
  }

  @Get("profile")
  async get(
    @AppUser("sub", ParseIntPipe) sub: number
  ): Promise<UserUserResDto | undefined> {
    return this.userService.get(sub);
  }

  @Put("profile")
  async edit(
    @Body() dto: UserEditReqDto,
    @AppUser("sub", ParseIntPipe) sub: number
  ): Promise<UserUserResDto> {
    return this.userService.put(dto, sub);
  }
}
