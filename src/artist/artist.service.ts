import { Injectable } from "@nestjs/common";
import { DataArtistService } from "../data/data.artist.service";
import { DataArtistResDto } from "../data/dto/res/data.artist.res.dto";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { RelationService } from "../relation/relation.service";
import { RelationEntityType } from "../relation/type/relation.entity.type";
import { RelationType } from "../relation/type/relation.type";
import { ArtistByIdReqDto } from "./dto/req/artist.by-id.req.dto";
import { ArtistFollowReqDto } from "./dto/req/artist.follow.req.dto";
import { ArtistFollowingReqDto } from "./dto/req/artist.following.req.dto";
import { ArtistTrendingGenreReqDto } from "./dto/req/artist.trending-genre.req.dto";
import { ArtistUnfollowReqDto } from "./dto/req/artist.unfollow.req.dto";

@Injectable()
export class ArtistService {
  constructor(
    private readonly dataArtistService: DataArtistService,
    private readonly relationService: RelationService
  ) {}

  // TODO: mixArtists
  async byId(dto: ArtistByIdReqDto, id: number): Promise<DataArtistResDto> {
    // const dataArtistResDto = await this.dataArtistService.byId(id);
    // const entityMultiHasDto = await this.relationService.multiHas({
    //   fromEntityDto: {
    //     id: sub,
    //     type: RelationEntityType.user
    //   },
    //   toEntityDtos: [
    //     {
    //       id,
    //       type: RelationEntityType.artist
    //     }
    //   ],
    //   relationType: RelationType.follows
    // });
    // dataArtistResDto.follownig = entityMultiHasDto !== undefined;
    // return dataArtistResDto;
    return this.dataArtistService.byId({ ...dto, id });
  }

  // TODO: mixArtists
  async follow(
    dto: ArtistFollowReqDto,
    id: number,
    sub: number
  ): Promise<DataArtistResDto> {
    // TODO: There is no need to mixArtists instead
    // TODO: artistDto.follownig = true;
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

  // TODO: mixArtists
  async trending(): Promise<DataPaginationResDto<DataArtistResDto>> {
    return this.dataArtistService.trending();
  }

  // TODO: mixArtists
  async trendingGenre(
    dto: ArtistTrendingGenreReqDto
  ): Promise<DataPaginationResDto<DataArtistResDto>> {
    return this.dataArtistService.trendingGenre({
      ...dto
    });
  }

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
