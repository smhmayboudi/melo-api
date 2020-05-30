import { ApmAfterMethod, ApmBeforeMethod } from "@melo/apm";
import {
  ArtistFollowReqDto,
  ArtistFollowingReqDto,
  ArtistGetReqDto,
  ArtistResDto,
  ArtistTrendingGenreReqDto,
  ArtistTrendingReqDto,
  ArtistUnfollowReqDto,
  RelationEdgeType,
  RelationEntityType,
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
      to: {
        id: dto.id,
        type: RelationEntityType.artist,
      },
      type: RelationEdgeType.follows,
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
  async following(dto: ArtistFollowingReqDto): Promise<ArtistResDto[]> {
    const relations = await this.relationService.get({
      entity: {
        id: dto.sub,
        type: RelationEntityType.user,
      },
      from: dto.from,
      size: Math.min(dto.config.maxSize, dto.size),
      type: RelationEdgeType.follows,
    });
    if (relations.length === 0) {
      return [];
    }
    return this.dataArtistService.getByIds({
      ...dto,
      ids: relations.map((value) => value.to.id),
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
  async trending(dto: ArtistTrendingReqDto): Promise<ArtistResDto[]> {
    return this.dataArtistService.trending(dto);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async trendingGenre(dto: ArtistTrendingGenreReqDto): Promise<ArtistResDto[]> {
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
      to: {
        id: dto.id,
        type: RelationEntityType.artist,
      },
      type: RelationEdgeType.follows,
    });
    const artist = await this.dataArtistService.get(dto);
    return {
      ...artist,
      followersCount: artist.followersCount - 1,
      following: false,
    };
  }
}
