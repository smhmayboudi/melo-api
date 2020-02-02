import { IsString } from "class-validator";

export class AuthAccessTokenResDto {
  constructor(at: string) {
    this.at = at;
  }

  @IsString()
  at: string;
}
