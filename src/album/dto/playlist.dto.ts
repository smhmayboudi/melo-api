import { ApiProperty } from "@nestjs/swagger";
import { PaginationResultDto } from "./pagination.result.dto";
import { ImageDto } from "./image.dto";
import { SongDto } from "./song.dto";

export class PlaylistDto {
  constructor(
    id: string,
    title: string,
    tracksCount: number,
    image: ImageDto,
    isPublic: boolean,
    releaseDate: Date,
    followersCount: number,
    songs?: PaginationResultDto<SongDto>
  ) {
    this.id = id;
    this.title = title;
    this.tracksCount = tracksCount;
    this.image = image;
    this.isPublic = isPublic;
    this.releaseDate = releaseDate;
    this.followersCount = followersCount;
    this.songs = songs;
  }

  @ApiProperty({
    description: "The identification",
    example: "abcdef"
  })
  id: string;

  @ApiProperty({
    description: "The title",
    example: "black count down"
  })
  title: string;

  @ApiProperty({
    description: "The count of tracks",
    example: 0
  })
  tracksCount: number;

  @ApiProperty({
    description: "The cover",
    example: "http://www.google.com"
  })
  image: ImageDto;

  @ApiProperty({
    description: "Is it public?",
    example: "abcdef"
  })
  isPublic: boolean;

  @ApiProperty({
    description: "The release date",
    example: new Date()
  })
  releaseDate: Date;

  @ApiProperty({
    description: "The count of follwers",
    example: 0
  })
  followersCount: number;

  @ApiProperty({
    description: "The songs"
  })
  songs?: PaginationResultDto<SongDto>;
}
