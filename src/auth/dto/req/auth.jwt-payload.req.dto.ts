import { IsNumberString, IsString } from "class-validator";

export class AuthJwtPayloadReqDto {
  constructor(exp: number, iat: number, jti: string, sub: string) {
    this.exp = exp;
    this.iat = iat;
    this.jti = jti;
    this.sub = sub;
  }

  @IsNumberString()
  readonly exp: number;

  @IsNumberString()
  readonly iat: number;

  @IsString()
  readonly jti: string;

  @IsString()
  readonly sub: string;
}
