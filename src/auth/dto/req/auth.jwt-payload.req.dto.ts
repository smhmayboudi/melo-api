import { IsNumberString, IsString } from "class-validator";

export class AuthJwtPayloadReqDto {
  constructor(exp: number, iat: number, jti: string, sub: string) {
    this.exp = exp;
    this.iat = iat;
    this.jti = jti;
    this.sub = sub;
  }

  @IsNumberString()
  exp: number;

  @IsNumberString()
  iat: number;

  @IsString()
  jti: string;

  @IsString()
  sub: string;
}
