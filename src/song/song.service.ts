import { Injectable } from "@nestjs/common";
import { SongGenreDto } from "./dto/song.genre.dto";
import { SongLikeDto } from "./dto/song.like.dto";
import { SongLikedDto } from "./dto/song.liked.dto";
import { SongNewPodcastDto } from "./dto/song.new.podcast.dto";
import { SongPodcastGenresDto } from "./dto/song.podcast.genres.dto";
import { SongSendTelegramDto } from "./dto/song.send.telegram.dto";
import { SongUnlikeDto } from "./dto/song.unlike.dto";
import { DataSongService } from "../data/data.song.service";
import { PaginationResultDto } from "../data/dto/pagination.result.dto";
import { SongDto } from "../data/dto/song.dto";
import { DataSongByIdDto } from "../data/dto/data.song.by.id.dto";
import { DataSongLanguageDto } from "../data/dto/data.song.language.dto";
import { RelationService } from "src/relation/relation.service";
import { RelationType } from "src/relation/type/relation.type";
import { DataSongMoodDto } from "src/data/dto/data.song.mood.dto";
import { DataSongNewDto } from "src/data/dto/data.song.new.dto";
import { DataSongPodcastDto } from "src/data/dto/data.song.podcast.dto";
import { DataSongSimilarDto } from "src/data/dto/data.song.similar.dto";
import { DataSongTopDayDto } from "src/data/dto/data.song.top.day.dto";
import { DataSongTopWeekDto } from "src/data/dto/data.song.top.week.dto";

@Injectable()
export class SongService {
  constructor(
    private readonly dataSongService: DataSongService,
    private readonly relationService: RelationService
  ) {}

  // TODO: check by orginal code
  async genre(dto: SongGenreDto): Promise<PaginationResultDto<SongDto>> {
    return this.dataSongService.genre(dto);
  }

  async get(dto: DataSongByIdDto): Promise<SongDto> {
    return this.dataSongService.byId(dto);
  }

  async language(
    dto: DataSongLanguageDto
  ): Promise<PaginationResultDto<SongDto>> {
    return this.dataSongService.language(dto);
  }

  async like(dto: SongLikeDto, sub: number): Promise<boolean> {
    return this.relationService.set({
      createdAt: new Date(),
      entityDto1: {
        id: sub,
        type: "user",
        // TODO: remove key
        key: ""
      },
      entityDto2: {
        id: dto.id,
        type: "song",
        // TODO: remove key
        key: ""
      },
      relType: RelationType.likedSongs
    });
  }

  async liked(
    dto: SongLikedDto,
    sub: number
  ): Promise<PaginationResultDto<SongDto>> {
    const results = await this.relationService.get({
      from: dto.from,
      fromEntityDto: {
        id: sub,
        type: "user",
        // TODO: remove key
        key: ""
      },
      limit: dto.limit,
      relType: RelationType.likedSongs
    });
    return this.dataSongService.byIds({
      ids: results.results.map(value => value.id)
    });
  }

  async mood(dto: DataSongMoodDto): Promise<PaginationResultDto<SongDto>> {
    return this.dataSongService.mood(dto);
  }

  async new(dto: DataSongNewDto): Promise<PaginationResultDto<SongDto>> {
    return this.dataSongService.new(dto);
  }

  async newPodcast(
    dto: SongNewPodcastDto
  ): Promise<PaginationResultDto<SongDto>> {
    return this.dataSongService.newPodcast(dto);
  }

  async podcast(dto: SongPodcastGenresDto): Promise<any> {
    return Promise.resolve(dto);
  }

  async podcastGenres(
    dto: DataSongPodcastDto
  ): Promise<PaginationResultDto<SongDto>> {
    return this.dataSongService.podcast(dto);
  }

  async sendTelegram(dto: SongSendTelegramDto): Promise<any> {
    return Promise.resolve(dto);
  }

  async similar(
    dto: DataSongSimilarDto
  ): Promise<PaginationResultDto<SongDto>> {
    return this.dataSongService.similar(dto);
  }

  async sliderLatest(_sub: number): Promise<any> {
    // return this.dataSongService.sliderLatest(sub);
    return Promise.resolve();
  }

  async topDay(dto: DataSongTopDayDto): Promise<PaginationResultDto<SongDto>> {
    return this.dataSongService.topDay(dto);
  }

  async topWeek(
    dto: DataSongTopWeekDto
  ): Promise<PaginationResultDto<SongDto>> {
    return this.dataSongService.topWeek(dto);
  }

  async unlike(dto: SongUnlikeDto, sub: number): Promise<boolean> {
    return this.relationService.remove({
      entityDto1: {
        id: sub,
        type: "user",
        // TODO: remove key
        key: ""
      },
      entityDto2: {
        id: dto.id,
        type: "song",
        // TODO: remove key
        key: ""
      },
      relType: RelationType.likedSongs
    });
  }
}
