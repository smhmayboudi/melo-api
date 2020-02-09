import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEditReqDto } from "./dto/req/user.edit.req.dto";
import { UserEntity } from "./user.entity";
import { UserEntityRepository } from "./user.entity.repository";
import { UserUserResDto } from "./dto/res/user.user.res.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: UserEntityRepository
  ) {}

  async find(): Promise<UserUserResDto[]> {
    return this.userEntityRepository.find();
  }

  async findOneById(id: number): Promise<UserUserResDto | undefined> {
    return this.userEntityRepository.findOne({ id });
  }

  async findOneByTelegramId(
    telegramId: number
  ): Promise<UserEntity | undefined> {
    return this.userEntityRepository.findOne({ telegram_id: telegramId });
  }

  async findOneByUsernam(
    username: string
  ): Promise<UserUserResDto | undefined> {
    return this.userEntityRepository.findOne({ username });
  }

  async get(sub: number): Promise<UserUserResDto | undefined> {
    return this.findOneById(sub);
  }

  async put(dto: UserEditReqDto, sub): Promise<UserUserResDto> {
    return this.save({ ...dto, id: sub });
  }

  async save(dto: UserEntity): Promise<UserUserResDto> {
    return this.userEntityRepository.save(dto);
  }
}
