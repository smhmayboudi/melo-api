import { IsOptional, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class PlaylistCreateReqDto {
  constructor(title: string, photoId?: string) {
    this.title = title;
    this.photoId = photoId;
  }

  @ApiProperty({
    description: "The title",
    example: "black",
  })
  @IsString()
  readonly title: string;

  @ApiProperty({
    description: "The photo identification",
    example: "abcdef",
  })
  @IsOptional()
  @IsString()
  readonly photoId?: string;
}
