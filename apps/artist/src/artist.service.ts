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
  DataPaginationResDto,
  RELATION_SERVICE,
  RELATION_SERVICE_GET,
  RELATION_SERVICE_REMOVE,
  RELATION_SERVICE_SET,
  RelationEntityReqDto,
  RelationEntityType,
  RelationGetReqDto,
  RelationRemoveReqDto,
  RelationSetReqDto,
  RelationType,
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
      .send<ArtistFollowReqDto, RelationSetReqDto>(RELATION_SERVICE_SET, {
        createdAt: new Date(),
        from: {
          id: dto.sub,
          type: RelationEntityType.user,
        },
        relationType: RelationType.follows,
        to: {
          id: dto.id,
          type: RelationEntityType.artist,
        },
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
  async following(
    dto: ArtistFollowingReqDto
  ): Promise<DataPaginationResDto<ArtistResDto>> {
    const relation = await this.clientProxyRelation
      .send<DataPaginationResDto<RelationEntityReqDto>, RelationGetReqDto>(
        RELATION_SERVICE_GET,
        {
          from: dto.from,
          fromEntityDto: {
            id: dto.sub,
            type: RelationEntityType.following,
          },
          relationType: RelationType.follows,
          size: Math.min(dto.config.maxSize, dto.size),
        }
      )
      .toPromise();
    if (relation.results.length === 0) {
      return {
        results: [] as ArtistResDto[],
        total: 0,
      } as DataPaginationResDto<ArtistResDto>;
    }
    return this.clientProxyData
      .send<DataPaginationResDto<ArtistResDto>, ArtistGetByIdsReqDto>(
        DATA_ARTIST_SERVICE_GET_BY_IDS,
        {
          ...dto,
          ids: relation.results.map((value) => value.id),
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
  async trending(
    dto: ArtistTrendingReqDto
  ): Promise<DataPaginationResDto<ArtistResDto>> {
    return this.clientProxyData
      .send<DataPaginationResDto<ArtistResDto>, ArtistTrendingReqDto>(
        DATA_ARTIST_SERVICE_TRENDING,
        dto
      )
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async trendingGenre(
    dto: ArtistTrendingGenreReqDto
  ): Promise<DataPaginationResDto<ArtistResDto>> {
    return this.clientProxyData
      .send<DataPaginationResDto<ArtistResDto>, ArtistTrendingGenreReqDto>(
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
      .send<boolean, RelationRemoveReqDto>(RELATION_SERVICE_REMOVE, {
        from: {
          id: dto.sub,
          type: RelationEntityType.user,
        },
        relationType: RelationType.unfollows,
        to: {
          id: dto.id,
          type: RelationEntityType.artist,
        },
      })
      .toPromise();
    return this.clientProxyData
      .send<ArtistResDto, ArtistUnfollowReqDto>(DATA_ARTIST_SERVICE_GET, dto)
      .toPromise();
  }
}
