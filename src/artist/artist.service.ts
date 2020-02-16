import { CounterMetric, InjectCounterMetric } from "@digikare/nestjs-prom";
import { Injectable } from "@nestjs/common";
import { AppMixArtistService } from "../app/app.mix-artist.service";
import { DataArtistService } from "../data/data.artist.service";
import { DataArtistResDto } from "../data/dto/res/data.artist.res.dto";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { RelationEntityType } from "../relation/relation.entity.type";
import { RelationService } from "../relation/relation.service";
import { RelationType } from "../relation/relation.type";
import { ArtistModule } from "./artist.module";
import { ArtistByIdReqDto } from "./dto/req/artist.by-id.req.dto";
import { ArtistFollowReqDto } from "./dto/req/artist.follow.req.dto";
import { ArtistFollowingReqDto } from "./dto/req/artist.following.req.dto";
import { ArtistTrendingGenreReqDto } from "./dto/req/artist.trending-genre.req.dto";
import { ArtistUnfollowReqDto } from "./dto/req/artist.unfollow.req.dto";

@Injectable()
export class ArtistService {
  constructor(
    private readonly artistMixArtistService: AppMixArtistService,
    @InjectCounterMetric("artist_counter")
    private readonly counterMetric: CounterMetric,
    private readonly dataArtistService: DataArtistService,
    private readonly relationService: RelationService
  ) {}

  async follow(
    dto: ArtistFollowReqDto,
    id: number,
    sub: number
  ): Promise<DataArtistResDto> {
    this.counterMetric.inc({
      module: ArtistModule.name,
      service: ArtistService.name,
      function: this.follow.name
    });
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

  async following(
    dto: ArtistFollowingReqDto,
    id: number
  ): Promise<DataPaginationResDto<DataArtistResDto>> {
    this.counterMetric.inc({
      module: ArtistModule.name,
      service: ArtistService.name,
      function: this.following.name
    });
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

  async profile(
    dto: ArtistByIdReqDto,
    id: number,
    sub: number
  ): Promise<DataArtistResDto> {
    this.counterMetric.inc({
      module: ArtistModule.name,
      service: ArtistService.name,
      function: this.profile.name
    });
    const artistResDto = await this.dataArtistService.byId({ ...dto, id });
    const dataArtistResDto = await this.artistMixArtistService.mixArtist(sub, [
      artistResDto
    ]);
    return dataArtistResDto[0];
  }

  async trending(sub: number): Promise<DataPaginationResDto<DataArtistResDto>> {
    this.counterMetric.inc({
      module: ArtistModule.name,
      service: ArtistService.name,
      function: this.trending.name
    });
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

  async trendingGenre(
    dto: ArtistTrendingGenreReqDto,
    sub: number
  ): Promise<DataPaginationResDto<DataArtistResDto>> {
    this.counterMetric.inc({
      module: ArtistModule.name,
      service: ArtistService.name,
      function: this.trendingGenre.name
    });
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

  async unfollow(
    dto: ArtistUnfollowReqDto,
    id: number,
    sub: number
  ): Promise<DataArtistResDto> {
    this.counterMetric.inc({
      module: ArtistModule.name,
      service: ArtistService.name,
      function: this.unfollow.name
    });
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
