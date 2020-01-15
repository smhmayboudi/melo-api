import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as cryptoRandomString from "crypto-random-string";
import { JwksService } from "src/jwks/jwks.service";
import { User } from "../user/type/User";
import { UserService } from "../user/user.service";
import { AccessToken } from "./type/AccessToken";
import { Payload } from "./type/Payload";
import { RefreshToken } from "./type/RefreshToken";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly jwksService: JwksService,
    private readonly userService: UserService
  ) {}

  async local(username: string): Promise<Payload | undefined> {
    const user = await this.userService.findOneByUsernam(username);
    if (user !== undefined) {
      return { uid: user.id };
    }
    return undefined;
  }

  async refreshToken(user: User): Promise<RefreshToken | undefined> {
    const randomJwks = await this.jwksService.getOneRandom();
    if (randomJwks !== undefined) {
      const payload: User = { ...user };
      return Promise.resolve({
        at: this.jwtService.sign(payload, {
          keyid: randomJwks.kid,
          jwtid: "XXX"
        }),
        rt: cryptoRandomString({ length: 256, type: "hex" })
      });
    }
    return undefined;
  }

  async accessToken(user: User): Promise<AccessToken | undefined> {
    const randomJwks = await this.jwksService.getOneRandom();
    if (randomJwks !== undefined) {
      const payload: User = { ...user };
      return Promise.resolve({
        at: this.jwtService.sign(payload, {
          keyid: randomJwks.kid
          // jwtid: "XXX"
        })
      });
    }
    return undefined;
  }

  async telegram(telegramId: number): Promise<Payload | undefined> {
    const user = await this.userService.findOneByTelegramId(telegramId);
    if (user !== undefined) {
      return { uid: user.id };
    }
    return undefined;
  }
}
