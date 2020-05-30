import {
  AlbumArtistsReqDto,
  AlbumGetReqDto,
  AlbumLatestReqDto,
  AlbumResDto,
  DATA_ALBUM_SERVICE_ALBUMS,
  DATA_ALBUM_SERVICE_GET,
  DATA_ALBUM_SERVICE_LATEST,
  DATA_SERVICE,
} from "@melo/common";
import { ApmAfterMethod, ApmBeforeMethod } from "@melo/apm";
import { Inject, Injectable } from "@nestjs/common";

import { AlbumServiceInterface } from "./album.service.interface";
import { ClientProxy } from "@nestjs/microservices";
import { PromMethodCounter } from "@melo/prom";

@Injectable()
// @PromInstanceCounter
export class AlbumService implements AlbumServiceInterface {
  constructor(
    @Inject(DATA_SERVICE) private readonly clientProxy: ClientProxy
  ) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async albums(dto: AlbumArtistsReqDto): Promise<AlbumResDto[]> {
    return this.clientProxy
      .send<AlbumResDto[], AlbumArtistsReqDto>(DATA_ALBUM_SERVICE_ALBUMS, {
        ...dto,
      })
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async get(dto: AlbumGetReqDto): Promise<AlbumResDto> {
    return this.clientProxy
      .send<AlbumResDto, AlbumGetReqDto>(DATA_ALBUM_SERVICE_GET, dto)
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async latest(dto: AlbumLatestReqDto): Promise<AlbumResDto[]> {
    return this.clientProxy
      .send<AlbumResDto[], AlbumLatestReqDto>(DATA_ALBUM_SERVICE_LATEST, dto)
      .toPromise();
  }
}
