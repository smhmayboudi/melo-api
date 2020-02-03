import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, ValidateNested } from "class-validator";
import { SearchSearchType } from "../../type/search.search-type";
import { SearchAlbumResDto } from "./search.album.res.dto";
import { SearchArtistResDto } from "./search.artist.res.dto";
import { SearchPlaylistResDto } from "./search.playlist.res.dto";
import { SearchSongResDto } from "./search.song.res.dto";

export class SearchSearchResDto {
  constructor(
    type: SearchSearchType,
    album?: SearchAlbumResDto,
    artist?: SearchArtistResDto,
    playlist?: SearchPlaylistResDto,
    position?: number,
    song?: SearchSongResDto
  ) {
    this.type = type;
    this.album = album;
    this.artist = artist;
    this.playlist = playlist;
    this.position = position;
    this.song = song;
  }

  @ApiProperty({
    description: "The type of search",
    example: SearchSearchType.album
  })
  @IsEnum(SearchSearchType)
  type: SearchSearchType;

  @ApiProperty({
    description: "The album"
  })
  @IsOptional()
  @ValidateNested()
  album?: SearchAlbumResDto;

  @ApiProperty({
    description: "The artist"
  })
  @IsOptional()
  @ValidateNested()
  artist?: SearchArtistResDto;

  @ApiProperty({
    description: "The playlist"
  })
  @IsOptional()
  @ValidateNested()
  playlist?: SearchPlaylistResDto;

  @ApiProperty({
    description: "The position",
    example: 0
  })
  @IsNumber()
  @IsOptional()
  position?: number;

  @ApiProperty({
    description: "The song"
  })
  @IsOptional()
  @ValidateNested()
  song?: SearchSongResDto;
}
