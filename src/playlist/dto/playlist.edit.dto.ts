import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString } from "class-validator";

export class PlaylistEditDto {
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
    example: 0
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: "The publiciity",
    example: false
  })
  @IsBoolean()
  isPublic?: boolean;

  @ApiProperty({
    description: "The photo identification",
    example: 0
  })
  @IsString()
  photoId?: string;

  @ApiProperty({
    description: "The title",
    example: 0
  })
  @IsString()
  title?: string;
}
