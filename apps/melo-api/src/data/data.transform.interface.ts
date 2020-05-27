import {
  AlbumResDto,
  ArtistResDto,
  DataElasticSearchArtistResDto,
  DataElasticSearchSearchResDto,
  SongResDto,
} from "@melo/common";

export interface DataTransformServiceInterface {
  album(dto: DataElasticSearchSearchResDto): Promise<AlbumResDto>;
  artist(dto: DataElasticSearchArtistResDto): Promise<ArtistResDto>;
  song(dto: DataElasticSearchSearchResDto): Promise<SongResDto>;
}
