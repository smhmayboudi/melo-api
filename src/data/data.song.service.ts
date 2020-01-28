import { HttpService, Injectable } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { map } from "rxjs/operators";
import { DataConfigService } from "./data.config.service";
import { DataSongByIdReqDto } from "./dto/req/data.song.by-id.req.dto";
import { DataSongByIdsReqDto } from "./dto/req/data.song.by-ids.req.dto";
import { DataSongGenreReqDto } from "./dto/req/data.song.genre.req.dto";
import { DataSongLanguageReqDto } from "./dto/req/data.song.language.req.dto";
import { DataSongMoodReqDto } from "./dto/req/data.song.mood.req.dto";
import { DataSongNewReqDto } from "./dto/req/data.song.new.req.dto";
import { DataSongPodcastReqDto } from "./dto/req/data.song.podcast.req.dto";
import { DataSongSimilarReqDto } from "./dto/req/data.song.similar.req.dto";
import { DataSongTopDayReqDto } from "./dto/req/data.song.top-day.req.dto";
import { DataSongTopWeekReqDto } from "./dto/req/data.song.top-week.req.dto";
import { DataPaginationResDto } from "./dto/res/data.pagination.res.dto";
import { DataSongResDto } from "./dto/res/data.song.res.dto";

@Injectable()
export class DataSongService {
  constructor(
    private readonly httpService: HttpService,
    private readonly dataConfigService: DataConfigService
  ) {}

  async byId(dto: DataSongByIdReqDto): Promise<DataSongResDto> {
    return this.httpService
      .get(`${this.dataConfigService.uri}/song/byId/${dto.id}`)
      .pipe(
        map((value: AxiosResponse<DataSongResDto>) => {
          return value.data;
        })
      )
      .toPromise();
  }

  async byIds(
    dto: DataSongByIdsReqDto
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.httpService
      .get(`${this.dataConfigService.uri}/song/byIds`, {
        params: {
          ids: dto.ids
        }
      })
      .pipe(
        map((value: AxiosResponse<DataPaginationResDto<DataSongResDto>>) => {
          return value.data;
        })
      )
      .toPromise();
  }

  async genre(
    dto: DataSongGenreReqDto
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.httpService
      .get(
        `${this.dataConfigService.uri}/song/genre/${dto.orderBy}/${dto.from}/${dto.limit}/${dto.orderBy}`,
        {
          params: {
            genres: dto.genres
          }
        }
      )
      .pipe(
        map((value: AxiosResponse<DataPaginationResDto<DataSongResDto>>) => {
          return value.data;
        })
      )
      .toPromise();
  }

  async language(
    dto: DataSongLanguageReqDto
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.httpService
      .get(
        `${this.dataConfigService.uri}/song/language/${dto.language}/${dto.orderBy}/${dto.from}/${dto.limit}`
      )
      .pipe(
        map((value: AxiosResponse<DataPaginationResDto<DataSongResDto>>) => {
          return value.data;
        })
      )
      .toPromise();
  }

  async mood(
    dto: DataSongMoodReqDto
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.httpService
      .get(
        `${this.dataConfigService.uri}/song/mood/${dto.mood}/${dto.from}/${dto.limit}`
      )
      .pipe(
        map((value: AxiosResponse<DataPaginationResDto<DataSongResDto>>) => {
          return value.data;
        })
      )
      .toPromise();
  }

  async new(
    dto: DataSongNewReqDto
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.httpService
      .get(`${this.dataConfigService.uri}/song/new/${dto.from}/${dto.limit}`)
      .pipe(
        map((value: AxiosResponse<DataPaginationResDto<DataSongResDto>>) => {
          return value.data;
        })
      )
      .toPromise();
  }

  async newPodcast(
    from: number,
    limit: number
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.httpService
      .get(`${this.dataConfigService.uri}/song/new/podcast/${from}/${limit}`)
      .pipe(
        map((value: AxiosResponse<DataPaginationResDto<DataSongResDto>>) => {
          return value.data;
        })
      )
      .toPromise();
  }

  async podcast(
    dto: DataSongPodcastReqDto
  ): Promise<DataPaginationResDto<DataSongResDto>> {
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
        map((value: AxiosResponse<DataPaginationResDto<DataSongResDto>>) => {
          return value.data;
        })
      )
      .toPromise();
  }

  async similar(
    dto: DataSongSimilarReqDto
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.httpService
      .get(
        `${this.dataConfigService.uri}/song/similar/${dto.id}/${dto.from}/${dto.limit}`
      )
      .pipe(
        map((value: AxiosResponse<DataPaginationResDto<DataSongResDto>>) => {
          return value.data;
        })
      )
      .toPromise();
  }

  async sliderLatest(): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.httpService
      .get(`${this.dataConfigService.uri}/song/slider/latest`)
      .pipe(
        map((value: AxiosResponse<DataPaginationResDto<DataSongResDto>>) => {
          return value.data;
        })
      )
      .toPromise();
  }

  async topDay(
    dto: DataSongTopDayReqDto
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.httpService
      .get(
        `${this.dataConfigService.uri}/song/top/day/${dto.from}/${dto.limit}`
      )
      .pipe(
        map((value: AxiosResponse<DataPaginationResDto<DataSongResDto>>) => {
          return value.data;
        })
      )
      .toPromise();
  }

  async topWeek(
    dto: DataSongTopWeekReqDto
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    return this.httpService
      .get(
        `${this.dataConfigService.uri}/song/top/week/${dto.from}/${dto.limit}`
      )
      .pipe(
        map((value: AxiosResponse<DataPaginationResDto<DataSongResDto>>) => {
          return value.data;
        })
      )
      .toPromise();
  }
}
