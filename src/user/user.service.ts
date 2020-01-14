import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./type/User";
import { UserEntity } from "./user.entity";
import { UserEntityRepository } from "./user.entity.repository";

@Injectable()
export class UserService {
  private readonly users: User[];

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

  async findOne(id: number): Promise<UserEntity | undefined> {
    return this.userRepository.findOne(id);
  }

  async findAllTest(): Promise<User[]> {
    return Promise.resolve(this.users);
  }

  async findOneByUserId(userId: number): Promise<User | undefined> {
    return Promise.resolve(this.users.find(user => user.userId === userId));
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    return Promise.resolve(this.users.find(user => user.username === username));
  }
}
