import {
  AlbumArtistsReqDto,
  AlbumGetReqDto,
  AlbumLatestReqDto,
  AlbumResDto,
  DATA_ALBUM_SERVICE_ALBUMS,
  DATA_ALBUM_SERVICE_GET,
  DATA_ALBUM_SERVICE_LATEST,
} from "@melo/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

import { Controller } from "@nestjs/common";
import { DataAlbumService } from "./data.album.service";

@Controller()
export class DataAlbumController {
  constructor(private readonly dataAlbumService: DataAlbumService) {}

  @MessagePattern(DATA_ALBUM_SERVICE_ALBUMS)
  albums(@Payload() dto: AlbumArtistsReqDto): Promise<AlbumResDto[]> {
    return this.dataAlbumService.albums(dto);
  }

  @MessagePattern(DATA_ALBUM_SERVICE_GET)
  get(@Payload() dto: AlbumGetReqDto): Promise<AlbumResDto> {
    return this.dataAlbumService.get(dto);
  }

  @MessagePattern(DATA_ALBUM_SERVICE_LATEST)
  latest(@Payload() dto: AlbumLatestReqDto): Promise<AlbumResDto[]> {
    return this.dataAlbumService.latest(dto);
  }
}
