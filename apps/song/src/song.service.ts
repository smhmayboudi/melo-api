import { ApmAfterMethod, ApmBeforeMethod } from "@melo/apm";
import {
  BadRequestException,
  HttpService,
  Inject,
  Injectable,
} from "@nestjs/common";
import {
  DATA_SERVICE,
  DATA_SONG_SERVICE_ARTIST_SONGS,
  DATA_SONG_SERVICE_ARTIST_SONGS_TOP,
  DATA_SONG_SERVICE_GENRE,
  DATA_SONG_SERVICE_GET,
  DATA_SONG_SERVICE_GET_BY_IDS,
  DATA_SONG_SERVICE_LANGUAGE,
  DATA_SONG_SERVICE_MOOD,
  DATA_SONG_SERVICE_NEW_PODCAST,
  DATA_SONG_SERVICE_NEW_SONG,
  DATA_SONG_SERVICE_PODCAST,
  DATA_SONG_SERVICE_SIMILAR,
  DATA_SONG_SERVICE_SLIDER,
  DATA_SONG_SERVICE_TOP_DAY,
  DATA_SONG_SERVICE_TOP_WEEK,
  DataPaginationResDto,
  RELATION_SERVICE,
  RELATION_SERVICE_GET,
  RELATION_SERVICE_REMOVE,
  RELATION_SERVICE_SET,
  RelationEntityReqDto,
  RelationEntityType,
  RelationGetReqDto,
  RelationRemoveReqDto,
  RelationSetReqDto,
  RelationType,
  SongArtistSongsReqDto,
  SongArtistSongsTopReqDto,
  SongArtistsReqDto,
  SongGetByIdsReqDto,
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
  USER_SERVICE,
  USER_SERVICE_FIND_ONE,
  UserFindOneReqDto,
  UserResDto,
} from "@melo/common";

import { ClientProxy } from "@nestjs/microservices";
import { PromMethodCounter } from "@melo/prom";
import { SongServiceInterface } from "./song.service.interface";
import { map } from "rxjs/operators";

@Injectable()
// @PromInstanceCounter
export class SongService implements SongServiceInterface {
  constructor(
    @Inject(DATA_SERVICE) private readonly clientProxyData: ClientProxy,
    @Inject(RELATION_SERVICE) private readonly clientProxyRelation: ClientProxy,
    @Inject(USER_SERVICE) private readonly clientProxyUser: ClientProxy,
    private readonly httpService: HttpService
  ) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  artistSongs(
    dto: SongArtistSongsReqDto
  ): Promise<DataPaginationResDto<SongResDto>> {
    return this.clientProxyData
      .send<DataPaginationResDto<SongResDto>, SongArtistsReqDto>(
        DATA_SONG_SERVICE_ARTIST_SONGS,
        dto
      )
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async artistSongsTop(
    dto: SongArtistSongsTopReqDto
  ): Promise<DataPaginationResDto<SongResDto>> {
    return this.clientProxyData
      .send<DataPaginationResDto<SongResDto>, SongArtistSongsTopReqDto>(
        DATA_SONG_SERVICE_ARTIST_SONGS_TOP,
        dto
      )
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async genre(
    dto: SongSongGenresReqDto
  ): Promise<DataPaginationResDto<SongResDto>> {
    return this.clientProxyData
      .send<DataPaginationResDto<SongResDto>, SongSongGenresReqDto>(
        DATA_SONG_SERVICE_GENRE,
        dto
      )
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async get(dto: SongGetReqDto): Promise<SongResDto> {
    return this.clientProxyData
      .send<SongResDto, SongGetReqDto>(DATA_SONG_SERVICE_GET, dto)
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async language(
    dto: SongLanguageReqDto
  ): Promise<DataPaginationResDto<SongResDto>> {
    return this.clientProxyData
      .send<DataPaginationResDto<SongResDto>, SongLanguageReqDto>(
        DATA_SONG_SERVICE_LANGUAGE,
        dto
      )
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async like(dto: SongLikeReqDto): Promise<SongResDto> {
    await this.clientProxyRelation
      .send<boolean, RelationSetReqDto>(RELATION_SERVICE_SET, {
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
      })
      .toPromise();
    const song = await this.clientProxyData
      .send<SongResDto, SongLikeReqDto>(DATA_SONG_SERVICE_GET, dto)
      .toPromise();
    return { ...song, liked: true };
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async liked(dto: SongLikedReqDto): Promise<DataPaginationResDto<SongResDto>> {
    const relation = await this.clientProxyRelation
      .send<DataPaginationResDto<RelationEntityReqDto>, RelationGetReqDto>(
        RELATION_SERVICE_GET,
        {
          from: dto.from,
          fromEntityDto: {
            id: dto.sub,
            type: RelationEntityType.user,
          },
          relationType: RelationType.likedSongs,
          size: Math.min(dto.config.maxSize, dto.size),
        }
      )
      .toPromise();
    if (relation.results.length === 0) {
      return {
        results: [] as SongResDto[],
        total: 0,
      } as DataPaginationResDto<SongResDto>;
    }
    return this.clientProxyData
      .send<DataPaginationResDto<SongResDto>, SongGetByIdsReqDto>(
        DATA_SONG_SERVICE_GET_BY_IDS,
        {
          ...dto,
          ids: relation.results.map((value) => value.id),
        }
      )
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async mood(dto: SongMoodReqDto): Promise<DataPaginationResDto<SongResDto>> {
    return this.clientProxyData
      .send<DataPaginationResDto<SongResDto>, SongMoodReqDto>(
        DATA_SONG_SERVICE_MOOD,
        dto
      )
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async newPodcast(
    dto: SongNewPodcastReqDto
  ): Promise<DataPaginationResDto<SongResDto>> {
    return this.clientProxyData
      .send<DataPaginationResDto<SongResDto>, SongNewPodcastReqDto>(
        DATA_SONG_SERVICE_NEW_PODCAST,
        dto
      )
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async newSong(dto: SongNewReqDto): Promise<DataPaginationResDto<SongResDto>> {
    return this.clientProxyData
      .send<DataPaginationResDto<SongResDto>, SongNewReqDto>(
        DATA_SONG_SERVICE_NEW_SONG,
        dto
      )
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async podcast(
    dto: SongPodcastGenresReqDto
  ): Promise<DataPaginationResDto<SongResDto>> {
    return this.clientProxyData
      .send<DataPaginationResDto<SongResDto>, SongPodcastGenresReqDto>(
        DATA_SONG_SERVICE_PODCAST,
        dto
      )
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async sendTelegram(dto: SongSendTelegramReqDto): Promise<void> {
    const user = await this.clientProxyUser
      .send<UserResDto | undefined, UserFindOneReqDto>(USER_SERVICE_FIND_ONE, {
        id: dto.sub,
      })
      .toPromise();
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
    return this.clientProxyData
      .send<DataPaginationResDto<SongResDto>, SongSimilarReqDto>(
        DATA_SONG_SERVICE_SIMILAR,
        dto
      )
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async slider(
    dto: SongSliderReqDto
  ): Promise<DataPaginationResDto<SongResDto>> {
    return this.clientProxyData
      .send<DataPaginationResDto<SongResDto>, SongSliderReqDto>(
        DATA_SONG_SERVICE_SLIDER,
        dto
      )
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async topDay(
    dto: SongTopDayReqDto
  ): Promise<DataPaginationResDto<SongResDto>> {
    return this.clientProxyData
      .send<DataPaginationResDto<SongResDto>, SongTopDayReqDto>(
        DATA_SONG_SERVICE_TOP_DAY,
        dto
      )
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async topWeek(
    dto: SongTopWeekReqDto
  ): Promise<DataPaginationResDto<SongResDto>> {
    return this.clientProxyData
      .send<DataPaginationResDto<SongResDto>, SongTopWeekReqDto>(
        DATA_SONG_SERVICE_TOP_WEEK,
        dto
      )
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async unlike(dto: SongUnlikeReqDto): Promise<SongResDto> {
    await this.clientProxyRelation
      .send<boolean, RelationRemoveReqDto>(RELATION_SERVICE_REMOVE, {
        from: {
          id: dto.sub,
          type: RelationEntityType.user,
        },
        relationType: RelationType.likedSongs,
        to: {
          id: dto.id,
          type: RelationEntityType.song,
        },
      })
      .toPromise();
    const song = await this.clientProxyData
      .send<SongResDto, SongGetReqDto>(DATA_SONG_SERVICE_GET, dto)
      .toPromise();
    return {
      ...song,
      liked: false,
    };
  }
}
