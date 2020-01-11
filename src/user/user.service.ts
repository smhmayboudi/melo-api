import { User } from "./type/User";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
  private readonly users: User[];

  constructor() {
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

  async findOneByUserId(userId: number): Promise<User | undefined> {
    return Promise.resolve(this.users.find(user => user.userId === userId));
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    return Promise.resolve(this.users.find(user => user.username === username));
  }
}
