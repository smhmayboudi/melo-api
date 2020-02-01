import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEditReqDto } from "./dto/req/user.edit.req.dto";
import { UserEntity } from "./user.entity";
import { UserEntityRepository } from "./user.entity.repository";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: UserEntityRepository
  ) {}

  async find(): Promise<UserEntity[]> {
    return this.userEntityRepository.find();
  }

  async findOneById(id: number): Promise<UserEntity | undefined> {
    return this.userEntityRepository.findOne({ id });
  }

  async findOneByUsernam(username: string): Promise<UserEntity | undefined> {
    return this.userEntityRepository.findOne({ username });
  }

  async findOneByTelegramId(
    telegramId: number
  ): Promise<UserEntity | undefined> {
    return this.userEntityRepository.findOne({ telegram_id: telegramId });
  }

  async edit(dto: UserEditReqDto): Promise<UserEditReqDto> {
    return Promise.resolve(dto);
  }

  async get(sub: number): Promise<UserEntity | undefined> {
    return this.findOneById(sub);
  }

  async save(dto: UserEntity): Promise<UserEntity> {
    return this.userEntityRepository.save(dto);
  }
}
