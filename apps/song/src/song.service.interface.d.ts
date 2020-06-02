import {
  DataElasticsearchSearchResDto,
  SongAlbumSongsReqDto,
  SongArtistSongsReqDto,
  SongArtistSongsTopReqDto,
  SongGenreReqDto,
  SongGetByIdsReqDto,
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

export interface SongServiceInterface {
  albumSongs(dto: SongAlbumSongsReqDto): Promise<SongResDto[]>;
  artistSongs(dto: SongArtistSongsReqDto): Promise<SongResDto[]>;
  artistSongsTop(dto: SongArtistSongsTopReqDto): Promise<SongResDto[]>;
  genre(dto: SongGenreReqDto): Promise<SongResDto[]>;
  get(dto: SongGetReqDto): Promise<SongResDto>;
  getByIds(dto: SongGetByIdsReqDto): Promise<SongResDto[]>;
  language(dto: SongLanguageReqDto): Promise<SongResDto[]>;
  like(dto: SongLikeReqDto): Promise<SongResDto>;
  liked(dto: SongLikedReqDto): Promise<SongResDto[]>;
  mood(dto: SongMoodReqDto): Promise<SongResDto[]>;
  newPodcast(dto: SongNewPodcastReqDto): Promise<SongResDto[]>;
  newSong(dto: SongNewReqDto): Promise<SongResDto[]>;
  podcast(dto: SongPodcastReqDto): Promise<SongResDto[]>;
  sendTelegram(dto: SongSendTelegramReqDto): Promise<void>;
  similar(dto: SongSimilarReqDto): Promise<SongResDto[]>;
  slider(dto: SongSliderReqDto): Promise<SongResDto[]>;
  topDay(dto: SongTopDayReqDto): Promise<SongResDto[]>;
  topWeek(dto: SongTopWeekReqDto): Promise<SongResDto[]>;
  transform(dto: DataElasticsearchSearchResDto): Promise<SongResDto>;
  unlike(dto: SongUnlikeReqDto): Promise<SongResDto>;
}
