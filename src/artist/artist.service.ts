import { ApmAfterMethod, ApmBeforeMethod } from "../apm/apm.decorator";

import { ArtistByIdReqDto } from "./dto/req/artist.by-id.req.dto";
import { ArtistFollowReqDto } from "./dto/req/artist.follow.req.dto";
import { ArtistFollowingReqDto } from "./dto/req/artist.following.req.dto";
import { ArtistServiceInterface } from "./artist.servcie.interface";
import { ArtistTrendingGenreReqDto } from "./dto/req/artist.trending-genre.req.dto";
import { ArtistUnfollowReqDto } from "./dto/req/artist.unfollow.req.dto";
import { DataArtistResDto } from "../data/dto/res/data.artist.res.dto";
import { DataArtistService } from "../data/data.artist.service";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { Injectable } from "@nestjs/common";
import { PromMethodCounter } from "../prom/prom.decorator";
import { RelationEntityType } from "../relation/relation.entity.type";
import { RelationService } from "../relation/relation.service";
import { RelationType } from "../relation/relation.type";

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
  async follow(dto: ArtistFollowReqDto): Promise<DataArtistResDto> {
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
    const dataArtistResDto = await this.dataArtistService.byId(dto);
    return {
      ...dataArtistResDto,
      followersCount: dataArtistResDto.followersCount + 1,
      following: true,
    };
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async following(
    dto: ArtistFollowingReqDto
  ): Promise<DataPaginationResDto<DataArtistResDto>> {
    const relationEntityResDto = await this.relationService.get({
      from: dto.from,
      fromEntityDto: {
        id: dto.sub,
        type: RelationEntityType.following,
      },
      limit: dto.limit,
      relationType: RelationType.follows,
    });
    if (relationEntityResDto.results.length === 0) {
      return {
        results: [] as DataArtistResDto[],
        total: 0,
      } as DataPaginationResDto<DataArtistResDto>;
    }
    return this.dataArtistService.byIds({
      ids: relationEntityResDto.results.map((value) => value.id),
    });
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async profile(dto: ArtistByIdReqDto): Promise<DataArtistResDto> {
    return this.dataArtistService.byId(dto);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async trending(): Promise<DataPaginationResDto<DataArtistResDto>> {
    return this.dataArtistService.trending();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async trendingGenre(
    dto: ArtistTrendingGenreReqDto
  ): Promise<DataPaginationResDto<DataArtistResDto>> {
    return this.dataArtistService.trendingGenre({
      ...dto,
    });
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async unfollow(dto: ArtistUnfollowReqDto): Promise<DataArtistResDto> {
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
    const dataArtistResDto = await this.dataArtistService.byId(dto);
    return dataArtistResDto;
  }
}
