import { HttpService, Injectable } from "@nestjs/common";
import { AxiosResponse } from "axios";
// import { Counter } from "prom-client";
import { map } from "rxjs/operators";
// import { InjectCounter } from "../prom/prom.decorators";
import { DataConfigService } from "./data.config.service";
// import { DataModule } from "./data.module";
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
    // @InjectCounter("data")
    // private readonly counter: Counter,
    private readonly dataConfigService: DataConfigService,
    private readonly httpService: HttpService
  ) {}

  async artistSongs(
    dto: DataSongArtistsReqDto
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    // this.counter.inc({
    //   module: DataModule.name,
    //   service: DataSongService.name,
    //   function: this.artistSongs.name
    // });
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
    // this.counter.inc({
    //   module: DataModule.name,
    //   service: DataSongService.name,
    //   function: this.artistSongsTop.name
    // });
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
    // this.counter.inc({
    //   module: DataModule.name,
    //   service: DataSongService.name,
    //   function: this.byId.name
    // });
    return this.httpService
      .get(`${this.dataConfigService.url}/song/byId/${dto.id}`)
      .pipe(map((value: AxiosResponse<DataSongResDto>) => value.data))
      .toPromise();
  }

  async byIds(
    dto: DataSongByIdsReqDto
  ): Promise<DataPaginationResDto<DataSongResDto>> {
    // this.counter.inc({
    //   module: DataModule.name,
    //   service: DataSongService.name,
    //   function: this.byIds.name
    // });
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
    // this.counter.inc({
    //   module: DataModule.name,
    //   service: DataSongService.name,
    //   function: this.genre.name
    // });
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
    // this.counter.inc({
    //   module: DataModule.name,
    //   service: DataSongService.name,
    //   function: this.language.name
    // });
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
    // this.counter.inc({
    //   module: DataModule.name,
    //   service: DataSongService.name,
    //   function: this.mood.name
    // });
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
    // this.counter.inc({
    //   module: DataModule.name,
    //   service: DataSongService.name,
    //   function: this.new.name
    // });
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
    // this.counter.inc({
    //   module: DataModule.name,
    //   service: DataSongService.name,
    //   function: this.newPodcast.name
    // });
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
    // this.counter.inc({
    //   module: DataModule.name,
    //   service: DataSongService.name,
    //   function: this.podcast.name
    // });
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
    // this.counter.inc({
    //   module: DataModule.name,
    //   service: DataSongService.name,
    //   function: this.searchMood.name
    // });
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
    // this.counter.inc({
    //   module: DataModule.name,
    //   service: DataSongService.name,
    //   function: this.similar.name
    // });
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
    // this.counter.inc({
    //   module: DataModule.name,
    //   service: DataSongService.name,
    //   function: this.slider.name
    // });
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
    // this.counter.inc({
    //   module: DataModule.name,
    //   service: DataSongService.name,
    //   function: this.topDay.name
    // });
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
    // this.counter.inc({
    //   module: DataModule.name,
    //   service: DataSongService.name,
    //   function: this.topWeek.name
    // });
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
