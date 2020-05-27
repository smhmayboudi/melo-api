import {
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

export interface DataSongServiceInterface {
  albumSongs(dto: SongAlbumReqDto): Promise<DataPaginationResDto<SongResDto>>;
  artistSongs(
    dto: SongArtistsReqDto
  ): Promise<DataPaginationResDto<SongResDto>>;
  artistSongsTop(
    dto: SongArtistSongsTopReqDto
  ): Promise<DataPaginationResDto<SongResDto>>;
  genre(dto: SongGenreReqDto): Promise<DataPaginationResDto<SongResDto>>;
  get(dto: SongGetReqDto): Promise<SongResDto>;
  getByIds(dto: SongGetByIdsReqDto): Promise<DataPaginationResDto<SongResDto>>;
  language(dto: SongLanguageReqDto): Promise<DataPaginationResDto<SongResDto>>;
  mood(dto: SongMoodReqDto): Promise<DataPaginationResDto<SongResDto>>;
  newPodcast(
    dto: SongNewPodcastReqDto
  ): Promise<DataPaginationResDto<SongResDto>>;
  newSong(dto: SongNewReqDto): Promise<DataPaginationResDto<SongResDto>>;
  podcast(dto: SongPodcastReqDto): Promise<DataPaginationResDto<SongResDto>>;
  similar(dto: SongSimilarReqDto): Promise<DataPaginationResDto<SongResDto>>;
  slider(dto: SongSliderReqDto): Promise<DataPaginationResDto<SongResDto>>;
  topDay(dto: SongTopDayReqDto): Promise<DataPaginationResDto<SongResDto>>;
  topWeek(dto: SongTopWeekReqDto): Promise<DataPaginationResDto<SongResDto>>;
}
