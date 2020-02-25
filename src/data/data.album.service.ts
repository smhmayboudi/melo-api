import { HttpService, Injectable } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { map } from "rxjs/operators";
import {
  // PromInstanceCounter,
  PromMethodCounter
} from "../prom/prom.decorator";
import { DataConfigService } from "./data.config.service";
import { DataAlbumArtistsReqDto } from "./dto/req/data.album.artists.req.dto";
import { DataAlbumByIdReqDto } from "./dto/req/data.album.by-id.req.dto";
import { DataAlbumLatestReqDto } from "./dto/req/data.album.latest.req.dto";
import { DataAlbumResDto } from "./dto/res/data.album.res.dto";
import { DataPaginationResDto } from "./dto/res/data.pagination.res.dto";

@Injectable()
// @PromInstanceCounter
export class DataAlbumService {
  constructor(
    private readonly dataConfigService: DataConfigService,
    private readonly httpService: HttpService
  ) {}

  @PromMethodCounter
  async albums(
    dto: DataAlbumArtistsReqDto
  ): Promise<DataPaginationResDto<DataAlbumResDto>> {
    return this.httpService
      .get(
        `${this.dataConfigService.url}/artist/albums/${dto.id}/${dto.from}/${dto.limit}`
      )
      .pipe(
        map(
          (value: AxiosResponse<DataPaginationResDto<DataAlbumResDto>>) =>
            value.data
        )
      )
      .toPromise();
  }

  @PromMethodCounter
  async byId(dto: DataAlbumByIdReqDto): Promise<DataAlbumResDto> {
    return this.httpService
      .get(`${this.dataConfigService.url}/album/${dto.id}`)
      .pipe(map((value: AxiosResponse<DataAlbumResDto>) => value.data))
      .toPromise();
  }

  @PromMethodCounter
  async latest(
    dto: DataAlbumLatestReqDto
  ): Promise<DataPaginationResDto<DataAlbumResDto>> {
    return this.httpService
      .get(
        `${this.dataConfigService.url}/album/latest/${dto.language}/${dto.from}/${dto.limit}`
      )
      .pipe(
        map(
          (value: AxiosResponse<DataPaginationResDto<DataAlbumResDto>>) =>
            value.data
        )
      )
      .toPromise();
  }
}
