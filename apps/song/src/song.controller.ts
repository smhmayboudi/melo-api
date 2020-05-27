import {
  DataPaginationResDto,
  SONG_SERVICE_ARTIST_SONGS,
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
import { MessagePattern, Payload } from "@nestjs/microservices";

import { Controller } from "@nestjs/common";
import { SongService } from "./song.service";

@Controller()
export class SongController {
  constructor(private readonly songService: SongService) {}

  @MessagePattern(SONG_SERVICE_ARTIST_SONGS)
  artistSongs(
    @Payload() dto: SongArtistSongsReqDto
  ): Promise<DataPaginationResDto<SongResDto>> {
    return this.songService.artistSongs(dto);
  }

  @MessagePattern(SONG_SERVICE_ARTIST_SONGS_TOP)
  artistSongsTop(
    @Payload() dto: SongArtistSongsTopReqDto
  ): Promise<DataPaginationResDto<SongResDto>> {
    return this.songService.artistSongsTop(dto);
  }

  @MessagePattern(SONG_SERVICE_GENRE)
  genre(
    @Payload() dto: SongSongGenresReqDto
  ): Promise<DataPaginationResDto<SongResDto>> {
    return this.songService.genre(dto);
  }

  @MessagePattern(SONG_SERVICE_GET)
  get(@Payload() dto: SongGetReqDto): Promise<SongResDto> {
    return this.songService.get(dto);
  }

  @MessagePattern(SONG_SERVICE_LANGUAGE)
  language(
    @Payload() dto: SongLanguageReqDto
  ): Promise<DataPaginationResDto<SongResDto>> {
    return this.songService.language(dto);
  }

  @MessagePattern(SONG_SERVICE_LIKE)
  like(@Payload() dto: SongLikeReqDto): Promise<SongResDto> {
    return this.songService.like(dto);
  }

  @MessagePattern(SONG_SERVICE_LIKED)
  liked(
    @Payload() dto: SongLikedReqDto
  ): Promise<DataPaginationResDto<SongResDto>> {
    return this.songService.liked(dto);
  }

  @MessagePattern(SONG_SERVICE_MOOD)
  mood(
    @Payload() dto: SongMoodReqDto
  ): Promise<DataPaginationResDto<SongResDto>> {
    return this.songService.mood(dto);
  }

  @MessagePattern(SONG_SERVICE_NEW_PODCAST)
  newPodcast(
    @Payload() dto: SongNewPodcastReqDto
  ): Promise<DataPaginationResDto<SongResDto>> {
    return this.songService.newPodcast(dto);
  }

  @MessagePattern(SONG_SERVICE_NEW_SONG)
  newSong(
    @Payload() dto: SongNewReqDto
  ): Promise<DataPaginationResDto<SongResDto>> {
    return this.songService.newSong(dto);
  }

  @MessagePattern(SONG_SERVICE_PODCAST)
  podcast(
    @Payload() dto: SongPodcastGenresReqDto
  ): Promise<DataPaginationResDto<SongResDto>> {
    return this.songService.podcast(dto);
  }

  @MessagePattern(SONG_SERVICE_SEND_TELEGRAM)
  sendTelegram(@Payload() dto: SongSendTelegramReqDto): Promise<void> {
    return this.songService.sendTelegram(dto);
  }

  @MessagePattern(SONG_SERVICE_SIMILAR)
  similar(
    @Payload() dto: SongSimilarReqDto
  ): Promise<DataPaginationResDto<SongResDto>> {
    return this.songService.similar(dto);
  }

  @MessagePattern(SONG_SERVICE_SLIDER)
  slider(dto: SongSliderReqDto): Promise<DataPaginationResDto<SongResDto>> {
    return this.songService.slider(dto);
  }

  @MessagePattern(SONG_SERVICE_TOP_DAY)
  topDay(
    @Payload() dto: SongTopDayReqDto
  ): Promise<DataPaginationResDto<SongResDto>> {
    return this.songService.topDay(dto);
  }

  @MessagePattern(SONG_SERVICE_TOP_WEEK)
  topWeek(
    @Payload() dto: SongTopWeekReqDto
  ): Promise<DataPaginationResDto<SongResDto>> {
    return this.songService.topWeek(dto);
  }

  @MessagePattern(SONG_SERVICE_UNLIKE)
  unlike(@Payload() dto: SongUnlikeReqDto): Promise<SongResDto> {
    return this.songService.unlike(dto);
  }
}
