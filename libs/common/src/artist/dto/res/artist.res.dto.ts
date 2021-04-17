import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumberString,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";

import { AlbumResDto } from "../../../album/dto/res/album.res.dto";
import { ApiProperty } from "@nestjs/swagger";
import { ArtistType } from "../../artist.type";
import { ConstImageResDto } from "../../../const/dto/res/const.image.res.dto";
import { SongResDto } from "../../../song/dto/res/song.res.dto";
import { Type } from "class-transformer";

export class ArtistResDto {
  constructor(
    followersCount: number,
    id: number,
    type: ArtistType,
    albums?: AlbumResDto[],
    following?: boolean,
    fullName?: string,
    image?: ConstImageResDto,
    songs?: SongResDto[],
    sumSongsDownloadsCount?: number,
    tags?: string[]
  ) {
    this.followersCount = followersCount;
    this.id = id;
    this.type = type;
    this.albums = albums;
    this.following = following;
    this.fullName = fullName;
    this.image = image;
    this.songs = songs;
    this.sumSongsDownloadsCount = sumSongsDownloadsCount;
    this.tags = tags;
  }

  @ApiProperty({
    description: "The follwer count",
    example: "0",
  })
  @IsNumberString()
  readonly followersCount: number;

  @ApiProperty({
    description: "The identification",
    example: "abcdef",
  })
  @IsNumberString()
  readonly id: number;

  @ApiProperty({
    description: "The artist type",
    example: ArtistType.prime,
  })
  @IsEnum(ArtistType)
  readonly type: ArtistType;

  @ApiProperty({
    description: "The albums",
  })
  @IsOptional()
  @ValidateNested()
  readonly albums?: AlbumResDto[];

  @ApiProperty({
    description: "The following",
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  readonly following?: boolean;

  @ApiProperty({
    description: "The fullname",
    example: "john smith",
  })
  @IsOptional()
  @IsString()
  readonly fullName?: string;

  @ApiProperty({
    description: "The name",
  })
  @IsOptional()
  @Type(() => ConstImageResDto)
  @ValidateNested()
  readonly image?: ConstImageResDto;

  @ApiProperty({
    description: "The songs",
  })
  @IsOptional()
  @ValidateNested()
  readonly songs?: SongResDto[];

  @ApiProperty({
    description: "The sum downloads of songs count",
    example: "0",
  })
  @IsOptional()
  @IsNumberString()
  readonly sumSongsDownloadsCount?: number;

  @ApiProperty({
    description: "The tags",
    example: ["smith"],
    isArray: true,
    type: String,
  })
  @IsArray()
  @IsOptional()
  @IsString()
  readonly tags?: string[];
}
