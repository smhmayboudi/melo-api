import { HttpService, Injectable } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { Observable } from "rxjs";
import { DataConfigService } from "./data.config.service";
import { DataSongByIdDto } from "./dto/data.song.by.id.dto";
import { DataSongByIdsDto } from "./dto/data.song.by.ids.dto";
import { DataSongGenreDto } from "./dto/data.song.genre.dto";
import { DataSongLanguageDto } from "./dto/data.song.language.dto";
import { DataSongMoodDto } from "./dto/data.song.mood.dto";
import { DataSongNewDto } from "./dto/data.song.new.dto";
import { DataSongNewPodcastDto } from "./dto/data.song.new.podcast.dto";
import { DataSongPodcastDto } from "./dto/data.song.podcast.dto";
import { DataSongSimilarDto } from "./dto/data.song.similar.dto";
import { DataSongSliderLatestDto } from "./dto/data.song.slider.latest.dto";
import { DataSongTopDayDto } from "./dto/data.song.top.day.dto";
import { DataSongTopWeekDto } from "./dto/data.song.top.week.dto";
import { Song } from "./type/Song";
import { PaginationResult } from "./type/PaginationResult";

@Injectable()
export class DataSongService {
  constructor(
    private readonly httpService: HttpService,
    private readonly dataConfigService: DataConfigService
  ) {}

  byId(dto: DataSongByIdDto): Observable<AxiosResponse<Song>> {
    return this.httpService.get(
      `${this.dataConfigService.uri}/song/byId/${dto.id}`
    );
  }

  byIds(
    dto: DataSongByIdsDto
  ): Observable<AxiosResponse<PaginationResult<Song>>> {
    return this.httpService.get(`${this.dataConfigService.uri}/song/byIds`, {
      params: {
        ids: dto.ids
      }
    });
  }

  genre(
    dto: DataSongGenreDto
  ): Observable<AxiosResponse<PaginationResult<Song>>> {
    return this.httpService.get(
      `${this.dataConfigService.uri}/song/genre/${dto.orderBy}/${dto.from}/${dto.orderBy}`,
      {
        params: {
          genres: dto.genres
        }
      }
    );
  }

  language(
    dto: DataSongLanguageDto
  ): Observable<AxiosResponse<PaginationResult<Song>>> {
    return this.httpService.get(
      `${this.dataConfigService.uri}/song/language/${dto.language}/${dto.orderBy}/${dto.from}/${dto.limit}`
    );
  }

  mood(
    dto: DataSongMoodDto
  ): Observable<AxiosResponse<PaginationResult<Song>>> {
    return this.httpService.get(
      `${this.dataConfigService.uri}/song/mood/${dto.mood}/${dto.from}/${dto.limit}`
    );
  }

  new(dto: DataSongNewDto): Observable<AxiosResponse<PaginationResult<Song>>> {
    return this.httpService.get(
      `${this.dataConfigService.uri}/song/new/${dto.from}/${dto.limit}`
    );
  }

  newPodcast(
    dto: DataSongNewPodcastDto
  ): Observable<AxiosResponse<PaginationResult<Song>>> {
    return this.httpService.get(
      `${this.dataConfigService.uri}/song/new/podcast/${dto.from}/${dto.limit}`
    );
  }

  podcast(
    dto: DataSongPodcastDto
  ): Observable<AxiosResponse<PaginationResult<Song>>> {
    return this.httpService.get(
      `${this.dataConfigService.uri}/song/podcast/${dto.orderBy}/${dto.from}/${dto.limit}`,
      {
        params: {
          genres: dto.genres
        }
      }
    );
  }

  similar(
    dto: DataSongSimilarDto
  ): Observable<AxiosResponse<PaginationResult<Song>>> {
    return this.httpService.get(
      `${this.dataConfigService.uri}/song/similarv/${dto.songId}/${dto.from}/${dto.limit}`
    );
  }

  sliderLatest(
    _dto: DataSongSliderLatestDto
  ): Observable<AxiosResponse<PaginationResult<Song>>> {
    return this.httpService.get(
      `${this.dataConfigService.uri}/song/slider/latest`
    );
  }

  topDay(
    dto: DataSongTopDayDto
  ): Observable<AxiosResponse<PaginationResult<Song>>> {
    return this.httpService.get(
      `${this.dataConfigService.uri}/song/top/dayv/${dto.from}/${dto.limit}`
    );
  }

  topWeek(
    dto: DataSongTopWeekDto
  ): Observable<AxiosResponse<PaginationResult<Song>>> {
    return this.httpService.get(
      `${this.dataConfigService.uri}/song/top/week/${dto.from}/${dto.limit}`
    );
  }
}
