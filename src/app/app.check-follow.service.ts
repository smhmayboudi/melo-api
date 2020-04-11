import { AppCheckFollowServiceInterface } from "./app.check-follow.service.interface";
import { AppHashIdService } from "./app.hash-id.service";
import { DataArtistResDto } from "../data/dto/res/data.artist.res.dto";
import { Injectable } from "@nestjs/common";
import { RelationEntityType } from "../relation/relation.entity.type";
import { RelationService } from "../relation/relation.service";
import { RelationType } from "../relation/relation.type";

@Injectable()
export class AppCheckFollowService implements AppCheckFollowServiceInterface {
  constructor(
    private readonly appHashIdService: AppHashIdService,
    private readonly relationService: RelationService
  ) {}

  async follow(
    artists: DataArtistResDto[],
    sub: number
  ): Promise<DataArtistResDto[]> {
    const relationMultiHasResDto = await this.relationService.multiHas({
      from: {
        id: sub.toString(),
        type: RelationEntityType.user,
      },
      relationType: RelationType.follows,
      tos: artists.map((value) => ({
        id: this.appHashIdService.decode(value.id).toString(),
        type: RelationEntityType.artist,
      })),
    });
    return artists.map((value) => ({
      ...value,
      following:
        relationMultiHasResDto.find(
          (value2) =>
            value2.to.id === this.appHashIdService.decode(value.id).toString()
        ) !== undefined,
    }));
  }
}
