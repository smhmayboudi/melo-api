import { IsNumber, IsString } from "class-validator";

export class AuthJwtPayloadDto {
  constructor(exp: number, iat: number, jti: string, sub: string) {
    this.exp = exp;
    this.iat = iat;
    this.jti = jti;
    this.sub = sub;
  }

  @IsNumber()
  exp: number;

  @IsNumber()
  iat: number;

  @IsString()
  jti: string;

  @IsString()
  sub: string;
}
