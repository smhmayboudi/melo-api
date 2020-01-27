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
import { DataSongTopDayDto } from "./dto/data.song.top.day.dto";
import { DataSongTopWeekDto } from "./dto/data.song.top.week.dto";
import { PaginationResultDto } from "./dto/pagination.result.dto";
import { SongDto } from "./dto/song.dto";
import { OrderBy } from "./type/order-by.type";

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

  async genre(
    from: number,
    genres: string[],
    limit: number,
    orderBy: OrderBy
  ): Promise<PaginationResultDto<SongDto>> {
    return this.httpService
      .get(
        `${this.dataConfigService.uri}/song/genre/${orderBy}/${from}/${limit}/${orderBy}`,
        {
          params: {
            genres: genres
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
    from: number,
    limit: number
  ): Promise<PaginationResultDto<SongDto>> {
    return this.httpService
      .get(`${this.dataConfigService.uri}/song/new/podcast/${from}/${limit}`)
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
    // TODO: test params
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
        `${this.dataConfigService.uri}/song/similar/${dto.id}/${dto.from}/${dto.limit}`
      )
      .pipe(
        map((value: AxiosResponse<PaginationResultDto<SongDto>>) => {
          return value.data;
        })
      )
      .toPromise();
  }

  async sliderLatest(): Promise<PaginationResultDto<SongDto>> {
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
        `${this.dataConfigService.uri}/song/top/day/${dto.from}/${dto.limit}`
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
