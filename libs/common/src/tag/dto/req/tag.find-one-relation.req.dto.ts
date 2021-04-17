import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString } from "class-validator";

export class TagFindOneRelationReqDto {
  constructor(id: number) {
    this.id = id;
  }

  @ApiProperty({
    description: "The identification",
    example: "0",
  })
  @IsNumberString()
  readonly id: number;
}
