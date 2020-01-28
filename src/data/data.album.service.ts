import { HttpService, Injectable } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { map } from "rxjs/operators";
import { DataConfigService } from "./data.config.service";
import { DataAlbumResDto } from "./dto/res/data.album.res.dto";
import { DataAlbumByIdReqDto } from "./dto/req/data.album.by-id.req.dto";
import { DataAlbumLatestReqDto } from "./dto/req/data.album.latest.req.dto";
import { DataPaginationResDto } from "./dto/res/data.pagination.res.dto";

@Injectable()
export class DataAlbumService {
  constructor(
    private readonly httpService: HttpService,
    private readonly dataConfigService: DataConfigService
  ) {}

  async byId(dto: DataAlbumByIdReqDto): Promise<DataAlbumResDto> {
    return this.httpService
      .get(`${this.dataConfigService.uri}/album/${dto.id}`)
      .pipe(
        map((value: AxiosResponse<DataAlbumResDto>) => {
          return value.data;
        })
      )
      .toPromise();
  }

  async lstest(
    dto: DataAlbumLatestReqDto
  ): Promise<DataPaginationResDto<DataAlbumResDto>> {
    return this.httpService
      .get(
        `${this.dataConfigService.uri}/album/latest/${dto.language}/${dto.from}/${dto.limit}`
      )
      .pipe(
        map((value: AxiosResponse<DataPaginationResDto<DataAlbumResDto>>) => {
          return value.data;
        })
      )
      .toPromise();
  }
}
