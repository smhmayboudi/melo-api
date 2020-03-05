import { AuthAccessTokenResDto } from "./dto/res/auth.access-token.res.dto";
import { AuthRefreshTokenResDto } from "./dto/res/auth.refresh-token.res.dto";

export interface AuthServiceInterface {
  accessToken(sub: number): Promise<AuthAccessTokenResDto | undefined>;
  refreshToken(sub: number): Promise<AuthRefreshTokenResDto | undefined>;
}
