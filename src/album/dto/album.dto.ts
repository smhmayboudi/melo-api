import { ApiProperty } from "@nestjs/swagger";
import { ArtistDto } from "./artist.dto";
import { ImageDto } from "./image.dto";
import { PaginationResultDto } from "./pagination.result.dto";
import { SongDto } from "./song.dto";

export class AlbumDto {
  constructor(
    name: string,
    releaseDate: Date,
    artists?: ArtistDto[],
    downloadCount?: number,
    id?: string,
    image?: ImageDto,
    songs?: PaginationResultDto<SongDto>,
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
    example: "smith"
  })
  name: string;

  @ApiProperty({
    description: "The downlaod count",
    example: new Date()
  })
  releaseDate: Date;

  @ApiProperty({
    description: "The artists",
    example: ["smith"]
  })
  artists?: ArtistDto[];

  @ApiProperty({
    description: "The downlaod count",
    example: 0
  })
  downloadCount?: number;

  @ApiProperty({
    description: "The identification",
    example: "abcdef"
  })
  id?: string;

  @ApiProperty({
    description: "The image"
  })
  image?: ImageDto;

  @ApiProperty({
    description: "The image"
  })
  songs?: PaginationResultDto<SongDto>;

  @ApiProperty({
    description: "The tags",
    example: ["pop"]
  })
  tags?: string[];

  @ApiProperty({
    description: "The track count",
    example: 0
  })
  tracksCount?: number;
}
