import { ApmAfterMethod, ApmBeforeMethod } from "@melo/apm";
import { Inject, Injectable } from "@nestjs/common";
import {
  USER_SERVICE,
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

import { ClientProxy } from "@nestjs/microservices";
import { PromMethodCounter } from "@melo/prom";
import { UserServiceInterface } from "./user.service.interface";

@Injectable()
// @PromInstanceCounter
export class UserService implements UserServiceInterface {
  constructor(
    @Inject(USER_SERVICE) private readonly userClientProxy: ClientProxy
  ) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async edit(dto: UserEditReqDto): Promise<UserResDto> {
    return this.userClientProxy
      .send<UserResDto, UserEditReqDto>(USER_SERVICE_PUT, dto)
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async find(): Promise<UserResDto[]> {
    return this.userClientProxy
      .send<UserResDto[]>(USER_SERVICE_FIND, {})
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async findOne(dto: UserFindOneReqDto): Promise<UserResDto | undefined> {
    return this.userClientProxy
      .send<UserResDto | undefined, UserFindOneReqDto>(
        USER_SERVICE_FIND_ONE,
        dto
      )
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async findOneByTelegramId(
    dto: UserFindOneByTelegramIdReqDto
  ): Promise<UserResDto | undefined> {
    return this.userClientProxy
      .send<UserResDto | undefined, UserFindOneByTelegramIdReqDto>(
        USER_SERVICE_FIND_BY_TELEGRAM_ID,
        dto
      )
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async findOneByUsername(
    dto: UserFindOneByUsernameReqDto
  ): Promise<UserResDto | undefined> {
    return this.userClientProxy
      .send<UserResDto | undefined, UserFindOneByUsernameReqDto>(
        USER_SERVICE_FIND_BY_TELEGRAM_ID,
        dto
      )
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async get(dto: UserGetReqDto): Promise<UserResDto | undefined> {
    return this.userClientProxy
      .send<UserResDto | undefined, UserGetReqDto>(USER_SERVICE_GET, dto)
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async save(dto: UserSaveReqDto): Promise<UserResDto> {
    return this.userClientProxy
      .send<UserResDto, UserSaveReqDto>(USER_SERVICE_SAVE, dto)
      .toPromise();
  }
}
