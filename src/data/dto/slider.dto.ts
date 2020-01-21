import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, ValidateNested } from "class-validator";
import { AlbumDto } from "./album.dto";
import { ImageDto } from "./image.dto";
import { SongDto } from "./song.dto";

export class SliderDto {
  constructor(album?: AlbumDto, image?: ImageDto, song?: SongDto) {
    this.album = album;
    this.image = image;
    this.song = song;
  }

  @ApiProperty({
    description: "The album dto"
  })
  @IsOptional()
  @ValidateNested()
  album?: AlbumDto;

  @ApiProperty({
    description: "The image dto"
  })
  @IsOptional()
  @ValidateNested()
  image?: ImageDto;

  @ApiProperty({
    description: "The song dto"
  })
  @IsOptional()
  @ValidateNested()
  song?: SongDto;
}
