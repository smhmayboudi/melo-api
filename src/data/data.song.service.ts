import { CounterMetric, InjectCounterMetric } from "@digikare/nestjs-prom";
import { HttpService, Injectable } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { map } from "rxjs/operators";
import { DataConfigService } from "./data.config.service";
import { DataSongArtistSongsTopReqDto } from "./dto/req/data.song.artist-songs-top.req.dto";
import { DataSongArtistsReqDto } from "./dto/req/data.song.artists.req.dto";
import { DataSongByIdReqDto } from "./dto/req/data.song.by-id.req.dto";
import { DataSongByIdsReqDto } from "./dto/req/data.song.by-ids.req.dto";
import { DataSongGenreReqDto } from "./dto/req/data.song.genre.req.dto";
import { DataSongLanguageReqDto } from "./dto/req/data.song.language.req.dto";
import { DataSongMoodReqDto } from "./dto/req/data.song.mood.req.dto";
import { DataSongNewPodcastReqDto } from "./dto/req/data.song.new-podcast.req.dto";
import { DataSongNewReqDto } from "./dto/req/data.song.new.req.dto";
import { DataSongPodcastReqDto } from "./dto/req/data.song.podcast.req.dto";
import { DataSongSearchMoodReqDto } from "./dto/req/data.song.search-mood.req.dto";
import { DataSongSimilarReqDto } from "./dto/req/data.song.similar.req.dto";
import { DataSongTopDayReqDto } from "./dto/req/data.song.top-day.req.dto";
import { DataSongTopWeekReqDto } from "./dto/req/data.song.top-week.req.dto";
import { DataPaginationResDto } from "./dto/res/data.pagination.res.dto";
import { DataSongResDto } from "./dto/res/data.song.res.dto";

@Injectable()
export class DataSongService {
  constructor(
    @InjectCounterMetric("data_counter")
    private readonly counterMetric: CounterMetric,
    private readonly dataConfigService: DataConfigService,
    private readonly httpService: HttpService
  ) {}

  async artistSongs(
    dto: DataSongArtistsReqDto
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    this.counterMetric.inc(
      { module: "data", service: "song", function: "artistSongs" },
      1,
      Date.now()
    );
    return this.httpService
      .get(
        `${this.dataConfigService.url}/artist/songs/${dto.id}/${dto.from}/${dto.limit}`
      )
      .pipe(
        map(
          (value: AxiosResponse<DataPaginationResDto<DataSongResDto>>) =>
            value.data
        )
      )
      .toPromise();
  }

  async artistSongsTop(
    dto: DataSongArtistSongsTopReqDto
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    this.counterMetric.inc(
      { module: "data", service: "song", function: "artistSongsTop" },
      1,
      Date.now()
    );
    return this.httpService
      .get(
        `${this.dataConfigService.url}/artist/songs/top/${dto.id}/${dto.from}/${dto.limit}`
      )
      .pipe(
        map(
          (value: AxiosResponse<DataPaginationResDto<DataSongResDto>>) =>
            value.data
        )
      )
      .toPromise();
  }

  async byId(dto: DataSongByIdReqDto): Promise<DataSongResDto> {
    this.counterMetric.inc(
      { module: "data", service: "song", function: "byId" },
      1,
      Date.now()
    );
    return this.httpService
      .get(`${this.dataConfigService.url}/song/byId/${dto.id}`)
      .pipe(map((value: AxiosResponse<DataSongResDto>) => value.data))
      .toPromise();
  }

  async byIds(
    dto: DataSongByIdsReqDto
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    this.counterMetric.inc(
      { module: "data", service: "song", function: "byIds" },
      1,
      Date.now()
    );
    return this.httpService
      .get(`${this.dataConfigService.url}/song/byIds`, {
        params: {
          ids: dto.ids
        }
      })
      .pipe(
        map(
          (value: AxiosResponse<DataPaginationResDto<DataSongResDto>>) =>
            value.data
        )
      )
      .toPromise();
  }

  async genre(
    dto: DataSongGenreReqDto
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    this.counterMetric.inc(
      { module: "data", service: "song", function: "genre" },
      1,
      Date.now()
    );
    return this.httpService
      .get(
        `${this.dataConfigService.url}/song/genre/${dto.orderBy}/${dto.from}/${dto.limit}`,
        {
          params: {
            genres: dto.genres
          }
        }
      )
      .pipe(
        map(
          (value: AxiosResponse<DataPaginationResDto<DataSongResDto>>) =>
            value.data
        )
      )
      .toPromise();
  }

  async language(
    dto: DataSongLanguageReqDto
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    this.counterMetric.inc(
      { module: "data", service: "song", function: "language" },
      1,
      Date.now()
    );
    return this.httpService
      .get(
        `${this.dataConfigService.url}/song/language/${dto.language}/${dto.orderBy}/${dto.from}/${dto.limit}`
      )
      .pipe(
        map(
          (value: AxiosResponse<DataPaginationResDto<DataSongResDto>>) =>
            value.data
        )
      )
      .toPromise();
  }

  async mood(
    dto: DataSongMoodReqDto
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    this.counterMetric.inc(
      { module: "data", service: "song", function: "mood" },
      1,
      Date.now()
    );
    return this.httpService
      .get(
        `${this.dataConfigService.url}/song/mood/${dto.mood}/${dto.from}/${dto.limit}`
      )
      .pipe(
        map(
          (value: AxiosResponse<DataPaginationResDto<DataSongResDto>>) =>
            value.data
        )
      )
      .toPromise();
  }

  async new(
    dto: DataSongNewReqDto
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    this.counterMetric.inc(
      { module: "data", service: "song", function: "new" },
      1,
      Date.now()
    );
    return this.httpService
      .get(`${this.dataConfigService.url}/song/new/${dto.from}/${dto.limit}`)
      .pipe(
        map(
          (value: AxiosResponse<DataPaginationResDto<DataSongResDto>>) =>
            value.data
        )
      )
      .toPromise();
  }

  async newPodcast(
    dto: DataSongNewPodcastReqDto
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    this.counterMetric.inc(
      { module: "data", service: "song", function: "newPodcast" },
      1,
      Date.now()
    );
    return this.httpService
      .get(
        `${this.dataConfigService.url}/song/new/podcast/${dto.from}/${dto.limit}`
      )
      .pipe(
        map(
          (value: AxiosResponse<DataPaginationResDto<DataSongResDto>>) =>
            value.data
        )
      )
      .toPromise();
  }

  async podcast(
    dto: DataSongPodcastReqDto
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    this.counterMetric.inc(
      { module: "data", service: "song", function: "podcast" },
      1,
      Date.now()
    );
    return this.httpService
      .get(
        `${this.dataConfigService.url}/song/podcast/${dto.orderBy}/${dto.from}/${dto.limit}`,
        {
          params: {
            genres: dto.genres
          }
        }
      )
      .pipe(
        map(
          (value: AxiosResponse<DataPaginationResDto<DataSongResDto>>) =>
            value.data
        )
      )
      .toPromise();
  }

  async searchMood(
    dto: DataSongSearchMoodReqDto
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    this.counterMetric.inc(
      { module: "data", service: "song", function: "searchMood" },
      1,
      Date.now()
    );
    return this.httpService
      .get(
        `${this.dataConfigService.url}/search/mood/${dto.from}/${dto.limit}`,
        {
          params: {
            date: dto.date,
            classy: dto.classy,
            energetic: dto.energetic,
            happiness: dto.happiness,
            romantic: dto.romantic
          }
        }
      )
      .pipe(
        map(
          (value: AxiosResponse<DataPaginationResDto<DataSongResDto>>) =>
            value.data
        )
      )
      .toPromise();
  }

  async similar(
    dto: DataSongSimilarReqDto
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    this.counterMetric.inc(
      { module: "data", service: "song", function: "similar" },
      1,
      Date.now()
    );
    return this.httpService
      .get(
        `${this.dataConfigService.url}/song/similar/${dto.id}/${dto.from}/${dto.limit}`
      )
      .pipe(
        map(
          (value: AxiosResponse<DataPaginationResDto<DataSongResDto>>) =>
            value.data
        )
      )
      .toPromise();
  }

  async slider(): Promise<DataPaginationResDto<DataSongResDto>> {
    this.counterMetric.inc(
      { module: "data", service: "song", function: "slider" },
      1,
      Date.now()
    );
    return this.httpService
      .get(`${this.dataConfigService.url}/song/slider/latest`)
      .pipe(
        map(
          (value: AxiosResponse<DataPaginationResDto<DataSongResDto>>) =>
            value.data
        )
      )
      .toPromise();
  }

  async topDay(
    dto: DataSongTopDayReqDto
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    this.counterMetric.inc(
      { module: "data", service: "song", function: "topDay" },
      1,
      Date.now()
    );
    return this.httpService
      .get(
        `${this.dataConfigService.url}/song/top/day/${dto.from}/${dto.limit}`
      )
      .pipe(
        map(
          (value: AxiosResponse<DataPaginationResDto<DataSongResDto>>) =>
            value.data
        )
      )
      .toPromise();
  }

  async topWeek(
    dto: DataSongTopWeekReqDto
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    this.counterMetric.inc(
      { module: "data", service: "song", function: "topWeek" },
      1,
      Date.now()
    );
    return this.httpService
      .get(
        `${this.dataConfigService.url}/song/top/week/${dto.from}/${dto.limit}`
      )
      .pipe(
        map(
          (value: AxiosResponse<DataPaginationResDto<DataSongResDto>>) =>
            value.data
        )
      )
      .toPromise();
  }
}
