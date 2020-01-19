import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ArtistUnfollowDto {
  constructor(id: string) {
    this.id = id;
  }

  @ApiProperty({
    description: "The artist identification",
    example: "abcdef"
  })
  @IsString()
  id: string;
}
