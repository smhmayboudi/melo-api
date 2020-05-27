import {
  ArtistGetByIdsReqDto,
  ArtistGetReqDto,
  ArtistResDto,
  ArtistTrendingGenreReqDto,
  ArtistTrendingReqDto,
  DataPaginationResDto,
} from "@melo/common";

export interface DataArtistServiceInterface {
  get(dto: ArtistGetReqDto): Promise<ArtistResDto>;
  getByIds(
    dto: ArtistGetByIdsReqDto
  ): Promise<DataPaginationResDto<ArtistResDto>>;
  trending(
    dto: ArtistTrendingReqDto
  ): Promise<DataPaginationResDto<ArtistResDto>>;
  trendingGenre(
    dto: ArtistTrendingGenreReqDto
  ): Promise<DataPaginationResDto<ArtistResDto>>;
}
