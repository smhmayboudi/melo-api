import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { UserEntityRepository } from "./user.entity.repository";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: UserEntityRepository
  ) {}

  async find(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<UserEntity | undefined> {
    return this.userRepository.findOne(id);
  }

  async findOneByTelegramId(
    telegramId: number
  ): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({ telegram_id: telegramId });
  }

  async findOneByUsernam(username: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({ username });
  }
}
