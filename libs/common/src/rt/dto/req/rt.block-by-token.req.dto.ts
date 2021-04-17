import { IsString, IsUUID } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class RtBlockByTokenReqDto {
  constructor(description: string, token: string) {
    this.description = description;
    this.token = token;
  }

  @ApiProperty({
    description: "description of blocked",
    example: "This token is bridged.",
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: "access token block",
    example: "00000000-0000-0000-0000-000000000000",
  })
  @IsUUID()
  readonly token: string;
}
