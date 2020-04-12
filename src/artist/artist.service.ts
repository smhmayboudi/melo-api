import { ApmAfterMethod, ApmBeforeMethod } from "../apm/apm.decorator";

// import { AppArtist } from "../app/app.mix-artist.service";
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
    // private readonly appCheckFollowService: AppArtist,
    private readonly dataArtistService: DataArtistService,
    private readonly relationService: RelationService
  ) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async follow(
    dto: ArtistFollowReqDto,
    id: number,
    sub: number
  ): Promise<DataArtistResDto> {
    const dataArtistResDto = await this.dataArtistService.byId({ ...dto, id });
    await this.relationService.set({
      createdAt: new Date(),
      from: {
        id: sub.toString(),
        type: RelationEntityType.user,
      },
      relationType: RelationType.follows,
      to: {
        id: dataArtistResDto.id,
        type: RelationEntityType.artist,
      },
    });
    return dataArtistResDto;
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async following(
    dto: ArtistFollowingReqDto,
    id: number
  ): Promise<DataPaginationResDto<DataArtistResDto>> {
    const relationEntityResDto = await this.relationService.get({
      from: dto.from,
      fromEntityDto: {
        id: id.toString(),
        type: RelationEntityType.following,
      },
      limit: dto.limit,
      relationType: RelationType.follows,
    });
    // TODO: external service should change
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
  async profile(dto: ArtistByIdReqDto, id: number): Promise<DataArtistResDto> {
    return this.dataArtistService.byId({ ...dto, id });
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
  async unfollow(
    dto: ArtistUnfollowReqDto,
    id: number,
    sub: number
  ): Promise<DataArtistResDto> {
    const dataArtistResDto = await this.dataArtistService.byId({ ...dto, id });
    await this.relationService.remove({
      from: {
        id: sub.toString(),
        type: RelationEntityType.user,
      },
      relationType: RelationType.unfollows,
      to: {
        id: id.toString(),
        type: RelationEntityType.artist,
      },
    });
    return dataArtistResDto;
  }
}
