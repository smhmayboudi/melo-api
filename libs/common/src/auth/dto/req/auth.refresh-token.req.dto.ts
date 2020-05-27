import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNumber, IsUUID, ValidateNested } from "class-validator";

import { AuthConfigReqDto } from "./auth.config.req.dto";
import { Type } from "class-transformer";
import cryptoRandomString from "crypto-random-string";
import { v4 as uuidv4 } from "uuid";

export class AuthRefreshTokenReqDto {
  constructor(
    config: AuthConfigReqDto,
    sub: number,
    jwtid?: string,
    now?: Date,
    rt?: string
  ) {
    this.config = config;
    this.sub = sub;
    this.jwtid = jwtid;
    this.now = now;
    this.rt = rt;
  }

  @ApiHideProperty()
  @Type(() => AuthConfigReqDto)
  @ValidateNested()
  readonly config: AuthConfigReqDto;

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
  readonly rt?: string = cryptoRandomString({ length: 256, type: "base64" });
}
