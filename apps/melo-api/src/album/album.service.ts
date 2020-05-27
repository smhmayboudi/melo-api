import {
  AlbumArtistsReqDto,
  AlbumGetReqDto,
  AlbumLatestReqDto,
  AlbumResDto,
  DataPaginationResDto,
} from "@melo/common";
import { ApmAfterMethod, ApmBeforeMethod } from "@melo/apm";

import { AlbumServiceInterface } from "./album.service.interface";
import { DataAlbumService } from "../data/data.album.service";
import { Injectable } from "@nestjs/common";
import { PromMethodCounter } from "@melo/prom";

@Injectable()
// @PromInstanceCounter
export class AlbumService implements AlbumServiceInterface {
  constructor(private readonly dataAlbumService: DataAlbumService) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  albums(dto: AlbumArtistsReqDto): Promise<DataPaginationResDto<AlbumResDto>> {
    return this.dataAlbumService.albums(dto);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  get(dto: AlbumGetReqDto): Promise<AlbumResDto> {
    return this.dataAlbumService.get(dto);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  latest(dto: AlbumLatestReqDto): Promise<DataPaginationResDto<AlbumResDto>> {
    return this.dataAlbumService.latest(dto);
  }
}
