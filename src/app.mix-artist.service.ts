import { Injectable } from "@nestjs/common";
import { RelationEntityType } from "./relation/type/relation.entity.type";
import { RelationType } from "./relation/type/relation.type";
import { RelationService } from "./relation/relation.service";
import { AppHashIdService } from "./app.hash-id.service";
import { DataArtistResDto } from "src/data/dto/res/data.artist.res.dto";

@Injectable()
export class AppMixArtistService {
  constructor(
    private readonly appHashIdService: AppHashIdService,
    private readonly relationService: RelationService
  ) {}

  public async mixArtist(
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
        relationMultiHasResDto.find(value => {
          value.to.id === this.appHashIdService.decode(artist.id).toString();
        }) !== undefined
    }));
  }
}
