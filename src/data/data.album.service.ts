import { HttpService, Injectable } from "@nestjs/common";
import { AxiosResponse } from "axios";
// import { Counter } from "prom-client";
import { map } from "rxjs/operators";
// import { InjectCounter } from "../prom/prom.decorators";
import { DataConfigService } from "./data.config.service";
// import { DataModule } from "./data.module";
import { DataAlbumArtistsReqDto } from "./dto/req/data.album.artists.req.dto";
import { DataAlbumByIdReqDto } from "./dto/req/data.album.by-id.req.dto";
import { DataAlbumLatestReqDto } from "./dto/req/data.album.latest.req.dto";
import { DataAlbumResDto } from "./dto/res/data.album.res.dto";
import { DataPaginationResDto } from "./dto/res/data.pagination.res.dto";

@Injectable()
export class DataAlbumService {
  constructor(
    // @InjectCounter("data")
    // private readonly counter: Counter,
    private readonly dataConfigService: DataConfigService,
    private readonly httpService: HttpService
  ) {}

  async albums(
    dto: DataAlbumArtistsReqDto
  ): Promise<DataPaginationResDto<DataAlbumResDto>> {
    // this.counter.inc({
    //   module: DataModule.name,
    //   service: DataAlbumService.name,
    //   function: this.albums.name
    // });
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

  async byId(dto: DataAlbumByIdReqDto): Promise<DataAlbumResDto> {
    // this.counter.inc({
    //   module: DataModule.name,
    //   service: DataAlbumService.name,
    //   function: this.byId.name
    // });
    return this.httpService
      .get(`${this.dataConfigService.url}/album/${dto.id}`)
      .pipe(map((value: AxiosResponse<DataAlbumResDto>) => value.data))
      .toPromise();
  }

  async latest(
    dto: DataAlbumLatestReqDto
  ): Promise<DataPaginationResDto<DataAlbumResDto>> {
    // this.counter.inc({
    //   module: DataModule.name,
    //   service: DataAlbumService.name,
    //   function: this.latest.name
    // });
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
