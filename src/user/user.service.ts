import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ApmAfterMethod, ApmBeforeMethod } from "../apm/apm.decorator";
import {
  // PromInstanceCounter,
  PromMethodCounter
} from "../prom/prom.decorator";
import { UserEditReqDto } from "./dto/req/user.edit.req.dto";
import { UserSaveReqDto } from "./dto/req/user.save.req.dto";
import { UserUserResDto } from "./dto/res/user.user.res.dto";
import { UserEntity } from "./user.entity";
import { UserEntityRepository } from "./user.entity.repository";
import { UserServiceInterface } from "./user.service.interface";

@Injectable()
// @PromInstanceCounter
export class UserService implements UserServiceInterface {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: UserEntityRepository
  ) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async find(): Promise<UserUserResDto[]> {
    return this.userEntityRepository.find();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async findOneById(id: number): Promise<UserUserResDto | undefined> {
    return this.userEntityRepository.findOne({ id });
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async findOneByTelegramId(
    telegramId: number
  ): Promise<UserUserResDto | undefined> {
    return this.userEntityRepository.findOne({ telegram_id: telegramId });
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async findOneByUsernam(
    username: string
  ): Promise<UserUserResDto | undefined> {
    return this.userEntityRepository.findOne({ username });
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async get(sub: number): Promise<UserUserResDto | undefined> {
    return this.findOneById(sub);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async put(dto: UserEditReqDto, sub): Promise<UserUserResDto> {
    return this.save({ ...dto, id: sub });
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async save(dto: UserSaveReqDto): Promise<UserUserResDto> {
    return this.userEntityRepository.save(dto);
  }
}
