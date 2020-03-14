import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import cryptoRandomString from "crypto-random-string";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { ApmAfterMethod, ApmBeforeMethod } from "../apm/apm.decorator";
import { JwksService } from "../jwks/jwks.service";
import {
  // PromInstanceCounter,
  PromMethodCounter
} from "../prom/prom.decorator";
import { RtService } from "../rt/rt.service";
import { AuthConfigService } from "./auth.config.service";
import { AuthServiceInterface } from "./auth.service.interface";
import { AuthAccessTokenResDto } from "./dto/res/auth.access-token.res.dto";
import { AuthRefreshTokenResDto } from "./dto/res/auth.refresh-token.res.dto";

@Injectable()
// @PromInstanceCounter
export class AuthService implements AuthServiceInterface {
  constructor(
    private readonly authConfigService: AuthConfigService,
    private readonly jwksService: JwksService,
    private readonly jwtService: JwtService,
    private readonly rtService: RtService
  ) {}

  @ApmAfterMethod
  @ApmBeforeMethod
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

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async refreshToken(
    sub: number,
    jwtid: string = uuidv4(),
    now: Date = new Date(),
    rt: string = cryptoRandomString({ length: 256, type: "base64" })
  ): Promise<AuthRefreshTokenResDto | undefined> {
    const jwksEntity = await this.jwksService.getOneRandom();
    if (jwksEntity === undefined) {
      throw new InternalServerErrorException();
    }
    const at = this.jwtService.sign(
      {},
      {
        keyid: jwksEntity.id,
        jwtid,
        subject: sub.toString()
      }
    );
    const exp = moment(now)
      .add(this.authConfigService.jwtRefreshTokenExpiresIn, "ms")
      .toDate();
    await this.rtService.save({
      created_at: now,
      description: "",
      expire_at: exp,
      id: 0,
      is_blocked: false,
      user_id: sub,
      token: rt
    });
    return {
      at,
      rt
    };
  }
}
