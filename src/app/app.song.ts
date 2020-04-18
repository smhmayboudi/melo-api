import { AppCheckLikeServiceInterface } from "./app.song.interface";
import { AppHashIdService } from "./app.hash-id.service";
import { DataSongResDto } from "../data/dto/res/data.song.res.dto";
import { Injectable } from "@nestjs/common";
import { RelationEntityType } from "../relation/relation.entity.type";
import { RelationService } from "../relation/relation.service";
import { RelationType } from "../relation/relation.type";

@Injectable()
export class AppCheckLikeService implements AppCheckLikeServiceInterface {
  constructor(
    private readonly appHashIdService: AppHashIdService,
    private readonly relationService: RelationService
  ) {}

  async like(songs: DataSongResDto[], sub: number): Promise<DataSongResDto[]> {
    const relationMultiHasResDto = await this.relationService.multiHas({
      from: {
        id: sub.toString(),
        type: RelationEntityType.user,
      },
      relationType: RelationType.likedSongs,
      tos: songs.map((value) => ({
        id: this.appHashIdService.decode(value.id).toString(),
        type: RelationEntityType.song,
      })),
    });
    return songs.map((value) => ({
      ...value,
      liked:
        relationMultiHasResDto.find(
          (value2) =>
            value2.to.id === this.appHashIdService.decode(value.id).toString()
        ) !== undefined,
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
