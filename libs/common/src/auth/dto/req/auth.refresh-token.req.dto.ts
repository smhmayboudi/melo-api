import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNumber, IsUUID } from "class-validator";

import { Type } from "class-transformer";
import cryptoRandomString from "crypto-random-string";
import { v4 as uuidv4 } from "uuid";

export class AuthRefreshTokenReqDto {
  constructor(sub: number, jwtid?: string, now?: Date, rt?: string) {
    this.sub = sub;
    this.jwtid = jwtid;
    this.now = now;
    this.rt = rt;
  }

  @ApiHideProperty()
  @IsNumber()
  readonly sub: number;

  @ApiProperty({
    description: "jwtid block",
    example: "00000000-0000-0000-0000-000000000000",
  })
  @IsUUID()
  readonly jwtid?: string = uuidv4();

  @ApiProperty({
    description: "The date",
    example: new Date(),
  })
  @IsDate()
  @Type(() => Date)
  readonly now?: Date = new Date();

  @ApiProperty({
    description: "refresh token block",
    example: "00000000-0000-0000-0000-000000000000",
  })
  @IsUUID()
  readonly rt?: string = cryptoRandomString({
    length: 256,
    type: "base64",
  });
}
