import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as cryptoRandomString from "crypto-random-string";
import { JwksService } from "src/jwks/jwks.service";
import { TokenService } from "src/token/token.service";
import { UserService } from "../user/user.service";
import { AccessToken } from "./type/AccessToken";
import { Payload } from "./type/Payload";
import { RefreshToken } from "./type/RefreshToken";
import * as moment from "moment";
import { AuthConfigService } from "./auth.config.service";

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
    const user = await this.userService.findOneByUsernam(username);
    if (user !== undefined) {
      return { uid: user.id };
    }
    return undefined;
  }

  async refreshToken(payload: Payload): Promise<RefreshToken | undefined> {
    const rt = cryptoRandomString({ length: 255, type: "base64" });
    const now = new Date();
    const exp = moment(now)
      .add(this.authConfigService.jwtAccessTokenExpiresIn, "d")
      .toDate();
    this.tokenService.save([
      {
        create_session_date: now,
        description: "",
        expiration_date: exp,
        id: 0,
        is_blocked: false,
        last_request_date: now,
        user_id: payload.uid,
        token: rt
      }
    ]);
    const randomJwks = await this.jwksService.getOneRandom();
    if (randomJwks !== undefined) {
      const payload2: Payload = { ...payload };
      return Promise.resolve({
        at: this.jwtService.sign(payload2, {
          keyid: randomJwks.id.toString(),
          jwtid: "XXX"
        }),
        rt
      });
    }
    return undefined;
  }

  async accessToken(payload: Payload): Promise<AccessToken | undefined> {
    const randomJwks = await this.jwksService.getOneRandom();
    if (randomJwks !== undefined) {
      const payload2: Payload = { ...payload };
      return Promise.resolve({
        at: this.jwtService.sign(payload2, {
          keyid: randomJwks.id.toString()
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
