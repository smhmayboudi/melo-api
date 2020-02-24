import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  // PromInstanceCounter,
  PromMethodCounter
} from "../prom/prom.decorators";
import { UserEditReqDto } from "./dto/req/user.edit.req.dto";
import { UserUserResDto } from "./dto/res/user.user.res.dto";
import { UserEntity } from "./user.entity";
import { UserEntityRepository } from "./user.entity.repository";

@Injectable()
// // @PromInstanceCounter
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: UserEntityRepository
  ) {}

  @PromMethodCounter
  async find(): Promise<UserUserResDto[]> {
    return this.userEntityRepository.find();
  }

  @PromMethodCounter
  async findOneById(id: number): Promise<UserUserResDto | undefined> {
    return this.userEntityRepository.findOne({ id });
  }

  @PromMethodCounter
  async findOneByTelegramId(
    telegramId: number
  ): Promise<UserEntity | undefined> {
    return this.userEntityRepository.findOne({ telegram_id: telegramId });
  }

  @PromMethodCounter
  async findOneByUsernam(
    username: string
  ): Promise<UserUserResDto | undefined> {
    return this.userEntityRepository.findOne({ username });
  }

  @PromMethodCounter
  async get(sub: number): Promise<UserUserResDto | undefined> {
    return this.findOneById(sub);
  }

  @PromMethodCounter
  async put(dto: UserEditReqDto, sub): Promise<UserUserResDto> {
    return this.save({ ...dto, id: sub });
  }

  @PromMethodCounter
  async save(dto: UserEntity): Promise<UserUserResDto> {
    return this.userEntityRepository.save(dto);
  }
}
