import { IsBoolean, IsDate, IsNumber, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class RtRtResDto {
  constructor(
    created_at: Date,
    description: string,
    expire_at: Date,
    id: number,
    is_blocked: boolean,
    user_id: number,
    token: string
  ) {
    this.created_at = created_at;
    this.description = description;
    this.expire_at = expire_at;
    this.id = id;
    this.is_blocked = is_blocked;
    this.user_id = user_id;
    this.token = token;
  }

  @ApiProperty({
    description: "create datetime",
    example: new Date(),
  })
  @IsDate()
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
  expire_at: Date;

  @ApiProperty({
    description: "The primary key",
    example: 0,
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    description: "is blockeed",
    example: false,
  })
  @IsBoolean()
  is_blocked: boolean;

  @ApiProperty({
    description: "user identification",
    example: new Date(),
  })
  @IsNumber()
  user_id: number;

  @ApiProperty({
    description: "refresh token",
    example: new Date(),
  })
  @IsString()
  token: string;
}
