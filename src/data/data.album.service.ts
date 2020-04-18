import { ApmAfterMethod, ApmBeforeMethod } from "../apm/apm.decorator";
import { HttpService, Injectable } from "@nestjs/common";

import { DataAlbumArtistsReqDto } from "./dto/req/data.album.artists.req.dto";
import { DataAlbumByIdReqDto } from "./dto/req/data.album.by-id.req.dto";
import { DataAlbumLatestReqDto } from "./dto/req/data.album.latest.req.dto";
import { DataAlbumResDto } from "./dto/res/data.album.res.dto";
import { DataAlbumServiceInterface } from "./data.album.service.interface";
import { DataConfigService } from "./data.config.service";
import { DataPaginationResDto } from "./dto/res/data.pagination.res.dto";
import { PromMethodCounter } from "../prom/prom.decorator";
import { map } from "rxjs/operators";

@Injectable()
// @PromInstanceCounter
export class DataAlbumService implements DataAlbumServiceInterface {
  constructor(
    private readonly dataConfigService: DataConfigService,
    private readonly httpService: HttpService
  ) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async albums(
    dto: DataAlbumArtistsReqDto
  ): Promise<DataPaginationResDto<DataAlbumResDto>> {
    return this.httpService
      .get<DataPaginationResDto<DataAlbumResDto>>(
        `${this.dataConfigService.url}/artist/albums/${dto.id}/${dto.from}/${dto.limit}`
      )
      .pipe(map((value) => value.data))
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async byId(dto: DataAlbumByIdReqDto): Promise<DataAlbumResDto> {
    return this.httpService
      .get<DataAlbumResDto>(`${this.dataConfigService.url}/album/${dto.id}`)
      .pipe(map((value) => value.data))
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async latest(
    dto: DataAlbumLatestReqDto
  ): Promise<DataPaginationResDto<DataAlbumResDto>> {
    return this.httpService
      .get<DataPaginationResDto<DataAlbumResDto>>(
        `${this.dataConfigService.url}/album/latest/${dto.language}/${dto.from}/${dto.limit}`
      )
      .pipe(map((value) => value.data))
      .toPromise();
  }
}
