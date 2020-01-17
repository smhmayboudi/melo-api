export interface JwtPayload {
  exp: number;
  iat: number;
  jti: string;
  sub: string;
}
