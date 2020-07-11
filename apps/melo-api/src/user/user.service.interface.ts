import {
  UserEditReqDto,
  UserFindOneByTelegramIdReqDto,
  UserFindOneByUsernameReqDto,
  UserFindOneReqDto,
  UserGetReqDto,
  UserResDto,
  UserSaveReqDto,
} from "@melo/common";

export interface UserServiceInterface {
  edit(dto: UserEditReqDto, sub): Promise<UserResDto>;
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
