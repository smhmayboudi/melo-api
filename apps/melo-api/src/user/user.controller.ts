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
import { UserEditReqDto, UserResDto } from "@melo/common";
import { AppUser } from "../app/app.user.decorator";
import { AuthGuard } from "@nestjs/passport";
import { UserService } from "./user.service";

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

  @Put("profile")
  async edit(
    @Body() dto: UserEditReqDto,
    @AppUser("sub", ParseIntPipe) sub: number
  ): Promise<UserResDto> {
    return this.userService.edit({
      ...dto,
      sub,
    });
  }

  @Get()
  async find(): Promise<UserResDto[]> {
    return this.userService.find();
  }

  @Get("profile")
  async get(
    @AppUser("sub", ParseIntPipe) sub: number
  ): Promise<UserResDto | undefined> {
    return this.userService.get({ sub });
  }
}
