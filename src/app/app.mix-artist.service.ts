import { Injectable } from "@nestjs/common";
import { DataArtistResDto } from "../data/dto/res/data.artist.res.dto";
import { RelationEntityType } from "../relation/relation.entity.type";
import { RelationService } from "../relation/relation.service";
import { RelationType } from "../relation/relation.type";
import { AppHashIdService } from "./app.hash-id.service";
import { AppMixArtistServiceInterface } from "./app.mix-artist.service.interface";

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
      tos: artists.map(value => ({
        id: this.appHashIdService.decode(value.id).toString(),
        type: RelationEntityType.artist
      })),
      relationType: RelationType.follows
    });
    return artists.map(artist => ({
      ...artist,
      following:
        relationMultiHasResDto.find(
          value =>
            value.to.id === this.appHashIdService.decode(artist.id).toString()
        ) !== undefined
    }));
  }
}
