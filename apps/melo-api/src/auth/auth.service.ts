import {
  AUTH_SERVICE,
  AUTH_SERVICE_LOGIN,
  AUTH_SERVICE_LOGOUT,
  AUTH_SERVICE_TOKEN,
  AuthAccessTokenReqDto,
  AuthAccessTokenResDto,
  AuthDeleteByTokenReqDto,
  AuthRefreshTokenReqDto,
  AuthRefreshTokenResDto,
  RtResDto,
} from "@melo/common";
import { ApmAfterMethod, ApmBeforeMethod } from "@melo/apm";
import { Inject, Injectable } from "@nestjs/common";

import { AuthServiceInterface } from "./auth.service.interface";
import { ClientProxy } from "@nestjs/microservices";
import { PromMethodCounter } from "@melo/prom";

@Injectable()
// @PromInstanceCounter
export class AuthService implements AuthServiceInterface {
  constructor(
    @Inject(AUTH_SERVICE) private readonly authClientProxy: ClientProxy
  ) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async accessToken(
    dto: AuthAccessTokenReqDto
  ): Promise<AuthAccessTokenResDto> {
    return this.authClientProxy
      .send<AuthAccessTokenResDto, AuthAccessTokenReqDto>(
        AUTH_SERVICE_TOKEN,
        dto
      )
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async deleteByToken(
    dto: AuthDeleteByTokenReqDto
  ): Promise<RtResDto | undefined> {
    return this.authClientProxy
      .send<RtResDto | undefined, AuthDeleteByTokenReqDto>(
        AUTH_SERVICE_LOGOUT,
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
    return this.authClientProxy
      .send<AuthRefreshTokenResDto, AuthRefreshTokenReqDto>(
        AUTH_SERVICE_LOGIN,
        dto
      )
      .toPromise();
  }
}
