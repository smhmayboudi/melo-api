import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class PlaylistCreateDto {
  constructor(title: string, photoId?: string) {
    this.title = title;
    this.photoId = photoId;
  }

  @ApiProperty({
    description: "The title",
    example: 0
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: "The photo identification",
    example: 0
  })
  @IsOptional()
  @IsString()
  photoId?: string;
}
