import { HttpService, Injectable } from "@nestjs/common";
import { AxiosResponse } from "axios";
// import { Counter } from "prom-client";
import { map } from "rxjs/operators";
// import { InjectCounter } from "../prom/prom.decorators";
import { DataConfigService } from "./data.config.service";
// import { DataModule } from "./data.module";
import { DataArtistByIdReqDto } from "./dto/req/data.artist.by-id.req.dto";
import { DataArtistByIdsReqDto } from "./dto/req/data.artist.by.ids.req.dto";
import { DataTrendingGenreReqDto } from "./dto/req/data.trending-genre.req.dto";
import { DataArtistResDto } from "./dto/res/data.artist.res.dto";
import { DataPaginationResDto } from "./dto/res/data.pagination.res.dto";

@Injectable()
export class DataArtistService {
  constructor(
    // @InjectCounter("data")
    // private readonly counter: Counter,
    private readonly dataConfigService: DataConfigService,
    private readonly httpService: HttpService
  ) {}

  async byId(dto: DataArtistByIdReqDto): Promise<DataArtistResDto> {
    return this.httpService
      .get(`${this.dataConfigService.url}/artist/byId/${dto.id}`)
      .pipe(map((value: AxiosResponse<DataArtistResDto>) => value.data))
      .toPromise();
  }

  async byIds(
    dto: DataArtistByIdsReqDto
  ): Promise<DataPaginationResDto<DataArtistResDto>> {
    // this.counter.inc({
    //   module: DataModule.name,
    //   service: DataArtistService.name,
    //   function: this.byIds.name
    // });
    return this.httpService
      .get(`${this.dataConfigService.url}/artist/byIds`, {
        params: {
          artistsIds: dto.ids
        }
      })
      .pipe(
        map(
          (value: AxiosResponse<DataPaginationResDto<DataArtistResDto>>) =>
            value.data
        )
      )
      .toPromise();
  }

  async trending(): Promise<DataPaginationResDto<DataArtistResDto>> {
    // this.counter.inc({
    //   module: DataModule.name,
    //   service: DataArtistService.name,
    //   function: this.trending.name
    // });
    return this.httpService
      .get(`${this.dataConfigService.url}/artist/trending`)
      .pipe(
        map(
          (value: AxiosResponse<DataPaginationResDto<DataArtistResDto>>) =>
            value.data
        )
      )
      .toPromise();
  }

  async trendingGenre(
    dto: DataTrendingGenreReqDto
  ): Promise<DataPaginationResDto<DataArtistResDto>> {
    // this.counter.inc({
    //   module: DataModule.name,
    //   service: DataArtistService.name,
    //   function: this.trendingGenre.name
    // });
    return this.httpService
      .get(`${this.dataConfigService.url}/artist/trending/genre/${dto.genre}`)
      .pipe(
        map(
          (value: AxiosResponse<DataPaginationResDto<DataArtistResDto>>) =>
            value.data
        )
      )
      .toPromise();
  }
}
