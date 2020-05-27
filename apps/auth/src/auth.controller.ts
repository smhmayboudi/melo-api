import {
  AUTH_SERVICE_LOGIN,
  AUTH_SERVICE_LOGOUT,
  AUTH_SERVICE_TELEGRAM,
  AUTH_SERVICE_TOKEN,
  AuthAccessTokenReqDto,
  AuthAccessTokenResDto,
  AuthDeleteByTokenReqDto,
  AuthRefreshTokenReqDto,
  AuthRefreshTokenResDto,
  RtResDto,
} from "@melo/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

import { AuthService } from "./auth.service";
import { Controller } from "@nestjs/common";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern(AUTH_SERVICE_LOGIN)
  login(
    @Payload() dto: AuthRefreshTokenReqDto
  ): Promise<AuthRefreshTokenResDto> {
    return this.authService.refreshToken(dto);
  }

  @MessagePattern(AUTH_SERVICE_LOGOUT)
  logout(
    @Payload() dto: AuthDeleteByTokenReqDto
  ): Promise<RtResDto | undefined> {
    return this.authService.deleteByToken(dto);
  }

  @MessagePattern(AUTH_SERVICE_TELEGRAM)
  telegram(
    @Payload() dto: AuthRefreshTokenReqDto
  ): Promise<AuthRefreshTokenResDto> {
    return this.authService.refreshToken(dto);
  }

  @MessagePattern(AUTH_SERVICE_TOKEN)
  token(@Payload() dto: AuthAccessTokenReqDto): Promise<AuthAccessTokenResDto> {
    return this.authService.accessToken(dto);
  }
}
