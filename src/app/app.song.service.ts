import { ApmAfterMethod, ApmBeforeMethod } from "../apm/apm.decorator";

import { AppSongServiceInterface } from "./app.song.service.interface";
import { DataSongResDto } from "../data/dto/res/data.song.res.dto";
import { Injectable } from "@nestjs/common";
import { PromMethodCounter } from "../prom/prom.decorator";
import { RelationEntityType } from "../relation/relation.entity.type";
import { RelationService } from "../relation/relation.service";
import { RelationType } from "../relation/relation.type";

@Injectable()
export class AppSongService implements AppSongServiceInterface {
  constructor(private readonly relationService: RelationService) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async like(song: DataSongResDto, sub: number): Promise<DataSongResDto> {
    const relationHasResDto = await this.relationService.has({
      from: {
        id: sub,
        type: RelationEntityType.user,
      },
      relationType: RelationType.likedSongs,
      to: {
        id: song.id,
        type: RelationEntityType.song,
      },
    });
    return {
      ...song,
      liked: relationHasResDto,
    };
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async likes(songs: DataSongResDto[], sub: number): Promise<DataSongResDto[]> {
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

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  localize(value: DataSongResDto): DataSongResDto {
    return value.localized === true
      ? {
          ...value,
          audio: undefined,
          lyrics: undefined,
        }
      : value;
  }
}
