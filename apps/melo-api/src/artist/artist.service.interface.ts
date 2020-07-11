import {
  ArtistFollowReqDto,
  ArtistFollowingReqDto,
  ArtistGetReqDto,
  ArtistResDto,
  ArtistTrendingGenreReqDto,
  ArtistTrendingReqDto,
  ArtistUnfollowReqDto,
} from "@melo/common";

export interface ArtistServiceInterface {
  follow(dto: ArtistFollowReqDto): Promise<ArtistResDto>;
  following(dto: ArtistFollowingReqDto): Promise<ArtistResDto[]>;
  profile(dto: ArtistGetReqDto): Promise<ArtistResDto>;
  trending(dto: ArtistTrendingReqDto): Promise<ArtistResDto[]>;
  trendingGenre(dto: ArtistTrendingGenreReqDto): Promise<ArtistResDto[]>;
  unfollow(dto: ArtistUnfollowReqDto): Promise<ArtistResDto>;
}
