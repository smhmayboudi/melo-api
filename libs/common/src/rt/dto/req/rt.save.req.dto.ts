import { IsBoolean, IsDate, IsNumberString, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class RtSaveReqDto {
  constructor(
    created_at: Date,
    description: string,
    expire_at: Date,
    id: number,
    is_blocked: boolean,
    token: string,
    user_id: number
  ) {
    this.created_at = created_at;
    this.description = description;
    this.expire_at = expire_at;
    this.id = id;
    this.is_blocked = is_blocked;
    this.token = token;
    this.user_id = user_id;
  }

  @ApiProperty({
    description: "create datetime",
    example: new Date(),
  })
  @IsDate()
  @Type(() => Date)
  created_at: Date;

  @ApiProperty({
    description: "description of blocked",
    example: "This token is bridged.",
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: "expire datetime",
    example: new Date(),
  })
  @IsDate()
  @Type(() => Date)
  expire_at: Date;

  @ApiProperty({
    description: "The identification",
    example: "0",
  })
  @IsNumberString()
  id: number;

  @ApiProperty({
    description: "is blockeed",
    example: false,
  })
  @IsBoolean()
  is_blocked: boolean;

  @ApiProperty({
    description: "refresh token",
    example: new Date(),
  })
  @IsString()
  token: string;

  @ApiProperty({
    description: "user identification",
    example: "0",
  })
  @IsNumberString()
  user_id: number;
}
