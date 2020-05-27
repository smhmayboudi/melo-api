import { ApmAfterMethod, ApmBeforeMethod } from "@melo/apm";
import {
  AppSongLikeReqDto,
  AppSongLikesReqDto,
  AppSongLocalizeReqDto,
  RelationEntityType,
  RelationType,
  SongResDto,
} from "@melo/common";

import { AppSongServiceInterface } from "./app.song.service.interface";
import { Injectable } from "@nestjs/common";
import { PromMethodCounter } from "@melo/prom";
import { RelationService } from "../relation/relation.service";

@Injectable()
export class AppSongService implements AppSongServiceInterface {
  constructor(private readonly relationService: RelationService) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async like(dto: AppSongLikeReqDto): Promise<SongResDto> {
    const relation = await this.relationService.has({
      from: {
        id: dto.sub,
        type: RelationEntityType.user,
      },
      relationType: RelationType.likedSongs,
      to: {
        id: dto.song.id,
        type: RelationEntityType.song,
      },
    });
    return {
      ...dto.song,
      liked: relation,
    };
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async likes(dto: AppSongLikesReqDto): Promise<SongResDto[]> {
    const relations = await this.relationService.multiHas({
      from: {
        id: dto.sub,
        type: RelationEntityType.user,
      },
      relationType: RelationType.likedSongs,
      tos: dto.songs.map((value) => ({
        id: value.id,
        type: RelationEntityType.song,
      })),
    });
    return dto.songs.map((value) => ({
      ...value,
      liked:
        relations.find((value2) => value2.to.id === value.id) !== undefined,
    }));
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async localize(dto: AppSongLocalizeReqDto): Promise<SongResDto> {
    return Promise.resolve(
      dto.song.localized === true
        ? {
            ...dto.song,
            audio: undefined,
            lyrics: undefined,
          }
        : dto.song
    );
  }
}
