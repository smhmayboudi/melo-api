import { ApmAfterMethod, ApmBeforeMethod } from "@melo/apm";
import { Inject, Injectable } from "@nestjs/common";
import {
  SONG_SERVICE,
  SONG_SERVICE_ALBUM_SONGS,
  SONG_SERVICE_ARTIST_SONGS_TOP,
  SONG_SERVICE_GENRE,
  SONG_SERVICE_GET,
  SONG_SERVICE_LANGUAGE,
  SONG_SERVICE_LIKE,
  SONG_SERVICE_LIKED,
  SONG_SERVICE_MOOD,
  SONG_SERVICE_NEW_PODCAST,
  SONG_SERVICE_NEW_SONG,
  SONG_SERVICE_PODCAST,
  SONG_SERVICE_SEND_TELEGRAM,
  SONG_SERVICE_SIMILAR,
  SONG_SERVICE_SLIDER,
  SONG_SERVICE_TOP_DAY,
  SONG_SERVICE_TOP_WEEK,
  SONG_SERVICE_UNLIKE,
  SongArtistSongsReqDto,
  SongArtistSongsTopReqDto,
  SongGenreReqDto,
  SongGetReqDto,
  SongLanguageReqDto,
  SongLikeReqDto,
  SongLikedReqDto,
  SongMoodReqDto,
  SongNewPodcastReqDto,
  SongNewReqDto,
  SongPodcastReqDto,
  SongResDto,
  SongSendTelegramReqDto,
  SongSimilarReqDto,
  SongSliderReqDto,
  SongTopDayReqDto,
  SongTopWeekReqDto,
  SongUnlikeReqDto,
} from "@melo/common";

import { ClientProxy } from "@nestjs/microservices";
import { PromMethodCounter } from "@melo/prom";
import { SongServiceInterface } from "./song.service.interface";

@Injectable()
// @PromInstanceCounter
export class SongService implements SongServiceInterface {
  constructor(
    @Inject(SONG_SERVICE) private readonly songClientProxy: ClientProxy
  ) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async artistSongs(dto: SongArtistSongsReqDto): Promise<SongResDto[]> {
    return this.songClientProxy
      .send<SongResDto[], SongArtistSongsReqDto>(SONG_SERVICE_ALBUM_SONGS, dto)
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async artistSongsTop(dto: SongArtistSongsTopReqDto): Promise<SongResDto[]> {
    return this.songClientProxy
      .send<SongResDto[], SongArtistSongsTopReqDto>(
        SONG_SERVICE_ARTIST_SONGS_TOP,
        dto
      )
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async genre(dto: SongGenreReqDto): Promise<SongResDto[]> {
    return this.songClientProxy
      .send<SongResDto[], SongGenreReqDto>(SONG_SERVICE_GENRE, dto)
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async get(dto: SongGetReqDto): Promise<SongResDto> {
    return this.songClientProxy
      .send<SongResDto, SongGetReqDto>(SONG_SERVICE_GET, dto)
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async language(dto: SongLanguageReqDto): Promise<SongResDto[]> {
    return this.songClientProxy
      .send<SongResDto[], SongLanguageReqDto>(SONG_SERVICE_LANGUAGE, dto)
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async like(dto: SongLikeReqDto): Promise<SongResDto> {
    return this.songClientProxy
      .send<SongResDto, SongLikeReqDto>(SONG_SERVICE_LIKE, dto)
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async liked(dto: SongLikedReqDto): Promise<SongResDto[]> {
    return this.songClientProxy
      .send<SongResDto[], SongLikedReqDto>(SONG_SERVICE_LIKED, dto)
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async mood(dto: SongMoodReqDto): Promise<SongResDto[]> {
    return this.songClientProxy
      .send<SongResDto[], SongMoodReqDto>(SONG_SERVICE_MOOD, dto)
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async newPodcast(dto: SongNewPodcastReqDto): Promise<SongResDto[]> {
    return this.songClientProxy
      .send<SongResDto[], SongNewPodcastReqDto>(SONG_SERVICE_NEW_PODCAST, dto)
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async newSong(dto: SongNewReqDto): Promise<SongResDto[]> {
    return this.songClientProxy
      .send<SongResDto[], SongNewReqDto>(SONG_SERVICE_NEW_SONG, dto)
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async podcast(dto: SongPodcastReqDto): Promise<SongResDto[]> {
    return this.songClientProxy
      .send<SongResDto[], SongPodcastReqDto>(SONG_SERVICE_PODCAST, dto)
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async sendTelegram(dto: SongSendTelegramReqDto): Promise<void> {
    return this.songClientProxy
      .send<void, SongSendTelegramReqDto>(SONG_SERVICE_SEND_TELEGRAM, dto)
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async similar(dto: SongSimilarReqDto): Promise<SongResDto[]> {
    return this.songClientProxy
      .send<SongResDto[], SongSimilarReqDto>(SONG_SERVICE_SIMILAR, dto)
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async slider(dto: SongSliderReqDto): Promise<SongResDto[]> {
    return this.songClientProxy
      .send<SongResDto[], SongSliderReqDto>(SONG_SERVICE_SLIDER, dto)
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async topDay(dto: SongTopDayReqDto): Promise<SongResDto[]> {
    return this.songClientProxy
      .send<SongResDto[], SongTopDayReqDto>(SONG_SERVICE_TOP_DAY, dto)
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async topWeek(dto: SongTopWeekReqDto): Promise<SongResDto[]> {
    return this.songClientProxy
      .send<SongResDto[], SongTopWeekReqDto>(SONG_SERVICE_TOP_WEEK, dto)
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async unlike(dto: SongUnlikeReqDto): Promise<SongResDto> {
    return this.songClientProxy
      .send<SongResDto, SongUnlikeReqDto>(SONG_SERVICE_UNLIKE, dto)
      .toPromise();
  }
}
