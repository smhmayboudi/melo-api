import { IsDate, IsNumberString, IsUUID } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class AtUpdateReqDto {
  constructor(
    count: number,
    created_at: Date,
    expire_at: Date,
    id: number,
    user_id: number,
    token: string
  ) {
    this.count = count;
    this.created_at = created_at;
    this.expire_at = expire_at;
    this.id = id;
    this.user_id = user_id;
    this.token = token;
  }

  @ApiProperty({
    description: "create datetime",
    example: new Date(),
  })
  @IsDate()
  readonly count: number;

  @ApiProperty({
    description: "create datetime",
    example: new Date(),
  })
  @IsDate()
  @Type(() => Date)
  readonly created_at: Date;

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
    description: "user identification",
    example: "0",
  })
  @IsNumberString()
  readonly user_id: number;

  @ApiProperty({
    description: "access token block",
    example: "00000000-0000-0000-0000-000000000000",
  })
  @IsUUID()
  readonly token: string;
}
