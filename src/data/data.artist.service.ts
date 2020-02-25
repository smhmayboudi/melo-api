import { HttpService, Injectable } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { map } from "rxjs/operators";
import {
  // PromInstanceCounter,
  PromMethodCounter
} from "../prom/prom.decorator";
import { DataConfigService } from "./data.config.service";
import { DataArtistByIdReqDto } from "./dto/req/data.artist.by-id.req.dto";
import { DataArtistByIdsReqDto } from "./dto/req/data.artist.by.ids.req.dto";
import { DataTrendingGenreReqDto } from "./dto/req/data.trending-genre.req.dto";
import { DataArtistResDto } from "./dto/res/data.artist.res.dto";
import { DataPaginationResDto } from "./dto/res/data.pagination.res.dto";

@Injectable()
// @PromInstanceCounter
export class DataArtistService {
  constructor(
    private readonly dataConfigService: DataConfigService,
    private readonly httpService: HttpService
  ) {}

  @PromMethodCounter
  async byId(dto: DataArtistByIdReqDto): Promise<DataArtistResDto> {
    return this.httpService
      .get(`${this.dataConfigService.url}/artist/byId/${dto.id}`)
      .pipe(map((value: AxiosResponse<DataArtistResDto>) => value.data))
      .toPromise();
  }

  @PromMethodCounter
  async byIds(
    dto: DataArtistByIdsReqDto
  ): Promise<DataPaginationResDto<DataArtistResDto>> {
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

  @PromMethodCounter
  async trending(): Promise<DataPaginationResDto<DataArtistResDto>> {
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

  @PromMethodCounter
  async trendingGenre(
    dto: DataTrendingGenreReqDto
  ): Promise<DataPaginationResDto<DataArtistResDto>> {
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
