import { HttpService, Injectable } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { map } from "rxjs/operators";
import { DataConfigService } from "./data.config.service";
import { AlbumDto } from "./dto/album.dto";
import { DataAlbumDto } from "./dto/data.album.dto";
import { DataAlbumLatestDto } from "./dto/data.album.latest.dto";
import { PaginationResultDto } from "./dto/pagination.result.dto";

@Injectable()
export class DataAlbumService {
  constructor(
    private readonly httpService: HttpService,
    private readonly dataConfigService: DataConfigService
  ) {}

  async get(dto: DataAlbumDto): Promise<AlbumDto> {
    return this.httpService
      .get(`${this.dataConfigService.uri}/album/${dto.id}`)
      .pipe(
        map((value: AxiosResponse<AlbumDto>) => {
          return value.data;
        })
      )
      .toPromise();
  }

  async lstest(
    dto: DataAlbumLatestDto
  ): Promise<PaginationResultDto<AlbumDto>> {
    return this.httpService
      .get(
        `${this.dataConfigService.uri}/album/latest/${dto.language}/${dto.from}/${dto.limit}`
      )
      .pipe(
        map((value: AxiosResponse<PaginationResultDto<AlbumDto>>) => {
          return value.data;
        })
      )
      .toPromise();
  }
}
