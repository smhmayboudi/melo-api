import { Injectable } from "@nestjs/common";
import { AppMixArtistService } from "../app/app.mix-artist.service";
import { DataArtistService } from "../data/data.artist.service";
import { DataArtistResDto } from "../data/dto/res/data.artist.res.dto";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import {
  // PromInstanceCounter,
  PromMethodCounter
} from "../prom/prom.decorators";
import { RelationEntityType } from "../relation/relation.entity.type";
import { RelationService } from "../relation/relation.service";
import { RelationType } from "../relation/relation.type";
import { ArtistByIdReqDto } from "./dto/req/artist.by-id.req.dto";
import { ArtistFollowReqDto } from "./dto/req/artist.follow.req.dto";
import { ArtistFollowingReqDto } from "./dto/req/artist.following.req.dto";
import { ArtistTrendingGenreReqDto } from "./dto/req/artist.trending-genre.req.dto";
import { ArtistUnfollowReqDto } from "./dto/req/artist.unfollow.req.dto";

@Injectable()
// @PromInstanceCounter
export class ArtistService {
  constructor(
    private readonly artistMixArtistService: AppMixArtistService,
    private readonly dataArtistService: DataArtistService,
    private readonly relationService: RelationService
  ) {}

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
        type: RelationEntityType.user
      },
      to: {
        id: dataArtistResDto.id,
        type: RelationEntityType.artist
      },
      relationType: RelationType.follows
    });
    return dataArtistResDto;
  }

  @PromMethodCounter
  async following(
    dto: ArtistFollowingReqDto,
    id: number
  ): Promise<DataPaginationResDto<DataArtistResDto>> {
    const relationEntityResDto = await this.relationService.get({
      from: dto.from,
      fromEntityDto: {
        id: id.toString(),
        type: RelationEntityType.following
      },
      limit: dto.limit,
      relationType: RelationType.follows
    });
    return this.dataArtistService.byIds({
      ids: relationEntityResDto.results.map(value => value.id)
    });
  }

  @PromMethodCounter
  async profile(
    dto: ArtistByIdReqDto,
    id: number,
    sub: number
  ): Promise<DataArtistResDto> {
    const artistResDto = await this.dataArtistService.byId({ ...dto, id });
    const dataArtistResDto = await this.artistMixArtistService.mixArtist(sub, [
      artistResDto
    ]);
    return dataArtistResDto[0];
  }

  @PromMethodCounter
  async trending(sub: number): Promise<DataPaginationResDto<DataArtistResDto>> {
    const artistMixResDto = await this.dataArtistService.trending();
    const results = await this.artistMixArtistService.mixArtist(
      sub,
      artistMixResDto.results
    );
    return {
      results,
      total: results.length
    } as DataPaginationResDto<DataArtistResDto>;
  }

  @PromMethodCounter
  async trendingGenre(
    dto: ArtistTrendingGenreReqDto,
    sub: number
  ): Promise<DataPaginationResDto<DataArtistResDto>> {
    const artistMixResDto = await this.dataArtistService.trendingGenre({
      ...dto
    });
    const results = await this.artistMixArtistService.mixArtist(
      sub,
      artistMixResDto.results
    );
    return {
      results,
      total: results.length
    } as DataPaginationResDto<DataArtistResDto>;
  }

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
        type: RelationEntityType.user
      },
      to: {
        id: id.toString(),
        type: RelationEntityType.artist
      },
      relationType: RelationType.unfollows
    });
    return dataArtistResDto;
  }
}
