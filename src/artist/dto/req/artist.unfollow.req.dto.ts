import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString } from "class-validator";

export class ArtistUnfollowReqDto {
  constructor(id: number) {
    this.id = id;
  }

  @ApiProperty({
    description: "The artist identification",
    example: 0,
  })
  @IsNumberString()
  id: number;
}
