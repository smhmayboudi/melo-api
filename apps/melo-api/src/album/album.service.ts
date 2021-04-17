import {
  ALBUM_SERVICE,
  ALBUM_SERVICE_ALBUMS,
  ALBUM_SERVICE_GET,
  ALBUM_SERVICE_LATEST,
  AlbumArtistsReqDto,
  AlbumGetReqDto,
  AlbumLatestReqDto,
  AlbumResDto,
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
    @Inject(ALBUM_SERVICE) private readonly albumClientProxy: ClientProxy
  ) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  albums(dto: AlbumArtistsReqDto): Promise<AlbumResDto[]> {
    return this.albumClientProxy
      .send<AlbumResDto[], AlbumArtistsReqDto>(ALBUM_SERVICE_ALBUMS, dto)
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  get(dto: AlbumGetReqDto): Promise<AlbumResDto> {
    return this.albumClientProxy
      .send<AlbumResDto, AlbumGetReqDto>(ALBUM_SERVICE_GET, dto)
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  latest(dto: AlbumLatestReqDto): Promise<AlbumResDto[]> {
    return this.albumClientProxy
      .send<AlbumResDto[], AlbumLatestReqDto>(ALBUM_SERVICE_LATEST, dto)
      .toPromise();
  }
}
