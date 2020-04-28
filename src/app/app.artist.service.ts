import { ApmAfterMethod, ApmBeforeMethod } from "../apm/apm.decorator";

import { AppArtistServceInterface } from "./app.artist.service.interface";
import { DataArtistResDto } from "../data/dto/res/data.artist.res.dto";
import { Injectable } from "@nestjs/common";
import { PromMethodCounter } from "../prom/prom.decorator";
import { RelationEntityResDto } from "../relation/dto/res/relation.entity.res.dto";
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
      tos: artists.map(
        (value) =>
          ({
            id: value.id,
            type: RelationEntityType.artist,
          } as RelationEntityResDto)
      ),
    });
    return artists.map(
      (value) =>
        ({
          ...value,
          following:
            relationMultiHasResDto.find(
              (value2) => value2.to.id === value.id
            ) !== undefined,
        } as DataArtistResDto)
    );
  }
}
