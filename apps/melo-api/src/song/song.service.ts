import { ApmAfterMethod, ApmBeforeMethod } from "@melo/apm";
import { BadRequestException, HttpService, Injectable } from "@nestjs/common";
import {
  RelationEdgeType,
  RelationEntityType,
  SongArtistSongsReqDto,
  SongArtistSongsTopReqDto,
  SongGetReqDto,
  SongLanguageReqDto,
  SongLikeReqDto,
  SongLikedReqDto,
  SongMoodReqDto,
  SongNewPodcastReqDto,
  SongNewReqDto,
  SongPodcastGenresReqDto,
  SongResDto,
  SongSendTelegramReqDto,
  SongSimilarReqDto,
  SongSliderReqDto,
  SongSongGenresReqDto,
  SongTopDayReqDto,
  SongTopWeekReqDto,
  SongUnlikeReqDto,
} from "@melo/common";

import { DataSongService } from "../data/data.song.service";
import { PromMethodCounter } from "@melo/prom";
import { RelationService } from "../relation/relation.service";
import { SongServiceInterface } from "./song.service.interface";
import { UserService } from "../user/user.service";
import { map } from "rxjs/operators";

@Injectable()
// @PromInstanceCounter
export class SongService implements SongServiceInterface {
  constructor(
    private readonly dataSongService: DataSongService,
    private readonly httpService: HttpService,
    private readonly relationService: RelationService,
    private readonly userService: UserService
  ) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async artistSongs(dto: SongArtistSongsReqDto): Promise<SongResDto[]> {
    return this.dataSongService.artistSongs(dto);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async artistSongsTop(dto: SongArtistSongsTopReqDto): Promise<SongResDto[]> {
    return this.dataSongService.artistSongsTop(dto);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async genre(dto: SongSongGenresReqDto): Promise<SongResDto[]> {
    return this.dataSongService.genre(dto);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async get(dto: SongGetReqDto): Promise<SongResDto> {
    return this.dataSongService.get(dto);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async language(dto: SongLanguageReqDto): Promise<SongResDto[]> {
    return this.dataSongService.language(dto);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async like(dto: SongLikeReqDto): Promise<SongResDto> {
    await this.relationService.set({
      createdAt: new Date(),
      from: {
        id: dto.sub,
        type: RelationEntityType.user,
      },
      to: {
        id: dto.id,
        type: RelationEntityType.song,
      },
      type: RelationEdgeType.likedSongs,
    });
    const song = await this.dataSongService.get(dto);
    return {
      ...song,
      liked: true,
    };
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async liked(dto: SongLikedReqDto): Promise<SongResDto[]> {
    const relations = await this.relationService.get({
      entity: {
        id: dto.sub,
        type: RelationEntityType.user,
      },
      from: dto.from,
      size: Math.min(dto.config.maxSize, dto.size),
      type: RelationEdgeType.likedSongs,
    });
    if (relations.length === 0) {
      return [];
    }
    return this.dataSongService.getByIds({
      ...dto,
      ids: relations.map((value) => value.to.id),
    });
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async mood(dto: SongMoodReqDto): Promise<SongResDto[]> {
    return this.dataSongService.mood(dto);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async newPodcast(dto: SongNewPodcastReqDto): Promise<SongResDto[]> {
    return this.dataSongService.newPodcast(dto);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async newSong(dto: SongNewReqDto): Promise<SongResDto[]> {
    return this.dataSongService.newSong(dto);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async podcast(dto: SongPodcastGenresReqDto): Promise<SongResDto[]> {
    return this.dataSongService.podcast(dto);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async sendTelegram(dto: SongSendTelegramReqDto): Promise<void> {
    const user = await this.userService.findOne({ id: dto.sub });
    if (user === undefined || user.telegram_id === undefined) {
      throw new BadRequestException();
    }
    await this.httpService
      .post<number>(dto.config.sendUrl, {
        callback_query: {
          data: `1:${dto.id},high,0`,
          from: {
            first_name: "",
            id: user.telegram_id,
            is_bot: false,
            language_code: "fa",
            user,
          },
          message: {
            chat: {
              first_name: "",
              id: user.telegram_id,
              type: "private",
              user,
            },
            date: Math.round(new Date().getTime() / 1000),
          },
        },
        update_id: 0,
      })
      .pipe(map((value) => value.data))
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async similar(dto: SongSimilarReqDto): Promise<SongResDto[]> {
    return this.dataSongService.similar(dto);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async slider(dto: SongSliderReqDto): Promise<SongResDto[]> {
    return this.dataSongService.slider(dto);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async topDay(dto: SongTopDayReqDto): Promise<SongResDto[]> {
    return this.dataSongService.topDay(dto);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async topWeek(dto: SongTopWeekReqDto): Promise<SongResDto[]> {
    return this.dataSongService.topWeek(dto);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async unlike(dto: SongUnlikeReqDto): Promise<SongResDto> {
    await this.relationService.remove({
      from: {
        id: dto.sub,
        type: RelationEntityType.user,
      },
      to: {
        id: dto.id,
        type: RelationEntityType.song,
      },
      type: RelationEdgeType.likedSongs,
    });
    const song = await this.dataSongService.get(dto);
    return {
      ...song,
      liked: false,
    };
  }
}
