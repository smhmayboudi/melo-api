import { HttpService, Injectable } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { Observable } from "rxjs";
import { DataConfigService } from "./data.config.service";
import { DataAlbumDto } from "./dto/data.album.dto";
import { DataAlbumLatestDto } from "./dto/data.album.latest.dto";
import { Album } from "./type/Album";
import { PaginationResult } from "./type/PaginationResult";

@Injectable()
export class DataAlbumService {
  constructor(
    private readonly httpService: HttpService,
    private readonly dataConfigService: DataConfigService
  ) {}

  album(dto: DataAlbumDto): Observable<AxiosResponse<Album>> {
    return this.httpService.get(
      `${this.dataConfigService.uri}/album/${dto.albumId}`
    );
  }

  lstest(
    dto: DataAlbumLatestDto
  ): Observable<AxiosResponse<PaginationResult<Album>>> {
    return this.httpService.get(
      `${this.dataConfigService.uri}/album/latest/${dto.language}/${dto.from}/${dto.limit}`
    );
  }
}
