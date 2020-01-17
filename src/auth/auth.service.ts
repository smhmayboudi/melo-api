import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as cryptoRandomString from "crypto-random-string";
import * as moment from "moment";
import * as ms from "ms";
import { JwksService } from "src/jwks/jwks.service";
import { TokenService } from "src/token/token.service";
import { UserService } from "../user/user.service";
import { AuthConfigService } from "./auth.config.service";
import { AccessToken } from "./type/AccessToken";
import { Payload } from "./type/Payload";
import { RefreshToken } from "./type/RefreshToken";

@Injectable()
export class AuthService {
  constructor(
    private readonly authConfigService: AuthConfigService,
    private readonly jwtService: JwtService,
    private readonly jwksService: JwksService,
    private readonly tokenService: TokenService,
    private readonly userService: UserService
  ) {}

  async local(
    username: string,
    _password: string
  ): Promise<Payload | undefined> {
    const uerEntity = await this.userService.findOneByUsernam(username);
    if (uerEntity !== undefined) {
      return { uid: uerEntity.id };
    }
    return undefined;
  }

  async refreshToken(payload: Payload): Promise<RefreshToken | undefined> {
    const rt = cryptoRandomString({ length: 255, type: "base64" });
    const now = new Date();
    const exp = moment(now)
      .add(ms(this.authConfigService.jwtAccessTokenExpiresIn))
      .toDate();
    this.tokenService.save([
      {
        create_at: now,
        description: "",
        expire_at: exp,
        id: 0,
        is_blocked: false,
        user_id: payload.uid,
        token: rt
      }
    ]);
    const randomJwksEntity = await this.jwksService.getOneRandom();
    if (randomJwksEntity !== undefined) {
      const newPayload: Payload = { ...payload };
      return Promise.resolve({
        at: this.jwtService.sign(newPayload, {
          keyid: randomJwksEntity.id.toString(),
          jwtid: "XXX"
        }),
        rt
      });
    }
    return undefined;
  }

  async accessToken(payload: Payload): Promise<AccessToken | undefined> {
    const randomJwksEntity = await this.jwksService.getOneRandom();
    if (randomJwksEntity !== undefined) {
      const newPayload: Payload = { ...payload };
      return Promise.resolve({
        at: this.jwtService.sign(newPayload, {
          keyid: randomJwksEntity.id.toString(),
          jwtid: "XXX"
        })
      });
    }
    return undefined;
  }

  async telegram(telegramId: number): Promise<Payload | undefined> {
    const uerEntity = await this.userService.findOneByTelegramId(telegramId);
    if (uerEntity !== undefined) {
      return { uid: uerEntity.id };
    }
    return undefined;
  }
}
