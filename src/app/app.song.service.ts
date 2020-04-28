import { ApmAfterMethod, ApmBeforeMethod } from "../apm/apm.decorator";

import { AppSongServiceInterface } from "./app.song.service.interface";
import { DataSongResDto } from "../data/dto/res/data.song.res.dto";
import { Injectable } from "@nestjs/common";
import { PromMethodCounter } from "../prom/prom.decorator";
import { RelationEntityResDto } from "../relation/dto/res/relation.entity.res.dto";
import { RelationEntityType } from "../relation/relation.entity.type";
import { RelationService } from "../relation/relation.service";
import { RelationType } from "../relation/relation.type";

@Injectable()
export class AppSongService implements AppSongServiceInterface {
  constructor(private readonly relationService: RelationService) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async like(songs: DataSongResDto[], sub: number): Promise<DataSongResDto[]> {
    const relationMultiHasResDto = await this.relationService.multiHas({
      from: {
        id: sub,
        type: RelationEntityType.user,
      },
      relationType: RelationType.likedSongs,
      tos: songs.map(
        (value) =>
          ({
            id: value.id,
            type: RelationEntityType.song,
          } as RelationEntityResDto)
      ),
    });
    return songs.map(
      (value) =>
        ({
          ...value,
          liked:
            relationMultiHasResDto.find(
              (value2) => value2.to.id === value.id
            ) !== undefined,
        } as DataSongResDto)
    );
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
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
