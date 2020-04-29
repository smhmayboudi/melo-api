import { ApmAfterMethod, ApmBeforeMethod } from "../apm/apm.decorator";

import { AppArtistServceInterface } from "./app.artist.service.interface";
import { DataArtistResDto } from "../data/dto/res/data.artist.res.dto";
import { Injectable } from "@nestjs/common";
import { PromMethodCounter } from "../prom/prom.decorator";
import { RelationEntityType } from "../relation/relation.entity.type";
import { RelationService } from "../relation/relation.service";
import { RelationType } from "../relation/relation.type";

@Injectable()
export class AppArtistService implements AppArtistServceInterface {
  constructor(private readonly relationService: RelationService) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async follow(
    artist: DataArtistResDto,
    sub: number
  ): Promise<DataArtistResDto> {
    const relationMultiResDto = await this.relationService.has({
      from: {
        id: sub,
        type: RelationEntityType.user,
      },
      relationType: RelationType.follows,
      to: {
        id: artist.id,
        type: RelationEntityType.artist,
      },
    });
    return {
      ...artist,
      following: relationMultiResDto,
    };
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async follows(
    artists: DataArtistResDto[],
    sub: number
  ): Promise<DataArtistResDto[]> {
    if (artists.length === 0) {
      return [];
    }
    const relationMultiHasResDto = await this.relationService.multiHas({
      from: {
        id: sub,
        type: RelationEntityType.user,
      },
      relationType: RelationType.follows,
      tos: artists.map((value) => ({
        id: value.id,
        type: RelationEntityType.artist,
      })),
    });
    return artists.map((value) => ({
      ...value,
      following:
        relationMultiHasResDto.find((value2) => value2.to.id === value.id) !==
        undefined,
    }));
  }
}
