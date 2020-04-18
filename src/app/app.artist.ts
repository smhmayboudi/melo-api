import { AppArtistInterface } from "./app.artist.interface";
import { DataArtistResDto } from "../data/dto/res/data.artist.res.dto";
import { Injectable } from "@nestjs/common";
import { RelationEntityType } from "../relation/relation.entity.type";
import { RelationService } from "../relation/relation.service";
import { RelationType } from "../relation/relation.type";

@Injectable()
export class AppArtist implements AppArtistInterface {
  constructor(private readonly relationService: RelationService) {}

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
