import { AppHashIdService } from "./app.hash-id.service";
import { AppMixArtistServiceInterface } from "./app.mix-artist.service.interface";
import { DataArtistResDto } from "../data/dto/res/data.artist.res.dto";
import { Injectable } from "@nestjs/common";
import { RelationEntityType } from "../relation/relation.entity.type";
import { RelationService } from "../relation/relation.service";
import { RelationType } from "../relation/relation.type";

@Injectable()
export class AppMixArtistService implements AppMixArtistServiceInterface {
  constructor(
    private readonly appHashIdService: AppHashIdService,
    private readonly relationService: RelationService
  ) {}

  async mixArtist(
    sub: number,
    artists: DataArtistResDto[]
  ): Promise<DataArtistResDto[]> {
    if (sub === 0) {
      return artists;
    }
    const relationMultiHasResDto = await this.relationService.multiHas({
      from: {
        id: sub.toString(),
        type: RelationEntityType.user
      },
      relationType: RelationType.follows,
      tos: artists.map(value => ({
        id: this.appHashIdService.decode(value.id).toString(),
        type: RelationEntityType.artist
      }))
    });
    return artists.map(value => ({
      ...value,
      following:
        relationMultiHasResDto.find(
          value2 =>
            value2.to.id === this.appHashIdService.decode(value.id).toString()
        ) !== undefined
    }));
  }
}
