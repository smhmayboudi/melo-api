import { Injectable } from "@nestjs/common";
import { RelationEntityType } from "./relation/type/relation.entity.type";
import { RelationType } from "./relation/type/relation.type";
import { DataSongResDto } from "./data/dto/res/data.song.res.dto";
import { RelationService } from "./relation/relation.service";
import { AppHashIdService } from "./app.hash-id.service";

@Injectable()
export class AppMixSongService {
  constructor(
    private readonly appHashIdService: AppHashIdService,
    private readonly relationService: RelationService
  ) {}

  public async mixSong(
    sub: number,
    songs: DataSongResDto[]
  ): Promise<DataSongResDto[]> {
    if (sub === 0) {
      return songs;
    }
    const relationMultiHasResDto = await this.relationService.multiHas({
      from: {
        id: sub.toString(),
        type: RelationEntityType.user
      },
      tos: songs.map(value => ({
        id: this.appHashIdService.decode(value.id).toString(),
        type: RelationEntityType.song
      })),
      relationType: RelationType.likedSongs
    });
    return songs.map(song => ({
      ...song,
      liked:
        relationMultiHasResDto.find(value => {
          value.to.id === this.appHashIdService.decode(song.id).toString();
        }) !== undefined
    }));
  }
}
