import {
  ArtistGetByIdsReqDto,
  ArtistGetReqDto,
  ArtistResDto,
  ArtistTrendingGenreReqDto,
  ArtistTrendingReqDto,
} from "@melo/common";

export interface DataArtistServiceInterface {
  get(dto: ArtistGetReqDto): Promise<ArtistResDto>;
  getByIds(dto: ArtistGetByIdsReqDto): Promise<ArtistResDto[]>;
  trending(dto: ArtistTrendingReqDto): Promise<ArtistResDto[]>;
  trendingGenre(dto: ArtistTrendingGenreReqDto): Promise<ArtistResDto[]>;
}
