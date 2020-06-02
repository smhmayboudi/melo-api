import {
  ArtistFollowReqDto,
  ArtistFollowingReqDto,
  ArtistGetByIdsReqDto,
  ArtistGetReqDto,
  ArtistResDto,
  ArtistTrendingGenreReqDto,
  ArtistTrendingReqDto,
  ArtistUnfollowReqDto,
  DataElasticsearchArtistResDto,
} from "@melo/common";

export interface ArtistServiceInterface {
  follow(dto: ArtistFollowReqDto): Promise<ArtistResDto>;
  following(dto: ArtistFollowingReqDto): Promise<ArtistResDto[]>;
  get(dto: ArtistGetReqDto): Promise<ArtistResDto>;
  getByIds(dto: ArtistGetByIdsReqDto): Promise<ArtistResDto[]>;
  profile(dto: ArtistGetReqDto): Promise<ArtistResDto>;
  transform(dto: DataElasticsearchArtistResDto): Promise<ArtistResDto>;
  trending(dto: ArtistTrendingReqDto): Promise<ArtistResDto[]>;
  trendingGenre(dto: ArtistTrendingGenreReqDto): Promise<ArtistResDto[]>;
  unfollow(dto: ArtistUnfollowReqDto): Promise<ArtistResDto>;
}
