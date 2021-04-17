import { MessagePattern, Payload } from "@nestjs/microservices";
import {
  USER_SERVICE_FIND,
  USER_SERVICE_FIND_BY_TELEGRAM_ID,
  USER_SERVICE_FIND_ONE,
  USER_SERVICE_GET,
  USER_SERVICE_PUT,
  USER_SERVICE_SAVE,
  UserEditReqDto,
  UserFindOneByTelegramIdReqDto,
  UserFindOneByUsernameReqDto,
  UserFindOneReqDto,
  UserGetReqDto,
  UserResDto,
  UserSaveReqDto,
} from "@melo/common";

import { Controller } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern(USER_SERVICE_PUT)
  edit(@Payload() dto: UserEditReqDto): Promise<UserResDto> {
    return this.userService.edit(dto);
  }

  @MessagePattern(USER_SERVICE_FIND)
  find(): Promise<UserResDto[]> {
    return this.userService.find();
  }

  @MessagePattern(USER_SERVICE_FIND_ONE)
  findOne(dto: UserFindOneReqDto): Promise<UserResDto | undefined> {
    return this.userService.findOne(dto);
  }

  @MessagePattern(USER_SERVICE_FIND_BY_TELEGRAM_ID)
  findOneByTelegramId(
    dto: UserFindOneByTelegramIdReqDto
  ): Promise<UserResDto | undefined> {
    return this.userService.findOneByTelegramId(dto);
  }

  @MessagePattern(USER_SERVICE_FIND_BY_TELEGRAM_ID)
  findOneByUsername(
    dto: UserFindOneByUsernameReqDto
  ): Promise<UserResDto | undefined> {
    return this.userService.findOneByUsername(dto);
  }

  @MessagePattern(USER_SERVICE_GET)
  get(@Payload() dto: UserGetReqDto): Promise<UserResDto | undefined> {
    return this.userService.get(dto);
  }

  @MessagePattern(USER_SERVICE_SAVE)
  save(@Payload() dto: UserSaveReqDto): Promise<UserResDto> {
    return this.userService.save(dto);
  }
}
