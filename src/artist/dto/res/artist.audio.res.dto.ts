import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { ArtistMp3ResDto } from "./artist.mp3.res.dto";

export class ArtistAudioResDto {
  constructor(high?: ArtistMp3ResDto, medium?: ArtistMp3ResDto) {
    this.high = high;
    this.medium = medium;
  }

  @ApiProperty({
    description: "The hiigh quality of mp3"
  })
  @IsOptional()
  high?: ArtistMp3ResDto;

  @ApiProperty({
    description: "The medium quality of mp3"
  })
  @IsOptional()
  medium?: ArtistMp3ResDto;
}
