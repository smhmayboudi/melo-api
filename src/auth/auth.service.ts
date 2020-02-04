import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import cryptoRandomString from "crypto-random-string";
import moment from "moment";
import uuidv4 from "uuid/v4";
import { JwksService } from "../jwks/jwks.service";
import { RtService } from "../rt/rt.service";
import { AuthConfigService } from "./auth.config.service";
import { AuthAccessTokenResDto } from "./dto/res/auth.access-token.res.dto";
import { AuthRefreshTokenResDto } from "./dto/res/auth.refresh-token.res.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly authConfigService: AuthConfigService,
    private readonly jwksService: JwksService,
    private readonly jwtService: JwtService,
    private readonly rtService: RtService
  ) {}

  async accessToken(sub: number): Promise<AuthAccessTokenResDto | undefined> {
    const jwksEntity = await this.jwksService.getOneRandom();
    if (jwksEntity === undefined) {
      return undefined;
    }
    return Promise.resolve({
      at: this.jwtService.sign(
        {},
        {
          keyid: jwksEntity.id,
          jwtid: uuidv4(),
          subject: sub.toString()
        }
      )
    });
  }

  async refreshToken(sub: number): Promise<AuthRefreshTokenResDto | undefined> {
    const rt = cryptoRandomString({ length: 256, type: "base64" });
    const now = new Date();
    const exp = moment(now)
      .add(this.authConfigService.jwtRefreshTokenExpiresIn, "ms")
      .toDate();
    this.rtService.save([
      {
        created_at: now,
        description: "",
        expire_at: exp,
        id: 0,
        is_blocked: false,
        user_id: sub,
        token: rt
      }
    ]);
    const jwksEntity = await this.jwksService.getOneRandom();
    if (jwksEntity === undefined) {
      return undefined;
    }
    return Promise.resolve({
      at: this.jwtService.sign(
        {},
        {
          keyid: jwksEntity.id,
          jwtid: uuidv4(),
          subject: sub.toString()
        }
      ),
      rt
    });
  }
}
