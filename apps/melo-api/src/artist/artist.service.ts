import {
  ARTIST_SERVICE,
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

import { ApmAfterMethod, ApmBeforeMethod } from "@melo/apm";
import { Inject, Injectable } from "@nestjs/common";
import { ArtistServiceInterface } from "./artist.service.interface";
import { ClientProxy } from "@nestjs/microservices";
import { PromMethodCounter } from "@melo/prom";

@Injectable()
// @PromInstanceCounter
export class ArtistService implements ArtistServiceInterface {
  constructor(
    @Inject(ARTIST_SERVICE) private readonly artistClientProxy: ClientProxy
  ) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async follow(dto: ArtistFollowReqDto): Promise<ArtistResDto> {
    return this.artistClientProxy
      .send<ArtistResDto, ArtistFollowReqDto>(ARTIST_SERVICE_FOLLOW, dto)
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async following(dto: ArtistFollowingReqDto): Promise<ArtistResDto[]> {
    return this.artistClientProxy
      .send<ArtistResDto[], ArtistFollowingReqDto>(
        ARTIST_SERVICE_FOLLOWING,
        dto
      )
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async profile(dto: ArtistGetReqDto): Promise<ArtistResDto> {
    return this.artistClientProxy
      .send<ArtistResDto, ArtistGetReqDto>(ARTIST_SERVICE_PROFILE, dto)
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async trending(dto: ArtistTrendingReqDto): Promise<ArtistResDto[]> {
    return this.artistClientProxy
      .send<ArtistResDto[], ArtistTrendingReqDto>(ARTIST_SERVICE_TRENDING, dto)
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async trendingGenre(dto: ArtistTrendingGenreReqDto): Promise<ArtistResDto[]> {
    return this.artistClientProxy
      .send<ArtistResDto[], ArtistTrendingGenreReqDto>(
        ARTIST_SERVICE_TRENDING_GENRE,
        dto
      )
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async unfollow(dto: ArtistUnfollowReqDto): Promise<ArtistResDto> {
    return this.artistClientProxy
      .send<ArtistResDto, ArtistUnfollowReqDto>(ARTIST_SERVICE_UNFOLLOW, dto)
      .toPromise();
  }
}
