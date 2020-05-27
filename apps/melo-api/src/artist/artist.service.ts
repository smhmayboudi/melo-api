import { ApmAfterMethod, ApmBeforeMethod } from "@melo/apm";
import {
  ArtistFollowReqDto,
  ArtistFollowingReqDto,
  ArtistGetReqDto,
  ArtistResDto,
  ArtistTrendingGenreReqDto,
  ArtistTrendingReqDto,
  ArtistUnfollowReqDto,
  DataPaginationResDto,
  RelationEntityType,
  RelationType,
} from "@melo/common";

import { ArtistServiceInterface } from "./artist.service.interface";
import { DataArtistService } from "../data/data.artist.service";
import { Injectable } from "@nestjs/common";
import { PromMethodCounter } from "@melo/prom";
import { RelationService } from "../relation/relation.service";

@Injectable()
// @PromInstanceCounter
export class ArtistService implements ArtistServiceInterface {
  constructor(
    private readonly dataArtistService: DataArtistService,
    private readonly relationService: RelationService
  ) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async follow(dto: ArtistFollowReqDto): Promise<ArtistResDto> {
    await this.relationService.set({
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
    });
    const artist = await this.dataArtistService.get(dto);
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
    const relation = await this.relationService.get({
      from: dto.from,
      fromEntityDto: {
        id: dto.sub,
        type: RelationEntityType.following,
      },
      relationType: RelationType.follows,
      size: Math.min(dto.config.maxSize, dto.size),
    });
    if (relation.results.length === 0) {
      return {
        results: [] as ArtistResDto[],
        total: 0,
      } as DataPaginationResDto<ArtistResDto>;
    }
    return this.dataArtistService.getByIds({
      ...dto,
      ids: relation.results.map((value) => value.id),
    });
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async profile(dto: ArtistGetReqDto): Promise<ArtistResDto> {
    return this.dataArtistService.get(dto);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async trending(
    dto: ArtistTrendingReqDto
  ): Promise<DataPaginationResDto<ArtistResDto>> {
    return this.dataArtistService.trending(dto);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async trendingGenre(
    dto: ArtistTrendingGenreReqDto
  ): Promise<DataPaginationResDto<ArtistResDto>> {
    return this.dataArtistService.trendingGenre(dto);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async unfollow(dto: ArtistUnfollowReqDto): Promise<ArtistResDto> {
    await this.relationService.remove({
      from: {
        id: dto.sub,
        type: RelationEntityType.user,
      },
      relationType: RelationType.unfollows,
      to: {
        id: dto.id,
        type: RelationEntityType.artist,
      },
    });
    return this.dataArtistService.get(dto);
  }
}
