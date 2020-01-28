import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested
} from "class-validator";
import { PlaylistArtistType } from "../../type/playlist.artist.type";
import { PlaylistAlbumResDto } from "./playlist.album.res.dto";
import { PlaylistImageResDto } from "./playlist.image.res.dto";
import { PlaylistPaginationResDto } from "./playlist.pagination.res.dto";
import { PlaylistSongResDto } from "./playlist.song.res.dto";

export class PlaylistArtistResDto {
  constructor(
    followersCount: number,
    id: string,
    type: PlaylistArtistType,
    albums?: PlaylistPaginationResDto<PlaylistAlbumResDto>,
    fullName?: string,
    image?: PlaylistImageResDto,
    songs?: PlaylistPaginationResDto<PlaylistSongResDto>,
    sumSongsDownloadsCount?: number,
    tags?: string[]
  ) {
    this.followersCount = followersCount;
    this.id = id;
    this.type = type;
    this.albums = albums;
    this.fullName = fullName;
    this.image = image;
    this.songs = songs;
    this.sumSongsDownloadsCount = sumSongsDownloadsCount;
    this.tags = tags;
  }

  @ApiProperty({
    description: "The follwer count",
    example: 0
  })
  @IsNumber()
  followersCount: number;

  @ApiProperty({
    description: "The identification",
    example: "abcdef"
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: "The artist type",
    example: PlaylistArtistType.prime
  })
  @IsEnum(PlaylistArtistType)
  type: PlaylistArtistType;

  @ApiProperty({
    description: "The albums"
  })
  @IsOptional()
  @ValidateNested()
  albums?: PlaylistPaginationResDto<PlaylistAlbumResDto>;

  @ApiProperty({
    description: "The fullname",
    example: "john smith"
  })
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiProperty({
    description: "The name"
  })
  @IsOptional()
  @ValidateNested()
  image?: PlaylistImageResDto;

  @ApiProperty({
    description: "The songs"
  })
  @IsOptional()
  @ValidateNested()
  songs?: PlaylistPaginationResDto<PlaylistSongResDto>;

  @ApiProperty({
    description: "The sum downloads of songs count",
    example: 0
  })
  @IsOptional()
  @IsNumber()
  sumSongsDownloadsCount?: number;

  @ApiProperty({
    description: "The tags",
    example: ["smith"]
  })
  @IsArray()
  @IsOptional()
  @IsString()
  tags?: string[];
}
