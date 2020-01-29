import { IsString } from "class-validator";

export class AuthAccessTokenDto {
  constructor(at: string) {
    this.at = at;
  }

  @IsString()
  at: string;
}
