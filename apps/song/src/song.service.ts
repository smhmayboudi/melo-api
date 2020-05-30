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
  RELATION_SERVICE,
  RELATION_SERVICE_GET,
  RELATION_SERVICE_REMOVE,
  RELATION_SERVICE_SET,
  RelationEdgeType,
  RelationEntityType,
  RelationGetReqDto,
  RelationRemoveReqDto,
  RelationResDto,
  RelationSetReqDto,
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
  artistSongs(dto: SongArtistSongsReqDto): Promise<SongResDto[]> {
    return this.clientProxyData
      .send<SongResDto[], SongArtistsReqDto>(
        DATA_SONG_SERVICE_ARTIST_SONGS,
        dto
      )
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async artistSongsTop(dto: SongArtistSongsTopReqDto): Promise<SongResDto[]> {
    return this.clientProxyData
      .send<SongResDto[], SongArtistSongsTopReqDto>(
        DATA_SONG_SERVICE_ARTIST_SONGS_TOP,
        dto
      )
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async genre(dto: SongSongGenresReqDto): Promise<SongResDto[]> {
    return this.clientProxyData
      .send<SongResDto[], SongSongGenresReqDto>(DATA_SONG_SERVICE_GENRE, dto)
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
  async language(dto: SongLanguageReqDto): Promise<SongResDto[]> {
    return this.clientProxyData
      .send<SongResDto[], SongLanguageReqDto>(DATA_SONG_SERVICE_LANGUAGE, dto)
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async like(dto: SongLikeReqDto): Promise<SongResDto> {
    await this.clientProxyRelation
      .send<RelationResDto, RelationSetReqDto>(RELATION_SERVICE_SET, {
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
  async liked(dto: SongLikedReqDto): Promise<SongResDto[]> {
    const relations = await this.clientProxyRelation
      .send<RelationResDto[], RelationGetReqDto>(RELATION_SERVICE_GET, {
        entity: {
          id: dto.sub,
          type: RelationEntityType.user,
        },
        from: dto.from,
        size: Math.min(dto.config.maxSize, dto.size),
        type: RelationEdgeType.likedSongs,
      })
      .toPromise();
    if (relations.length === 0) {
      return [];
    }
    return this.clientProxyData
      .send<SongResDto[], SongGetByIdsReqDto>(DATA_SONG_SERVICE_GET_BY_IDS, {
        ...dto,
        ids: relations.map((value) => value.to.id),
      })
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async mood(dto: SongMoodReqDto): Promise<SongResDto[]> {
    return this.clientProxyData
      .send<SongResDto[], SongMoodReqDto>(DATA_SONG_SERVICE_MOOD, dto)
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async newPodcast(dto: SongNewPodcastReqDto): Promise<SongResDto[]> {
    return this.clientProxyData
      .send<SongResDto[], SongNewPodcastReqDto>(
        DATA_SONG_SERVICE_NEW_PODCAST,
        dto
      )
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async newSong(dto: SongNewReqDto): Promise<SongResDto[]> {
    return this.clientProxyData
      .send<SongResDto[], SongNewReqDto>(DATA_SONG_SERVICE_NEW_SONG, dto)
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async podcast(dto: SongPodcastGenresReqDto): Promise<SongResDto[]> {
    return this.clientProxyData
      .send<SongResDto[], SongPodcastGenresReqDto>(
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
    return this.clientProxyData
      .send<SongResDto[], SongSimilarReqDto>(DATA_SONG_SERVICE_SIMILAR, dto)
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async slider(dto: SongSliderReqDto): Promise<SongResDto[]> {
    return this.clientProxyData
      .send<SongResDto[], SongSliderReqDto>(DATA_SONG_SERVICE_SLIDER, dto)
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async topDay(dto: SongTopDayReqDto): Promise<SongResDto[]> {
    return this.clientProxyData
      .send<SongResDto[], SongTopDayReqDto>(DATA_SONG_SERVICE_TOP_DAY, dto)
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async topWeek(dto: SongTopWeekReqDto): Promise<SongResDto[]> {
    return this.clientProxyData
      .send<SongResDto[], SongTopWeekReqDto>(DATA_SONG_SERVICE_TOP_WEEK, dto)
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async unlike(dto: SongUnlikeReqDto): Promise<SongResDto> {
    await this.clientProxyRelation
      .send<RelationResDto, RelationRemoveReqDto>(RELATION_SERVICE_REMOVE, {
        from: {
          id: dto.sub,
          type: RelationEntityType.user,
        },
        to: {
          id: dto.id,
          type: RelationEntityType.song,
        },
        type: RelationEdgeType.likedSongs,
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
