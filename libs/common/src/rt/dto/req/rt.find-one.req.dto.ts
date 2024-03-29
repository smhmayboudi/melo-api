import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString } from "class-validator";

export class RtFindOneReqDto {
  constructor(id: number) {
    this.id = id;
  }

  @ApiProperty({
    description: "The identification",
    example: "0",
  })
  @IsNumberString()
  id: number;
}
