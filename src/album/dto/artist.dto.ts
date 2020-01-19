import { ApiProperty } from "@nestjs/swagger";
import { AlbumDto } from "./album.dto";
import { ArtistType } from "../type/artist.type";
import { ImageDto } from "./image.dto";
import { PaginationResultDto } from "./pagination.result.dto";
import { SongDto } from "./song.dto";

export class ArtistDto {
  constructor(
    followersCount: number,
    id: string,
    type: ArtistType,
    albums?: PaginationResultDto<AlbumDto>,
    fullName?: string,
    image?: ImageDto,
    songs?: PaginationResultDto<SongDto>,
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
  followersCount: number;

  @ApiProperty({
    description: "The identification",
    example: "abcdef"
  })
  id: string;

  @ApiProperty({
    description: "The artist type",
    example: ArtistType.Prime
  })
  type: ArtistType;

  @ApiProperty({
    description: "The albums"
  })
  albums?: PaginationResultDto<AlbumDto>;

  @ApiProperty({
    description: "The fullname",
    example: "john smith"
  })
  fullName?: string;

  @ApiProperty({
    description: "The name"
  })
  image?: ImageDto;

  @ApiProperty({
    description: "The songs"
  })
  songs?: PaginationResultDto<SongDto>;

  @ApiProperty({
    description: "The sum downloads of songs count",
    example: 0
  })
  sumSongsDownloadsCount?: number;

  @ApiProperty({
    description: "The tags",
    example: ["smith"]
  })
  tags?: string[];
}
