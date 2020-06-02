import {
  IsArray,
  IsDate,
  IsNumberString,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import { ArtistResDto } from "../../../artist/dto/res/artist.res.dto";
import { ConstImageResDto } from "../../../const/dto/res/const.image.res.dto";
import { SongResDto } from "../../../song/dto/res/song.res.dto";
import { Type } from "class-transformer";

export class AlbumResDto {
  constructor(
    name: string,
    releaseDate: Date,
    artists?: ArtistResDto[],
    downloadCount?: number,
    id?: number,
    image?: ConstImageResDto,
    songs?: SongResDto[],
    tags?: string[],
    tracksCount?: number
  ) {
    this.name = name;
    this.releaseDate = releaseDate;
    this.artists = artists;
    this.downloadCount = downloadCount;
    this.id = id;
    this.image = image;
    this.songs = songs;
    this.tags = tags;
    this.tracksCount = tracksCount;
  }

  @ApiProperty({
    description: "The name",
    example: "smith",
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: "The downlaod count",
    example: new Date(),
  })
  @IsDate()
  @Type(() => Date)
  readonly releaseDate: Date;

  @ApiProperty({
    description: "The artists",
    isArray: true,
    type: ArtistResDto,
  })
  @IsArray()
  @IsOptional()
  @Type(() => ArtistResDto)
  @ValidateNested({
    each: true,
  })
  readonly artists?: ArtistResDto[];

  @ApiProperty({
    description: "The downlaod count",
    example: "0",
  })
  @IsNumberString()
  @IsOptional()
  readonly downloadCount?: number;

  @ApiProperty({
    description: "The identification",
    example: "0",
  })
  @IsNumberString()
  @IsOptional()
  readonly id?: number;

  @ApiProperty({
    description: "The image",
  })
  @IsOptional()
  @Type(() => ConstImageResDto)
  @ValidateNested()
  readonly image?: ConstImageResDto;

  @ApiProperty({
    description: "The image",
  })
  @IsOptional()
  @ValidateNested()
  readonly songs?: SongResDto[];

  @ApiProperty({
    description: "The tags",
    example: ["pop"],
    isArray: true,
    type: String,
  })
  @IsArray()
  @IsOptional()
  @IsString()
  readonly tags?: string[];

  @ApiProperty({
    description: "The track count",
    example: "0",
  })
  @IsNumberString()
  @IsOptional()
  readonly tracksCount?: number;
}
