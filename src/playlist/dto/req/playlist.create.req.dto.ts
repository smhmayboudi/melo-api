import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class PlaylistCreateReqDto {
  constructor(title: string, photoId?: string) {
    this.title = title;
    this.photoId = photoId;
  }

  @ApiProperty({
    description: "The title",
    example: "abcdef"
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
