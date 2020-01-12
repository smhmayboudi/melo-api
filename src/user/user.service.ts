import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IUser } from "./type/IUser";
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService {
  private readonly users: IUser[];

  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository
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

  async findOneByUserId(userId: number): Promise<IUser | undefined> {
    return Promise.resolve(this.users.find(user => user.userId === userId));
  }

  async findOneByUsername(username: string): Promise<IUser | undefined> {
    return Promise.resolve(this.users.find(user => user.username === username));
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
}
