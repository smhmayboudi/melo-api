import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class JwksFindOneReqDto {
  constructor(id: string) {
    this.id = id;
  }

  @ApiProperty({
    description: "The identification",
    example: "00000000-0000-0000-0000-000000000000",
  })
  @IsUUID()
  readonly id: string;
}
