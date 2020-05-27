import {
  DATA_SONG_SERVICE_ALBUM_SONGS,
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
  SongAlbumReqDto,
  SongArtistSongsTopReqDto,
  SongArtistsReqDto,
  SongGenreReqDto,
  SongGetByIdsReqDto,
  SongGetReqDto,
  SongLanguageReqDto,
  SongMoodReqDto,
  SongNewPodcastReqDto,
  SongNewReqDto,
  SongPodcastReqDto,
  SongResDto,
  SongSimilarReqDto,
  SongSliderReqDto,
  SongTopDayReqDto,
  SongTopWeekReqDto,
} from "@melo/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

import { Controller } from "@nestjs/common";
import { DataSongService } from "./data.song.service";

@Controller()
export class DataSongController {
  constructor(private readonly dataSongService: DataSongService) {}

  @MessagePattern(DATA_SONG_SERVICE_ALBUM_SONGS)
  albumSongs(
    @Payload() dto: SongAlbumReqDto
  ): Promise<DataPaginationResDto<SongResDto>> {
    return this.dataSongService.albumSongs(dto);
  }

  @MessagePattern(DATA_SONG_SERVICE_ARTIST_SONGS)
  artistSongs(
    @Payload() dto: SongArtistsReqDto
  ): Promise<DataPaginationResDto<SongResDto>> {
    return this.dataSongService.albumSongs(dto);
  }

  @MessagePattern(DATA_SONG_SERVICE_ARTIST_SONGS_TOP)
  artistSongsTop(
    @Payload() dto: SongArtistSongsTopReqDto
  ): Promise<DataPaginationResDto<SongResDto>> {
    return this.dataSongService.artistSongsTop(dto);
  }

  @MessagePattern(DATA_SONG_SERVICE_GENRE)
  genre(
    @Payload() dto: SongGenreReqDto
  ): Promise<DataPaginationResDto<SongResDto>> {
    return this.dataSongService.genre(dto);
  }

  @MessagePattern(DATA_SONG_SERVICE_GET)
  get(@Payload() dto: SongGetReqDto): Promise<SongResDto> {
    return this.dataSongService.get(dto);
  }

  @MessagePattern(DATA_SONG_SERVICE_GET_BY_IDS)
  getByIds(
    @Payload() dto: SongGetByIdsReqDto
  ): Promise<DataPaginationResDto<SongResDto>> {
    return this.dataSongService.getByIds(dto);
  }

  @MessagePattern(DATA_SONG_SERVICE_LANGUAGE)
  language(
    @Payload() dto: SongLanguageReqDto
  ): Promise<DataPaginationResDto<SongResDto>> {
    return this.dataSongService.language(dto);
  }

  @MessagePattern(DATA_SONG_SERVICE_MOOD)
  mood(
    @Payload() dto: SongMoodReqDto
  ): Promise<DataPaginationResDto<SongResDto>> {
    return this.dataSongService.mood(dto);
  }

  @MessagePattern(DATA_SONG_SERVICE_NEW_PODCAST)
  newPodcast(
    @Payload() dto: SongNewPodcastReqDto
  ): Promise<DataPaginationResDto<SongResDto>> {
    return this.dataSongService.newPodcast(dto);
  }

  @MessagePattern(DATA_SONG_SERVICE_NEW_SONG)
  newSong(
    @Payload() dto: SongNewReqDto
  ): Promise<DataPaginationResDto<SongResDto>> {
    return this.dataSongService.newSong(dto);
  }

  @MessagePattern(DATA_SONG_SERVICE_PODCAST)
  podcast(
    @Payload() dto: SongPodcastReqDto
  ): Promise<DataPaginationResDto<SongResDto>> {
    return this.dataSongService.podcast(dto);
  }

  @MessagePattern(DATA_SONG_SERVICE_SIMILAR)
  similar(
    @Payload() dto: SongSimilarReqDto
  ): Promise<DataPaginationResDto<SongResDto>> {
    return this.dataSongService.similar(dto);
  }

  @MessagePattern(DATA_SONG_SERVICE_SLIDER)
  slider(dto: SongSliderReqDto): Promise<DataPaginationResDto<SongResDto>> {
    return this.dataSongService.slider(dto);
  }

  @MessagePattern(DATA_SONG_SERVICE_TOP_DAY)
  topDay(
    @Payload() dto: SongTopDayReqDto
  ): Promise<DataPaginationResDto<SongResDto>> {
    return this.dataSongService.topDay(dto);
  }

  @MessagePattern(DATA_SONG_SERVICE_TOP_WEEK)
  topWeek(
    @Payload() dto: SongTopWeekReqDto
  ): Promise<DataPaginationResDto<SongResDto>> {
    return this.dataSongService.topWeek(dto);
  }
}
