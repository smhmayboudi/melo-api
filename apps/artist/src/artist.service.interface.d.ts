import {
  ArtistFollowReqDto,
  ArtistFollowingReqDto,
  ArtistGetReqDto,
  ArtistResDto,
  ArtistTrendingGenreReqDto,
  ArtistTrendingReqDto,
  ArtistUnfollowReqDto,
  DataPaginationResDto,
} from "@melo/common";

export interface ArtistServiceInterface {
  follow(dto: ArtistFollowReqDto): Promise<ArtistResDto>;
  following(
    dto: ArtistFollowingReqDto
  ): Promise<DataPaginationResDto<ArtistResDto>>;
  profile(dto: ArtistGetReqDto): Promise<ArtistResDto>;
  trending(
    dto: ArtistTrendingReqDto
  ): Promise<DataPaginationResDto<ArtistResDto>>;
  trendingGenre(
    dto: ArtistTrendingGenreReqDto
  ): Promise<DataPaginationResDto<ArtistResDto>>;
  unfollow(dto: ArtistUnfollowReqDto): Promise<ArtistResDto>;
}
