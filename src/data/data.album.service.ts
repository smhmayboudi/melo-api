import { HttpService, Injectable } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { Observable } from "rxjs";
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

  album(dto: DataAlbumDto): Observable<AxiosResponse<AlbumDto>> {
    return this.httpService.get(
      `${this.dataConfigService.uri}/album/${dto.albumId}`
    );
  }

  lstest(
    dto: DataAlbumLatestDto
  ): Observable<AxiosResponse<PaginationResultDto<AlbumDto>>> {
    return this.httpService.get(
      `${this.dataConfigService.uri}/album/latest/${dto.language}/${dto.from}/${dto.limit}`
    );
  }
}
