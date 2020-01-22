export class JwtPayloadDto {
  constructor(exp: number, iat: number, jti: string, sub: string) {
    this.exp = exp;
    this.iat = iat;
    this.jti = jti;
    this.sub = sub;
  }
  exp: number;
  iat: number;
  jti: string;
  sub: string;
}
