import { Injectable } from "@nestjs/common";
import { RelationEntityType } from "./relation/type/relation.entity.type";
import { RelationType } from "./relation/type/relation.type";
import { SongMixResDto } from "./song/dto/res/song.mix.res.dto";
import { SongSongResDto } from "./song/dto/res/song.song.res.dto";
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
    songs: SongSongResDto[]
  ): Promise<SongMixResDto[]> {
    const relates = await this.relationService.multiHas({
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
        relates.find(value => {
          value.to.id === this.appHashIdService.decode(song.id).toString();
        }) !== undefined
    }));
  }
}
