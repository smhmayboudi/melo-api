import {
  ALBUM_SERVICE_ALBUMS,
  ALBUM_SERVICE_GET,
  ALBUM_SERVICE_LATEST,
  ALBUM_SERVICE_TRANSFORM,
  AlbumArtistsReqDto,
  AlbumGetReqDto,
  AlbumLatestReqDto,
  AlbumResDto,
  DataElasticsearchSearchResDto,
} from "@melo/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

import { AlbumService } from "./album.service";
import { Controller } from "@nestjs/common";

@Controller()
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @MessagePattern(ALBUM_SERVICE_ALBUMS)
  albums(@Payload() dto: AlbumArtistsReqDto): Promise<AlbumResDto[]> {
    return this.albumService.albums(dto);
  }

  @MessagePattern(ALBUM_SERVICE_GET)
  get(@Payload() dto: AlbumGetReqDto): Promise<AlbumResDto> {
    return this.albumService.get(dto);
  }

  @MessagePattern(ALBUM_SERVICE_LATEST)
  latest(@Payload() dto: AlbumLatestReqDto): Promise<AlbumResDto[]> {
    return this.albumService.latest(dto);
  }

  @MessagePattern(ALBUM_SERVICE_TRANSFORM)
  transform(dto: DataElasticsearchSearchResDto): Promise<AlbumResDto> {
    return this.albumService.transform(dto);
  }
}
