import { ApmAfterMethod, ApmBeforeMethod } from "@melo/apm";
import {
  AppArtistFollowReqDto,
  AppArtistFollowsReqDto,
  ArtistResDto,
  RelationEntityType,
  RelationType,
} from "@melo/common";

import { AppArtistServiceInterface } from "./app.artist.service.interface";
import { Injectable } from "@nestjs/common";
import { PromMethodCounter } from "@melo/prom";
import { RelationService } from "../relation/relation.service";

@Injectable()
export class AppArtistService implements AppArtistServiceInterface {
  constructor(private readonly relationService: RelationService) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async follow(dto: AppArtistFollowReqDto): Promise<ArtistResDto> {
    const relation = await this.relationService.has({
      from: {
        id: dto.sub,
        type: RelationEntityType.user,
      },
      relationType: RelationType.follows,
      to: {
        id: dto.artist.id,
        type: RelationEntityType.artist,
      },
    });
    return {
      ...dto.artist,
      following: relation,
    };
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async follows(dto: AppArtistFollowsReqDto): Promise<ArtistResDto[]> {
    if (dto.artists.length === 0) {
      return [];
    }
    const relations = await this.relationService.multiHas({
      from: {
        id: dto.sub,
        type: RelationEntityType.user,
      },
      relationType: RelationType.follows,
      tos: dto.artists.map((value) => ({
        id: value.id,
        type: RelationEntityType.artist,
      })),
    });
    return dto.artists.map((value) => ({
      ...value,
      following:
        relations.find((value2) => value2.to.id === value.id) !== undefined,
    }));
  }
}
