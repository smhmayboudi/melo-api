import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, ValidateNested } from "class-validator";
import { DataAlbumResDto } from "./data.album.res.dto";
import { DataImageResDto } from "./data.image.res.dto";
import { DataSongResDto } from "./data.song.res.dto";

export class DataSliderResDto {
  constructor(
    album?: DataAlbumResDto,
    image?: DataImageResDto,
    song?: DataSongResDto
  ) {
    this.album = album;
    this.image = image;
    this.song = song;
  }

  @ApiProperty({
    description: "The album dto"
  })
  @IsOptional()
  @ValidateNested()
  album?: DataAlbumResDto;

  @ApiProperty({
    description: "The image dto"
  })
  @IsOptional()
  @ValidateNested()
  image?: DataImageResDto;

  @ApiProperty({
    description: "The song dto"
  })
  @IsOptional()
  @ValidateNested()
  song?: DataSongResDto;
}
