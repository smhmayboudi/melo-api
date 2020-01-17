import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as cryptoRandomString from "crypto-random-string";
import * as moment from "moment";
import * as ms from "ms";
import * as uuidv4 from "uuid/v4";
import { JwksService } from "../jwks/jwks.service";
import { TokenService } from "../token/token.service";
import { UserService } from "../user/user.service";
import { AuthConfigService } from "./auth.config.service";
import { AccessToken } from "./type/AccessToken";
import { JwtPayload } from "./type/JwtPayload";
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
  ): Promise<JwtPayload | undefined> {
    const uerEntity = await this.userService.findOneByUsernam(username);
    if (uerEntity !== undefined) {
      return {
        exp: 0,
        iat: 0,
        jti: "0",
        sub: uerEntity.id.toString()
      };
    }
    return undefined;
  }

  async refreshToken(
    jwtPayload: JwtPayload
  ): Promise<RefreshToken | undefined> {
    const rt = cryptoRandomString({ length: 256, type: "base64" });
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
        user_id: parseInt(jwtPayload.sub, 10),
        token: rt
      }
    ]);
    const randomJwksEntity = await this.jwksService.getOneRandom();
    if (randomJwksEntity !== undefined) {
      return Promise.resolve({
        at: this.jwtService.sign(
          {},
          {
            keyid: randomJwksEntity.id,
            jwtid: uuidv4(),
            subject: jwtPayload.sub.toString()
          }
        ),
        rt
      });
    }
    return undefined;
  }

  async accessToken(jwtPayload: JwtPayload): Promise<AccessToken | undefined> {
    const randomJwksEntity = await this.jwksService.getOneRandom();
    if (randomJwksEntity !== undefined) {
      return Promise.resolve({
        at: this.jwtService.sign(
          {},
          {
            keyid: randomJwksEntity.id,
            jwtid: uuidv4(),
            subject: jwtPayload.sub.toString()
          }
        )
      });
    }
    return undefined;
  }

  async telegram(telegramId: number): Promise<JwtPayload | undefined> {
    const uerEntity = await this.userService.findOneByTelegramId(telegramId);
    if (uerEntity !== undefined) {
      return {
        exp: 0,
        iat: 0,
        jti: "0",
        sub: uerEntity.id.toString()
      };
    }
    return undefined;
  }
}
