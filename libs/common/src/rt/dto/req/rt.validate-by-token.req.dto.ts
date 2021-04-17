import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class RtValidateByTokenReqDto {
  constructor(token: string) {
    this.token = token;
  }

  @ApiProperty({
    description: "access token block",
    example: "00000000-0000-0000-0000-000000000000",
  })
  @IsUUID()
  readonly token: string;
}
