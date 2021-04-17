import { ApiHideProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class AuthAccessTokenReqDto {
  constructor(sub: number) {
    this.sub = sub;
  }

  @ApiHideProperty()
  @IsNumber()
  readonly sub: number;
}
