import { HttpService, Injectable } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { map } from "rxjs/operators";
import { RelationEntityType } from "../relation/type/relation.entity.type";
import { DataSongService } from "../data/data.song.service";
import { DataSongByIdDto } from "../data/dto/data.song.by.id.dto";
import { DataSongLanguageDto } from "../data/dto/data.song.language.dto";
import { DataSongMoodDto } from "../data/dto/data.song.mood.dto";
import { DataSongNewDto } from "../data/dto/data.song.new.dto";
import { DataSongPodcastDto } from "../data/dto/data.song.podcast.dto";
import { DataSongSimilarDto } from "../data/dto/data.song.similar.dto";
import { DataSongTopDayDto } from "../data/dto/data.song.top.day.dto";
import { DataSongTopWeekDto } from "../data/dto/data.song.top.week.dto";
import { PaginationResultDto } from "../data/dto/pagination.result.dto";
import { SongDto } from "../data/dto/song.dto";
import { RelationService } from "../relation/relation.service";
import { RelationType } from "../relation/type/relation.type";
import { UserService } from "../user/user.service";
import { SongGenreDto } from "./dto/song.genre.dto";
import { SongLikeDto } from "./dto/song.like.dto";
import { SongLikedDto } from "./dto/song.liked.dto";
import { SongNewPodcastDto } from "./dto/song.new.podcast.dto";
import { SongSendTelegramDto } from "./dto/song.send.telegram.dto";
import { SongUnlikeDto } from "./dto/song.unlike.dto";
import { SongConfigService } from "./song.config.service";
import { songConstant } from "./song.constant";

@Injectable()
export class SongService {
  constructor(
    private readonly songConfigService: SongConfigService,
    private readonly dataSongService: DataSongService,
    private readonly httpService: HttpService,
    private readonly relationService: RelationService,
    private readonly userService: UserService
  ) {}

  // TODO: mixSongs
  async byId(dto: DataSongByIdDto): Promise<SongDto> {
    return this.dataSongService.byId(dto);
  }

  // TODO: mixSongs
  async genre(dto: SongGenreDto): Promise<PaginationResultDto<SongDto>> {
    return this.dataSongService.genre(dto);
  }

  // TODO: mixSongs
  async language(
    dto: DataSongLanguageDto
  ): Promise<PaginationResultDto<SongDto>> {
    return this.dataSongService.language(dto);
  }

  async like(dto: SongLikeDto, sub: number): Promise<boolean> {
    return this.relationService.set({
      createdAt: new Date(),
      entityDto1: {
        // TODO: remove key
        key: "",
        id: sub,
        type: RelationEntityType.user
      },
      entityDto2: {
        // TODO: remove key
        key: "",
        id: dto.id,
        type: RelationEntityType.song
      },
      relType: RelationType.likedSongs
    });
  }

  // TODO: mixSongs
  async liked(
    dto: SongLikedDto,
    sub: number
  ): Promise<PaginationResultDto<SongDto>> {
    const entityDtos = await this.relationService.get({
      from: dto.from,
      fromEntityDto: {
        // TODO: remove key
        key: "",
        id: sub,
        type: RelationEntityType.user
      },
      limit: dto.limit,
      relType: RelationType.likedSongs
    });
    return this.dataSongService.byIds({
      ids: entityDtos.results.map(value => value.id)
    });
  }

  // TODO: mixSongs
  async mood(dto: DataSongMoodDto): Promise<PaginationResultDto<SongDto>> {
    return this.dataSongService.mood(dto);
  }

  // TODO: mixSongs
  async new(dto: DataSongNewDto): Promise<PaginationResultDto<SongDto>> {
    return this.dataSongService.new(dto);
  }

  // TODO: mixSongs
  async newPodcast(
    dto: SongNewPodcastDto
  ): Promise<PaginationResultDto<SongDto>> {
    return this.dataSongService.newPodcast(dto);
  }

  // TODO: mixSongs
  async podcast(
    dto: DataSongPodcastDto
  ): Promise<PaginationResultDto<SongDto>> {
    return this.dataSongService.podcast(dto);
  }

  async sendTelegram(dto: SongSendTelegramDto, sub: number): Promise<number> {
    const userEntity = await this.userService.findOneById(sub);
    if (userEntity === undefined || userEntity.telegram_id === undefined) {
      throw new Error(songConstant.errors.telegram.userEntity);
    }
    return this.httpService
      .post(this.songConfigService.uri, {
        callback_query: {
          from: {
            first_name: "",
            id: userEntity.telegram_id,
            is_bot: false,
            language_code: "fa",
            username: undefined
          },
          message: {
            chat: {
              first_name: "",
              id: userEntity.telegram_id,
              type: "private",
              username: undefined
            },
            date: Math.round(new Date().getTime() / 1000)
          },
          data: `1:${dto.id},high,0`
        },
        update_id: 0
      })
      .pipe(
        map((value: AxiosResponse<number>) => {
          return value.data;
        })
      )
      .toPromise();
  }

  // TODO: mixSongs
  async similar(
    dto: DataSongSimilarDto
  ): Promise<PaginationResultDto<SongDto>> {
    return this.dataSongService.similar(dto);
  }

  // TODO: mixSongs
  async sliderLatest(_sub: number): Promise<PaginationResultDto<SongDto>> {
    return this.dataSongService.sliderLatest();
  }

  // TODO: mixSongs
  async topDay(dto: DataSongTopDayDto): Promise<PaginationResultDto<SongDto>> {
    return this.dataSongService.topDay(dto);
  }

  // TODO: mixSongs
  async topWeek(
    dto: DataSongTopWeekDto
  ): Promise<PaginationResultDto<SongDto>> {
    return this.dataSongService.topWeek(dto);
  }

  async unlike(dto: SongUnlikeDto, sub: number): Promise<boolean> {
    return this.relationService.remove({
      entityDto1: {
        // TODO: remove key
        key: "",
        id: sub,
        type: RelationEntityType.user
      },
      entityDto2: {
        // TODO: remove key
        key: "",
        id: dto.id,
        type: RelationEntityType.song
      },
      relType: RelationType.likedSongs
    });
  }
}
