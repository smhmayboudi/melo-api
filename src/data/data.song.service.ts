import { HttpService, Injectable } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { map } from "rxjs/operators";
import { DataConfigService } from "./data.config.service";
import { DataSongByIdDto } from "./dto/data.song.by.id.dto";
import { DataSongByIdsDto } from "./dto/data.song.by.ids.dto";
import { DataSongLanguageDto } from "./dto/data.song.language.dto";
import { DataSongMoodDto } from "./dto/data.song.mood.dto";
import { DataSongNewDto } from "./dto/data.song.new.dto";
import { DataSongPodcastDto } from "./dto/data.song.podcast.dto";
import { DataSongSimilarDto } from "./dto/data.song.similar.dto";
import { DataSongSliderLatestDto } from "./dto/data.song.slider.latest.dto";
import { DataSongTopDayDto } from "./dto/data.song.top.day.dto";
import { DataSongTopWeekDto } from "./dto/data.song.top.week.dto";
import { PaginationResultDto } from "./dto/pagination.result.dto";
import { SongDto } from "./dto/song.dto";
import { SongGenreDto } from "src/song/dto/song.genre.dto";
import { SongNewPodcastDto } from "src/song/dto/song.new.podcast.dto";

@Injectable()
export class DataSongService {
  constructor(
    private readonly httpService: HttpService,
    private readonly dataConfigService: DataConfigService
  ) {}

  async byId(dto: DataSongByIdDto): Promise<SongDto> {
    return this.httpService
      .get(`${this.dataConfigService.uri}/song/byId/${dto.id}`)
      .pipe(
        map((value: AxiosResponse<SongDto>) => {
          return value.data;
        })
      )
      .toPromise();
  }

  async byIds(dto: DataSongByIdsDto): Promise<PaginationResultDto<SongDto>> {
    return this.httpService
      .get(`${this.dataConfigService.uri}/song/byIds`, {
        params: {
          ids: dto.ids
        }
      })
      .pipe(
        map((value: AxiosResponse<PaginationResultDto<SongDto>>) => {
          return value.data;
        })
      )
      .toPromise();
  }

  async genre(dto: SongGenreDto): Promise<PaginationResultDto<SongDto>> {
    return this.httpService
      .get(
        `${this.dataConfigService.uri}/song/genre/${dto.orderBy}/${dto.from}/${dto.orderBy}`,
        {
          params: {
            genres: dto.genres
          }
        }
      )
      .pipe(
        map((value: AxiosResponse<PaginationResultDto<SongDto>>) => {
          return value.data;
        })
      )
      .toPromise();
  }

  async language(
    dto: DataSongLanguageDto
  ): Promise<PaginationResultDto<SongDto>> {
    return this.httpService
      .get(
        `${this.dataConfigService.uri}/song/language/${dto.language}/${dto.orderBy}/${dto.from}/${dto.limit}`
      )
      .pipe(
        map((value: AxiosResponse<PaginationResultDto<SongDto>>) => {
          return value.data;
        })
      )
      .toPromise();
  }

  async mood(dto: DataSongMoodDto): Promise<PaginationResultDto<SongDto>> {
    return this.httpService
      .get(
        `${this.dataConfigService.uri}/song/mood/${dto.mood}/${dto.from}/${dto.limit}`
      )
      .pipe(
        map((value: AxiosResponse<PaginationResultDto<SongDto>>) => {
          return value.data;
        })
      )
      .toPromise();
  }

  async new(dto: DataSongNewDto): Promise<PaginationResultDto<SongDto>> {
    return this.httpService
      .get(`${this.dataConfigService.uri}/song/new/${dto.from}/${dto.limit}`)
      .pipe(
        map((value: AxiosResponse<PaginationResultDto<SongDto>>) => {
          return value.data;
        })
      )
      .toPromise();
  }

  async newPodcast(
    dto: SongNewPodcastDto
  ): Promise<PaginationResultDto<SongDto>> {
    return this.httpService
      .get(
        `${this.dataConfigService.uri}/song/new/podcast/${dto.from}/${dto.limit}`
      )
      .pipe(
        map((value: AxiosResponse<PaginationResultDto<SongDto>>) => {
          return value.data;
        })
      )
      .toPromise();
  }

  async podcast(
    dto: DataSongPodcastDto
  ): Promise<PaginationResultDto<SongDto>> {
    return this.httpService
      .get(
        `${this.dataConfigService.uri}/song/podcast/${dto.orderBy}/${dto.from}/${dto.limit}`,
        {
          params: {
            genres: dto.genres
          }
        }
      )
      .pipe(
        map((value: AxiosResponse<PaginationResultDto<SongDto>>) => {
          return value.data;
        })
      )
      .toPromise();
  }

  async similar(
    dto: DataSongSimilarDto
  ): Promise<PaginationResultDto<SongDto>> {
    return this.httpService
      .get(
        `${this.dataConfigService.uri}/song/similarv/${dto.songId}/${dto.from}/${dto.limit}`
      )
      .pipe(
        map((value: AxiosResponse<PaginationResultDto<SongDto>>) => {
          return value.data;
        })
      )
      .toPromise();
  }

  async sliderLatest(
    _dto: DataSongSliderLatestDto
  ): Promise<PaginationResultDto<SongDto>> {
    return this.httpService
      .get(`${this.dataConfigService.uri}/song/slider/latest`)
      .pipe(
        map((value: AxiosResponse<PaginationResultDto<SongDto>>) => {
          return value.data;
        })
      )
      .toPromise();
  }

  async topDay(dto: DataSongTopDayDto): Promise<PaginationResultDto<SongDto>> {
    return this.httpService
      .get(
        `${this.dataConfigService.uri}/song/top/dayv/${dto.from}/${dto.limit}`
      )
      .pipe(
        map((value: AxiosResponse<PaginationResultDto<SongDto>>) => {
          return value.data;
        })
      )
      .toPromise();
  }

  async topWeek(
    dto: DataSongTopWeekDto
  ): Promise<PaginationResultDto<SongDto>> {
    return this.httpService
      .get(
        `${this.dataConfigService.uri}/song/top/week/${dto.from}/${dto.limit}`
      )
      .pipe(
        map((value: AxiosResponse<PaginationResultDto<SongDto>>) => {
          return value.data;
        })
      )
      .toPromise();
  }
}
