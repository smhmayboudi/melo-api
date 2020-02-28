import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import cryptoRandomString from "crypto-random-string";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { JwksService } from "../jwks/jwks.service";
import {
  // PromInstanceCounter,
  PromMethodCounter
} from "../prom/prom.decorator";
import { RtService } from "../rt/rt.service";
import { AuthConfigService } from "./auth.config.service";
import { AuthAccessTokenResDto } from "./dto/res/auth.access-token.res.dto";
import { AuthRefreshTokenResDto } from "./dto/res/auth.refresh-token.res.dto";

@Injectable()
// @PromInstanceCounter
export class AuthService {
  constructor(
    private readonly authConfigService: AuthConfigService,
    private readonly jwksService: JwksService,
    private readonly jwtService: JwtService,
    private readonly rtService: RtService
  ) {}

  @PromMethodCounter
  async accessToken(sub: number): Promise<AuthAccessTokenResDto | undefined> {
    const jwksEntity = await this.jwksService.getOneRandom();
    if (jwksEntity === undefined) {
      throw new InternalServerErrorException();
    }
    const at = this.jwtService.sign(
      {},
      {
        keyid: jwksEntity.id,
        jwtid: uuidv4(),
        subject: sub.toString()
      }
    );
    return {
      at
    };
  }

  @PromMethodCounter
  async refreshToken(sub: number): Promise<AuthRefreshTokenResDto | undefined> {
    const jwksEntity = await this.jwksService.getOneRandom();
    if (jwksEntity === undefined) {
      throw new InternalServerErrorException();
    }
    const at = this.jwtService.sign(
      {},
      {
        keyid: jwksEntity.id,
        jwtid: uuidv4(),
        subject: sub.toString()
      }
    );
    const rt = cryptoRandomString({ length: 256, type: "base64" });
    const now = new Date();
    const exp = moment(now)
      .add(this.authConfigService.jwtRefreshTokenExpiresIn, "ms")
      .toDate();
    await this.rtService.save([
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
    return {
      at,
      rt
    };
  }
}
