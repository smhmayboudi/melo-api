import { ApiHideProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class AuthConfigReqDto {
  constructor(expiresIn: number) {
    this.expiresIn = expiresIn;
  }

  @ApiHideProperty()
  @IsNumber()
  readonly expiresIn: number;
}
