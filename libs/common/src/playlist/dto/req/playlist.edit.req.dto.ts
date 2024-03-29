import { IsBoolean, IsOptional, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class PlaylistEditReqDto {
  constructor(
    id: string,
    isPublic?: boolean,
    photoId?: string,
    title?: string
  ) {
    this.id = id;
    this.isPublic = isPublic;
    this.photoId = photoId;
    this.title = title;
  }

  @ApiProperty({
    description: "The identification",
    example: "abcdef",
  })
  @IsString()
  readonly id: string;

  @ApiProperty({
    description: "The publiciity",
    example: false,
  })
  @IsBoolean()
  @IsOptional()
  readonly isPublic?: boolean;

  @ApiProperty({
    description: "The identification",
    example: "abcdef",
  })
  @IsOptional()
  @IsString()
  readonly photoId?: string;

  @ApiProperty({
    description: "The title",
    example: "abcdef",
  })
  @IsOptional()
  @IsString()
  readonly title?: string;
}
