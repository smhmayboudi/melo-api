import { IsString } from "class-validator";

export class AuthRefreshTokenDto {
  constructor(at: string, rt: string) {
    this.at = at;
    this.rt = rt;
  }

  @IsString()
  at: string;

  @IsString()
  rt: string;
}
