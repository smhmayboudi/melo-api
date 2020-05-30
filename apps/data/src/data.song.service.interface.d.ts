import {
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

export interface DataSongServiceInterface {
  albumSongs(dto: SongAlbumReqDto): Promise<SongResDto[]>;
  artistSongs(dto: SongArtistsReqDto): Promise<SongResDto[]>;
  artistSongsTop(dto: SongArtistSongsTopReqDto): Promise<SongResDto[]>;
  genre(dto: SongGenreReqDto): Promise<SongResDto[]>;
  get(dto: SongGetReqDto): Promise<SongResDto>;
  getByIds(dto: SongGetByIdsReqDto): Promise<SongResDto[]>;
  language(dto: SongLanguageReqDto): Promise<SongResDto[]>;
  mood(dto: SongMoodReqDto): Promise<SongResDto[]>;
  newPodcast(dto: SongNewPodcastReqDto): Promise<SongResDto[]>;
  newSong(dto: SongNewReqDto): Promise<SongResDto[]>;
  podcast(dto: SongPodcastReqDto): Promise<SongResDto[]>;
  similar(dto: SongSimilarReqDto): Promise<SongResDto[]>;
  slider(dto: SongSliderReqDto): Promise<SongResDto[]>;
  topDay(dto: SongTopDayReqDto): Promise<SongResDto[]>;
  topWeek(dto: SongTopWeekReqDto): Promise<SongResDto[]>;
}
