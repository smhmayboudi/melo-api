import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEditDto } from "./dto/user.edit.dto";
import { UserGetDto } from "./dto/user.get.dto";
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
    return this.userEntityRepository.findOne(id);
  }

  async findOneByUsernam(username: string): Promise<UserEntity | undefined> {
    return this.userEntityRepository.findOne({ username });
  }

  async findOneByTelegramId(
    telegramId: number
  ): Promise<UserEntity | undefined> {
    return this.userEntityRepository.findOne({ telegram_id: telegramId });
  }

  async edit(dto: UserEditDto): Promise<any> {
    return Promise.resolve(dto);
  }

  async get(dto: UserGetDto): Promise<any> {
    return Promise.resolve(dto);
  }
}
