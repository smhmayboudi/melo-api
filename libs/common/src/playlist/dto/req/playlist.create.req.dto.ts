import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class PlaylistCreateReqDto {
  constructor(sub: number, title: string, photoId?: string) {
    this.sub = sub;
    this.title = title;
    this.photoId = photoId;
  }

  @ApiHideProperty()
  @IsNumber()
  readonly sub: number;

  @ApiProperty({
    description: "The title",
    example: "black",
  })
  @IsString()
  readonly title: string;

  @ApiProperty({
    description: "The identification",
    example: "abcdef",
  })
  @IsOptional()
  @IsString()
  readonly photoId?: string;
}
