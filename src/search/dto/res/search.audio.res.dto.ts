import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { SearchMp3ResDto } from "./search.mp3.res.dto";

export class SearchAudioResDto {
  constructor(high?: SearchMp3ResDto, medium?: SearchMp3ResDto) {
    this.high = high;
    this.medium = medium;
  }

  @ApiProperty({
    description: "The hiigh quality of mp3"
  })
  @IsOptional()
  high?: SearchMp3ResDto;

  @ApiProperty({
    description: "The medium quality of mp3"
  })
  @IsOptional()
  medium?: SearchMp3ResDto;
}
