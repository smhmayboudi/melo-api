import { IsBoolean, IsDate, IsNumberString, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class RtResDto {
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
  @Type(() => Date)
  readonly created_at: Date;

  @ApiProperty({
    description: "description of blocked",
    example: "This token is bridged.",
  })
  @IsString()
  readonly description: string;

  @ApiProperty({
    description: "expire datetime",
    example: new Date(),
  })
  @IsDate()
  @Type(() => Date)
  readonly expire_at: Date;

  @ApiProperty({
    description: "The primary key",
    example: "abcdef",
  })
  @IsNumberString()
  readonly id: number;

  @ApiProperty({
    description: "is blockeed",
    example: false,
  })
  @IsBoolean()
  readonly is_blocked: boolean;

  @ApiProperty({
    description: "user identification",
    example: "0",
  })
  @IsNumberString()
  readonly user_id: number;

  @ApiProperty({
    description: "refresh token",
    example: new Date(),
  })
  @IsString()
  readonly token: string;
}
