import { DataArtistResDto } from "src/data/dto/res/data.artist.res.dto";
import { DataPaginationResDto } from "src/data/dto/res/data.pagination.res.dto";
import { ArtistByIdReqDto } from "./dto/req/artist.by-id.req.dto";
import { ArtistFollowReqDto } from "./dto/req/artist.follow.req.dto";
import { ArtistFollowingReqDto } from "./dto/req/artist.following.req.dto";
import { ArtistTrendingGenreReqDto } from "./dto/req/artist.trending-genre.req.dto";
import { ArtistUnfollowReqDto } from "./dto/req/artist.unfollow.req.dto";

export interface ArtistServiceInterface {
  follow(
    dto: ArtistFollowReqDto,
    id: number,
    sub: number
  ): Promise<DataArtistResDto>;

  following(
    dto: ArtistFollowingReqDto,
    id: number
  ): Promise<DataPaginationResDto<DataArtistResDto>>;

  profile(
    dto: ArtistByIdReqDto,
    id: number,
    sub: number
  ): Promise<DataArtistResDto>;

  trending(sub: number): Promise<DataPaginationResDto<DataArtistResDto>>;

  trendingGenre(
    dto: ArtistTrendingGenreReqDto,
    sub: number
  ): Promise<DataPaginationResDto<DataArtistResDto>>;

  unfollow(
    dto: ArtistUnfollowReqDto,
    id: number,
    sub: number
  ): Promise<DataArtistResDto>;
}
