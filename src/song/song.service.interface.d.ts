import { DataOrderByType } from "../data/data.order-by.type";
import { DataSongNewPodcastReqDto } from "../data/dto/req/data.song.new-podcast.req.dto";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataSongResDto } from "../data/dto/res/data.song.res.dto";
import { SongArtistSongsTopReqDto } from "./dto/req/song.artist-songs-top.req.dto";
import { SongArtistSongsReqDto } from "./dto/req/song.artist-songs.req.dto";
import { SongByIdReqDto } from "./dto/req/song.by-id.req.dto";
import { SongLanguageReqDto } from "./dto/req/song.language.req.dto";
import { SongLikeReqDto } from "./dto/req/song.like.req.dto";
import { SongLikedReqDto } from "./dto/req/song.liked.req.dto";
import { SongMoodReqDto } from "./dto/req/song.mood.req.dto";
import { SongNewReqDto } from "./dto/req/song.new.req.dto";
import { SongPodcastGenresParamReqDto } from "./dto/req/song.podcast.genres.param.req.dto";
import { SongPodcastGenresQueryReqDto } from "./dto/req/song.podcast.genres.query.req.dto";
import { SongSearchMoodParamDto } from "./dto/req/song.search-mood.param.req.dto";
import { SongSearchMoodQueryDto } from "./dto/req/song.search-mood.query.req.dto";
import { SongSendTelegramReqDto } from "./dto/req/song.send-telegram.req.dto";
import { SongSimilarReqDto } from "./dto/req/song.similar.req.dto";
import { SongSongGenresParamReqDto } from "./dto/req/song.song.genres.param.req.dto";
import { SongSongGenresQueryReqDto } from "./dto/req/song.song.genres.query.req.dto";
import { SongTopDayReqDto } from "./dto/req/song.top-day.req.dto";
import { SongTopWeekReqDto } from "./dto/req/song.top-week.req.dto";
import { SongUnlikeReqDto } from "./dto/req/song.unlike.req.dto";

export interface SongServiceInterface {
  artistSongs(
    dto: SongArtistSongsReqDto,
    artistId: number,
    sub: number
  ): Promise<DataPaginationResDto<DataSongResDto>>;
  artistSongsTop(
    dto: SongArtistSongsTopReqDto,
    artistId: number,
    sub: number
  ): Promise<DataPaginationResDto<DataSongResDto>>;
  byId(dto: SongByIdReqDto, id: number, sub: number): Promise<DataSongResDto>;
  genre(
    orderBy: DataOrderByType,
    paramDto: SongSongGenresParamReqDto,
    queryDto: SongSongGenresQueryReqDto,
    sub: number
  ): Promise<DataPaginationResDto<DataSongResDto>>;
  language(
    dto: SongLanguageReqDto,
    orderBy: DataOrderByType,
    sub: number
  ): Promise<DataPaginationResDto<DataSongResDto>>;
  like(dto: SongLikeReqDto, id: number, sub: number): Promise<DataSongResDto>;
  liked(
    dto: SongLikedReqDto,
    sub: number
  ): Promise<DataPaginationResDto<DataSongResDto>>;
  mood(
    dto: SongMoodReqDto,
    sub: number
  ): Promise<DataPaginationResDto<DataSongResDto>>;
  newPodcast(
    dto: DataSongNewPodcastReqDto,
    sub: number
  ): Promise<DataPaginationResDto<DataSongResDto>>;
  newSong(
    dto: SongNewReqDto,
    sub: number
  ): Promise<DataPaginationResDto<DataSongResDto>>;
  podcast(
    orderBy,
    paramDto: SongPodcastGenresParamReqDto,
    queryDto: SongPodcastGenresQueryReqDto,
    sub: number
  ): Promise<DataPaginationResDto<DataSongResDto>>;
  searchMood(
    paramDto: SongSearchMoodParamDto,
    querydto: SongSearchMoodQueryDto
  ): Promise<DataPaginationResDto<DataSongResDto>>;
  sendTelegram(
    dto: SongSendTelegramReqDto,
    id: number,
    sub: number
  ): Promise<void>;
  similar(
    dto: SongSimilarReqDto,
    id: number,
    sub: number
  ): Promise<DataPaginationResDto<DataSongResDto>>;
  slider(sub: number): Promise<DataPaginationResDto<DataSongResDto>>;
  topDay(
    dto: SongTopDayReqDto,
    sub: number
  ): Promise<DataPaginationResDto<DataSongResDto>>;
  topWeek(
    dto: SongTopWeekReqDto,
    sub: number
  ): Promise<DataPaginationResDto<DataSongResDto>>;
  unlike(
    dto: SongUnlikeReqDto,
    id: number,
    sub: number
  ): Promise<DataSongResDto>;
}