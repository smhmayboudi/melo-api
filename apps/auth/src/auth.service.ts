import { ApmAfterMethod, ApmBeforeMethod } from "@melo/apm";
import {
  AuthAccessTokenReqDto,
  AuthAccessTokenResDto,
  AuthDeleteByTokenReqDto,
  AuthRefreshTokenReqDto,
  AuthRefreshTokenResDto,
  JWKS_SERVICE,
  JWKS_SERVICE_GET_ONE_RANDOM,
  JwksResDto,
  RT_SERVICE,
  RT_SERVICE_DELETE_BY_TOKEN,
  RT_SERVICE_SAVE,
  RtResDto,
  RtSaveReqDto,
} from "@melo/common";
import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";

import { AuthConfigService } from "./auth.config.service";
import { AuthServiceInterface } from "./auth.service.interface";
import { ClientProxy } from "@nestjs/microservices";
import { JwtService } from "@nestjs/jwt";
import { PromMethodCounter } from "@melo/prom";
import cryptoRandomString from "crypto-random-string";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

@Injectable()
// @PromInstanceCounter
export class AuthService implements AuthServiceInterface {
  constructor(
    @Inject(JWKS_SERVICE) private readonly jwksClientProxy: ClientProxy,
    @Inject(RT_SERVICE) private readonly rtClientProxy: ClientProxy,
    private readonly authConfigService: AuthConfigService,
    private readonly jwtService: JwtService
  ) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async accessToken(
    dto: AuthAccessTokenReqDto
  ): Promise<AuthAccessTokenResDto> {
    const jwks = await this.jwksClientProxy
      .send<JwksResDto | undefined, void>(
        JWKS_SERVICE_GET_ONE_RANDOM,
        undefined
      )
      .toPromise();
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
    return this.rtClientProxy
      .send<RtResDto | undefined, AuthDeleteByTokenReqDto>(
        RT_SERVICE_DELETE_BY_TOKEN,
        dto
      )
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async refreshToken(
    dto: AuthRefreshTokenReqDto
  ): Promise<AuthRefreshTokenResDto> {
    const jwks = await this.jwksClientProxy
      .send<JwksResDto | undefined, void>(
        JWKS_SERVICE_GET_ONE_RANDOM,
        undefined
      )
      .toPromise();
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
    await this.rtClientProxy
      .send<RtResDto, RtSaveReqDto>(RT_SERVICE_SAVE, {
        created_at: now,
        description: "",
        expire_at: exp,
        id: 0,
        is_blocked: false,
        token: rt,
        user_id: dto.sub,
      })
      .toPromise();
    return {
      at,
      rt,
    };
  }
}
