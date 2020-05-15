import { IsDate, IsNumberString, IsUUID } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class AtAtResDto {
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
  readonly created_at: Date;

  @ApiProperty({
    description: "expire datetime",
    example: new Date(),
  })
  @IsDate()
  readonly expire_at: Date;

  @ApiProperty({
    description: "The primary key",
    example: "0",
  })
  @IsNumberString()
  readonly id: number;

  @ApiProperty({
    description: "user identification",
    example: new Date(),
  })
  @IsNumberString()
  readonly user_id: number;

  @ApiProperty({
    description: "access token block",
    example: "a3e45676-9428-46a6-8be0-df754121dcf2",
  })
  @IsUUID()
  readonly token: string;
}
