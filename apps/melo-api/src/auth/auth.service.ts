import { ApmAfterMethod, ApmBeforeMethod } from "@melo/apm";
import {
  AuthAccessTokenReqDto,
  AuthAccessTokenResDto,
  AuthDeleteByTokenReqDto,
  AuthRefreshTokenReqDto,
  AuthRefreshTokenResDto,
  RtResDto,
} from "@melo/common";
import { Injectable, InternalServerErrorException } from "@nestjs/common";

import { AuthConfigService } from "./auth.config.service";
import { AuthServiceInterface } from "./auth.service.interface";
import { JwksService } from "../jwks/jwks.service";
import { JwtService } from "@nestjs/jwt";
import { PromMethodCounter } from "@melo/prom";
import { RtService } from "../rt/rt.service";
import cryptoRandomString from "crypto-random-string";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

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
  async accessToken(
    dto: AuthAccessTokenReqDto
  ): Promise<AuthAccessTokenResDto> {
    const jwks = await this.jwksService.getOneRandom();
    if (jwks === undefined) {
      throw new InternalServerErrorException();
    }
    const at = this.jwtService.sign(
      {},
      {
        jwtid: uuidv4(),
        keyid: jwks.id,
        subject: dto.sub.toString(),
      }
    );
    return {
      at,
    };
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  deleteByToken(dto: AuthDeleteByTokenReqDto): Promise<RtResDto | undefined> {
    return this.rtService.deleteByToken(dto);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async refreshToken(
    dto: AuthRefreshTokenReqDto
  ): Promise<AuthRefreshTokenResDto> {
    const jwks = await this.jwksService.getOneRandom();
    if (jwks === undefined) {
      throw new InternalServerErrorException();
    }
    const at = this.jwtService.sign(
      {},
      {
        jwtid: dto.jwtid,
        keyid: jwks.id,
        subject: dto.sub.toString(),
      }
    );
    const now = dto.now || new Date();
    const exp = moment(now)
      .add(this.authConfigService.jwtRefreshTokenExpiresIn, "ms")
      .toDate();
    const rt =
      dto.rt ||
      cryptoRandomString({
        length: 256,
        type: "base64",
      });
    await this.rtService.save({
      created_at: now,
      description: "",
      expire_at: exp,
      id: 0,
      is_blocked: false,
      token: rt,
      user_id: dto.sub,
    });
    return {
      at,
      rt,
    };
  }
}
