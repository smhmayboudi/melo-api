import {
  DataPaginationResDto,
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

export interface SongServiceInterface {
  artistSongs(
    dto: SongArtistSongsReqDto
  ): Promise<DataPaginationResDto<SongResDto>>;
  artistSongsTop(
    dto: SongArtistSongsTopReqDto
  ): Promise<DataPaginationResDto<SongResDto>>;
  genre(dto: SongSongGenresReqDto): Promise<DataPaginationResDto<SongResDto>>;
  get(dto: SongGetReqDto): Promise<SongResDto>;
  language(dto: SongLanguageReqDto): Promise<DataPaginationResDto<SongResDto>>;
  like(dto: SongLikeReqDto): Promise<SongResDto>;
  liked(dto: SongLikedReqDto): Promise<DataPaginationResDto<SongResDto>>;
  mood(dto: SongMoodReqDto): Promise<DataPaginationResDto<SongResDto>>;
  newPodcast(
    dto: SongNewPodcastReqDto
  ): Promise<DataPaginationResDto<SongResDto>>;
  newSong(dto: SongNewReqDto): Promise<DataPaginationResDto<SongResDto>>;
  podcast(
    dto: SongPodcastGenresReqDto
  ): Promise<DataPaginationResDto<SongResDto>>;
  sendTelegram(dto: SongSendTelegramReqDto): Promise<void>;
  similar(dto: SongSimilarReqDto): Promise<DataPaginationResDto<SongResDto>>;
  slider(dto: SongSliderReqDto): Promise<DataPaginationResDto<SongResDto>>;
  topDay(dto: SongTopDayReqDto): Promise<DataPaginationResDto<SongResDto>>;
  topWeek(dto: SongTopWeekReqDto): Promise<DataPaginationResDto<SongResDto>>;
  unlike(dto: SongUnlikeReqDto): Promise<SongResDto>;
}
