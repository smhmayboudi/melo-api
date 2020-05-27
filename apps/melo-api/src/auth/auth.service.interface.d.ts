import {
  AuthAccessTokenReqDto,
  AuthAccessTokenResDto,
  AuthDeleteByTokenReqDto,
  AuthRefreshTokenReqDto,
  AuthRefreshTokenResDto,
  RtResDto,
} from "@melo/common";

export interface AuthServiceInterface {
  accessToken(dto: AuthAccessTokenReqDto): Promise<AuthAccessTokenResDto>;
  deleteByToken(dto: AuthDeleteByTokenReqDto): Promise<RtResDto | undefined>;
  refreshToken(dto: AuthRefreshTokenReqDto): Promise<AuthRefreshTokenResDto>;
}
