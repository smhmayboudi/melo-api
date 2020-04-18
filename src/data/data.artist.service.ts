import { ApmAfterMethod, ApmBeforeMethod } from "../apm/apm.decorator";
import { HttpService, Injectable } from "@nestjs/common";

import { DataArtistByIdReqDto } from "./dto/req/data.artist.by-id.req.dto";
import { DataArtistByIdsReqDto } from "./dto/req/data.artist.by.ids.req.dto";
import { DataArtistResDto } from "./dto/res/data.artist.res.dto";
import { DataArtistServiceInterface } from "./data.artist.service.interface";
import { DataConfigService } from "./data.config.service";
import { DataPaginationResDto } from "./dto/res/data.pagination.res.dto";
import { DataTrendingGenreReqDto } from "./dto/req/data.trending-genre.req.dto";
import { PromMethodCounter } from "../prom/prom.decorator";
import { map } from "rxjs/operators";

@Injectable()
// @PromInstanceCounter
export class DataArtistService implements DataArtistServiceInterface {
  constructor(
    private readonly dataConfigService: DataConfigService,
    private readonly httpService: HttpService
  ) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async byId(dto: DataArtistByIdReqDto): Promise<DataArtistResDto> {
    return this.httpService
      .get<DataArtistResDto>(
        `${this.dataConfigService.url}/artist/byId/${dto.id}`
      )
      .pipe(map((value) => value.data))
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async byIds(
    dto: DataArtistByIdsReqDto
  ): Promise<DataPaginationResDto<DataArtistResDto>> {
    return this.httpService
      .get<DataPaginationResDto<DataArtistResDto>>(
        `${this.dataConfigService.url}/artist/byIds`,
        {
          params: {
            artistsIds: dto.ids,
          },
        }
      )
      .pipe(map((value) => value.data))
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async trending(): Promise<DataPaginationResDto<DataArtistResDto>> {
    return this.httpService
      .get<DataPaginationResDto<DataArtistResDto>>(
        `${this.dataConfigService.url}/artist/trending`
      )
      .pipe(map((value) => value.data))
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async trendingGenre(
    dto: DataTrendingGenreReqDto
  ): Promise<DataPaginationResDto<DataArtistResDto>> {
    return this.httpService
      .get<DataPaginationResDto<DataArtistResDto>>(
        `${this.dataConfigService.url}/artist/trending/genre/${dto.genre}`
      )
      .pipe(map((value) => value.data))
      .toPromise();
  }
}
