import {
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
  artistSongs(dto: SongArtistSongsReqDto): Promise<SongResDto[]>;
  artistSongsTop(dto: SongArtistSongsTopReqDto): Promise<SongResDto[]>;
  genre(dto: SongSongGenresReqDto): Promise<SongResDto[]>;
  get(dto: SongGetReqDto): Promise<SongResDto>;
  language(dto: SongLanguageReqDto): Promise<SongResDto[]>;
  like(dto: SongLikeReqDto): Promise<SongResDto>;
  liked(dto: SongLikedReqDto): Promise<SongResDto[]>;
  mood(dto: SongMoodReqDto): Promise<SongResDto[]>;
  newPodcast(dto: SongNewPodcastReqDto): Promise<SongResDto[]>;
  newSong(dto: SongNewReqDto): Promise<SongResDto[]>;
  podcast(dto: SongPodcastGenresReqDto): Promise<SongResDto[]>;
  sendTelegram(dto: SongSendTelegramReqDto): Promise<void>;
  similar(dto: SongSimilarReqDto): Promise<SongResDto[]>;
  slider(dto: SongSliderReqDto): Promise<SongResDto[]>;
  topDay(dto: SongTopDayReqDto): Promise<SongResDto[]>;
  topWeek(dto: SongTopWeekReqDto): Promise<SongResDto[]>;
  unlike(dto: SongUnlikeReqDto): Promise<SongResDto>;
}
