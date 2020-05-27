import { ApmAfterMethod, ApmBeforeMethod } from "@melo/apm";
import { BadRequestException, HttpService, Injectable } from "@nestjs/common";
import {
  DataPaginationResDto,
  RelationEntityType,
  RelationType,
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
  async artistSongs(
    dto: SongArtistSongsReqDto
  ): Promise<DataPaginationResDto<SongResDto>> {
    return this.dataSongService.artistSongs(dto);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async artistSongsTop(
    dto: SongArtistSongsTopReqDto
  ): Promise<DataPaginationResDto<SongResDto>> {
    return this.dataSongService.artistSongsTop(dto);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async genre(
    dto: SongSongGenresReqDto
  ): Promise<DataPaginationResDto<SongResDto>> {
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
  async language(
    dto: SongLanguageReqDto
  ): Promise<DataPaginationResDto<SongResDto>> {
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
      relationType: RelationType.likedSongs,
      to: {
        id: dto.id,
        type: RelationEntityType.song,
      },
    });
    const song = await this.dataSongService.get(dto);
    return { ...song, liked: true };
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async liked(dto: SongLikedReqDto): Promise<DataPaginationResDto<SongResDto>> {
    const relation = await this.relationService.get({
      from: dto.from,
      fromEntityDto: {
        id: dto.sub,
        type: RelationEntityType.user,
      },
      relationType: RelationType.likedSongs,
      size: Math.min(dto.config.maxSize, dto.size),
    });
    if (relation.results.length === 0) {
      return {
        results: [] as SongResDto[],
        total: 0,
      } as DataPaginationResDto<SongResDto>;
    }
    return this.dataSongService.getByIds({
      ...dto,
      ids: relation.results.map((value) => value.id),
    });
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async mood(dto: SongMoodReqDto): Promise<DataPaginationResDto<SongResDto>> {
    return this.dataSongService.mood(dto);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async newPodcast(
    dto: SongNewPodcastReqDto
  ): Promise<DataPaginationResDto<SongResDto>> {
    return this.dataSongService.newPodcast(dto);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async newSong(dto: SongNewReqDto): Promise<DataPaginationResDto<SongResDto>> {
    return this.dataSongService.newSong(dto);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async podcast(
    dto: SongPodcastGenresReqDto
  ): Promise<DataPaginationResDto<SongResDto>> {
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
      .post<number>(dto.config.url, {
        callback_query: {
          data: `1:${dto.id},high,0`,
          from: {
            first_name: "",
            id: user.telegram_id,
            is_bot: false,
            language_code: "fa",
            username: undefined,
          },
          message: {
            chat: {
              first_name: "",
              id: user.telegram_id,
              type: "private",
              username: undefined,
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
  async similar(
    dto: SongSimilarReqDto
  ): Promise<DataPaginationResDto<SongResDto>> {
    return this.dataSongService.similar(dto);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async slider(
    dto: SongSliderReqDto
  ): Promise<DataPaginationResDto<SongResDto>> {
    return this.dataSongService.slider(dto);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async topDay(
    dto: SongTopDayReqDto
  ): Promise<DataPaginationResDto<SongResDto>> {
    return this.dataSongService.topDay(dto);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async topWeek(
    dto: SongTopWeekReqDto
  ): Promise<DataPaginationResDto<SongResDto>> {
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
      relationType: RelationType.likedSongs,
      to: {
        id: dto.id,
        type: RelationEntityType.song,
      },
    });
    const song = await this.dataSongService.get(dto);
    return {
      ...song,
      liked: false,
    };
  }
}
