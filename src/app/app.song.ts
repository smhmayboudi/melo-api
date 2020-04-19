import { AppSongInterface } from "./app.song.interface";
import { DataSongResDto } from "../data/dto/res/data.song.res.dto";
import { Injectable } from "@nestjs/common";
import { RelationEntityType } from "../relation/relation.entity.type";
import { RelationService } from "../relation/relation.service";
import { RelationType } from "../relation/relation.type";

@Injectable()
export class AppSong implements AppSongInterface {
  constructor(private readonly relationService: RelationService) {}

  async like(songs: DataSongResDto[], sub: number): Promise<DataSongResDto[]> {
    const relationMultiHasResDto = await this.relationService.multiHas({
      from: {
        id: sub,
        type: RelationEntityType.user,
      },
      relationType: RelationType.likedSongs,
      tos: songs.map((value) => ({
        id: value.id,
        type: RelationEntityType.song,
      })),
    });
    return songs.map((value) => ({
      ...value,
      liked:
        relationMultiHasResDto.find((value2) => value2.to.id === value.id) !==
        undefined,
    }));
  }

  localize(songs: DataSongResDto[]): DataSongResDto[] {
    return songs.map((value) =>
      value.localized === true
        ? {
            ...value,
            audio: undefined,
            lyrics: undefined,
          }
        : value
    );
  }
}
