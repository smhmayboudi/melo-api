import { ApmAfterMethod, ApmBeforeMethod } from "@melo/apm";
import {
  ArtistFollowReqDto,
  ArtistFollowingReqDto,
  ArtistGetByIdsReqDto,
  ArtistGetReqDto,
  ArtistResDto,
  ArtistTrendingGenreReqDto,
  ArtistTrendingReqDto,
  ArtistUnfollowReqDto,
  DATA_ARTIST_SERVICE_GET,
  DATA_ARTIST_SERVICE_GET_BY_IDS,
  DATA_ARTIST_SERVICE_TRENDING,
  DATA_ARTIST_SERVICE_TRENDING_GENRE,
  DATA_SERVICE,
  RELATION_SERVICE,
  RELATION_SERVICE_GET,
  RELATION_SERVICE_REMOVE,
  RELATION_SERVICE_SET,
  RelationEdgeType,
  RelationEntityType,
  RelationGetReqDto,
  RelationRemoveReqDto,
  RelationResDto,
  RelationSetReqDto,
} from "@melo/common";
import { Inject, Injectable } from "@nestjs/common";

import { ArtistServiceInterface } from "./artist.service.interface";
import { ClientProxy } from "@nestjs/microservices";
import { PromMethodCounter } from "@melo/prom";

@Injectable()
// @PromInstanceCounter
export class ArtistService implements ArtistServiceInterface {
  constructor(
    @Inject(DATA_SERVICE) private readonly clientProxyData: ClientProxy,
    @Inject(RELATION_SERVICE) private readonly clientProxyRelation: ClientProxy
  ) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async follow(dto: ArtistFollowReqDto): Promise<ArtistResDto> {
    await this.clientProxyRelation
      .send<RelationResDto, RelationSetReqDto>(RELATION_SERVICE_SET, {
        createdAt: new Date(),
        from: {
          id: dto.sub,
          type: RelationEntityType.user,
        },
        to: {
          id: dto.id,
          type: RelationEntityType.artist,
        },
        type: RelationEdgeType.follows,
      })
      .toPromise();
    const artist = await this.clientProxyData
      .send<ArtistResDto, ArtistFollowReqDto>(DATA_ARTIST_SERVICE_GET, dto)
      .toPromise();
    return {
      ...artist,
      followersCount: artist.followersCount + 1,
      following: true,
    };
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async following(dto: ArtistFollowingReqDto): Promise<ArtistResDto[]> {
    const relations = await this.clientProxyRelation
      .send<RelationResDto[], RelationGetReqDto>(RELATION_SERVICE_GET, {
        entity: {
          id: dto.sub,
          type: RelationEntityType.user,
        },
        from: dto.from,
        size: Math.min(dto.config.maxSize, dto.size),
        type: RelationEdgeType.follows,
      })
      .toPromise();
    if (relations.length === 0) {
      return [];
    }
    return this.clientProxyData
      .send<ArtistResDto[], ArtistGetByIdsReqDto>(
        DATA_ARTIST_SERVICE_GET_BY_IDS,
        {
          ...dto,
          ids: relations.map((value) => value.to.id),
        }
      )
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async profile(dto: ArtistGetReqDto): Promise<ArtistResDto> {
    return this.clientProxyData
      .send<ArtistResDto, ArtistGetReqDto>(DATA_ARTIST_SERVICE_GET, dto)
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async trending(dto: ArtistTrendingReqDto): Promise<ArtistResDto[]> {
    return this.clientProxyData
      .send<ArtistResDto[], ArtistTrendingReqDto>(
        DATA_ARTIST_SERVICE_TRENDING,
        dto
      )
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async trendingGenre(dto: ArtistTrendingGenreReqDto): Promise<ArtistResDto[]> {
    return this.clientProxyData
      .send<ArtistResDto[], ArtistTrendingGenreReqDto>(
        DATA_ARTIST_SERVICE_TRENDING_GENRE,
        dto
      )
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async unfollow(dto: ArtistUnfollowReqDto): Promise<ArtistResDto> {
    await this.clientProxyRelation
      .send<RelationResDto, RelationRemoveReqDto>(RELATION_SERVICE_REMOVE, {
        from: {
          id: dto.sub,
          type: RelationEntityType.user,
        },
        to: {
          id: dto.id,
          type: RelationEntityType.artist,
        },
        type: RelationEdgeType.follows,
      })
      .toPromise();
    return this.clientProxyData
      .send<ArtistResDto, ArtistUnfollowReqDto>(DATA_ARTIST_SERVICE_GET, dto)
      .toPromise();
  }
}
