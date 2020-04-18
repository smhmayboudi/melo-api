import { ArtistByIdReqDto } from "./dto/req/artist.by-id.req.dto";
import { ArtistFollowReqDto } from "./dto/req/artist.follow.req.dto";
import { ArtistFollowingReqDto } from "./dto/req/artist.following.req.dto";
import { ArtistTrendingGenreReqDto } from "./dto/req/artist.trending-genre.req.dto";
import { ArtistUnfollowReqDto } from "./dto/req/artist.unfollow.req.dto";
import { DataArtistResDto } from "../data/dto/res/data.artist.res.dto";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";

export interface ArtistServiceInterface {
  follow(dto: ArtistFollowReqDto, sub: number): Promise<DataArtistResDto>;
  following(
    dto: ArtistFollowingReqDto,
    sub: number
  ): Promise<DataPaginationResDto<DataArtistResDto>>;
  profile(dto: ArtistByIdReqDto, id: number): Promise<DataArtistResDto>;
  trending(): Promise<DataPaginationResDto<DataArtistResDto>>;
  trendingGenre(
    dto: ArtistTrendingGenreReqDto
  ): Promise<DataPaginationResDto<DataArtistResDto>>;
  unfollow(dto: ArtistUnfollowReqDto, sub: number): Promise<DataArtistResDto>;
}
