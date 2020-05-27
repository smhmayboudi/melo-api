import {
  UserEditReqDto,
  UserFindOneReqDto,
  UserGetReqDto,
  UserResDto,
  UserSaveReqDto,
} from "@melo/common";

import { UserFindOneByTelegramIdReqDto } from "@melo/common/user/dto/req/user.find-one-by-telegram-id.req.dto";
import { UserFindOneByUsernameReqDto } from "@melo/common/user/dto/req/user.find-one-by-username.req.dto";

export interface UserServiceInterface {
  edit(dto: UserEditReqDto): Promise<UserResDto>;
  find(): Promise<UserResDto[]>;
  findOne(dto: UserFindOneReqDto): Promise<UserResDto | undefined>;
  findOneByTelegramId(
    dto: UserFindOneByTelegramIdReqDto
  ): Promise<UserResDto | undefined>;
  findOneByUsername(
    dto: UserFindOneByUsernameReqDto
  ): Promise<UserResDto | undefined>;
  get(dto: UserGetReqDto): Promise<UserResDto | undefined>;
  save(dto: UserSaveReqDto): Promise<UserResDto>;
}
