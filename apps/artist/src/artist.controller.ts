import {
  ARTIST_SERVICE_FOLLOW,
  ARTIST_SERVICE_FOLLOWING,
  ARTIST_SERVICE_PROFILE,
  ARTIST_SERVICE_TRENDING,
  ARTIST_SERVICE_TRENDING_GENRE,
  ARTIST_SERVICE_UNFOLLOW,
  ArtistFollowReqDto,
  ArtistFollowingReqDto,
  ArtistGetReqDto,
  ArtistResDto,
  ArtistTrendingGenreReqDto,
  ArtistTrendingReqDto,
  ArtistUnfollowReqDto,
} from "@melo/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

import { ArtistService } from "./artist.service";
import { Controller } from "@nestjs/common";

@Controller()
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @MessagePattern(ARTIST_SERVICE_FOLLOW)
  follow(@Payload() dto: ArtistFollowReqDto): Promise<ArtistResDto> {
    return this.artistService.follow(dto);
  }

  @MessagePattern(ARTIST_SERVICE_FOLLOWING)
  following(@Payload() dto: ArtistFollowingReqDto): Promise<ArtistResDto[]> {
    return this.artistService.following(dto);
  }

  @MessagePattern(ARTIST_SERVICE_PROFILE)
  profile(@Payload() dto: ArtistGetReqDto): Promise<ArtistResDto> {
    return this.artistService.profile(dto);
  }

  @MessagePattern(ARTIST_SERVICE_TRENDING)
  trending(dto: ArtistTrendingReqDto): Promise<ArtistResDto[]> {
    return this.artistService.trending(dto);
  }

  @MessagePattern(ARTIST_SERVICE_TRENDING_GENRE)
  trendingGenre(
    @Payload() dto: ArtistTrendingGenreReqDto
  ): Promise<ArtistResDto[]> {
    return this.artistService.trendingGenre(dto);
  }

  @MessagePattern(ARTIST_SERVICE_UNFOLLOW)
  unfollow(@Payload() dto: ArtistUnfollowReqDto): Promise<ArtistResDto> {
    return this.artistService.unfollow(dto);
  }
}
