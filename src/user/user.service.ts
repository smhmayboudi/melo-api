import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IUser } from "./type/IUser";
import { UserEntity } from "./user.entity";
import { UserEntityRepository } from "./user.entity.repository";

@Injectable()
export class UserService {
  private readonly users: IUser[];

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: UserEntityRepository
  ) {
    this.users = [
      {
        password: "changeme",
        userId: 1,
        username: "john"
      },
      {
        password: "secret",
        userId: 2,
        username: "chris"
      },
      {
        password: "guess",
        userId: 3,
        username: "maria"
      }
    ];
  }

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findAllTest(): Promise<IUser[]> {
    Logger.log("findAllTest", "user.service");
    return Promise.resolve(this.users);
  }

  async findOneByUserId(userId: number): Promise<IUser | undefined> {
    return Promise.resolve(this.users.find(user => user.userId === userId));
  }

  async findOneByUsername(username: string): Promise<IUser | undefined> {
    return Promise.resolve(this.users.find(user => user.username === username));
  }
}
