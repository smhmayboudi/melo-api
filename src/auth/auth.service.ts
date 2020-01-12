import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { IUser } from "../user/type/IUser";
import { UserService } from "../user/user.service";
import { AccessToken } from "./type/AccessToken";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {}

  async local(username: string, pass: string): Promise<IUser | undefined> {
    const user = await this.userService.findOneByUsername(username);
    if (user !== undefined && user.password === pass) {
      return { ...user, password: "" } as IUser;
    }
    return undefined;
  }

  async jwt(user: IUser): Promise<AccessToken> {
    const payload = {
      password: "",
      username: user.username,
      userId: user.userId
    };
    return Promise.resolve({
      access_token: this.jwtService.sign(payload)
    });
  }

  async telegram(_userId: number): Promise<IUser | undefined> {
    // const user = await this.userService.findOneByUserId(userId);
    // if (user !== undefined) {
    //   return { ...user, password: "" } as User;
    // }
    // return undefined;
    return Promise.resolve({ password: "test", userId: 0, username: "test" });
  }
}
