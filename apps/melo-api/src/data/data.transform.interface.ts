import {
  AlbumResDto,
  ArtistResDto,
  DataElasticsearchArtistResDto,
  DataElasticsearchSearchResDto,
  SongResDto,
} from "@melo/common";

export interface DataTransformServiceInterface {
  album(dto: DataElasticsearchSearchResDto): Promise<AlbumResDto>;
  artist(dto: DataElasticsearchArtistResDto): Promise<ArtistResDto>;
  song(dto: DataElasticsearchSearchResDto): Promise<SongResDto>;
}
