import {
  AlbumResDto,
  ArtistResDto,
  DATA_TRANSFORM_SERVICE_ALBUM,
  DATA_TRANSFORM_SERVICE_ARTIST,
  DATA_TRANSFORM_SERVICE_SONG,
  DataElasticSearchArtistResDto,
  DataElasticSearchSearchResDto,
  SongResDto,
} from "@melo/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

import { Controller } from "@nestjs/common";
import { DataTransformService } from "./data.transform.service";

@Controller()
export class DataTransformController {
  constructor(private readonly dataTransformService: DataTransformService) {}

  @MessagePattern(DATA_TRANSFORM_SERVICE_ALBUM)
  album(@Payload() dto: DataElasticSearchSearchResDto): Promise<AlbumResDto> {
    return this.dataTransformService.album(dto);
  }

  @MessagePattern(DATA_TRANSFORM_SERVICE_ARTIST)
  artist(@Payload() dto: DataElasticSearchArtistResDto): Promise<ArtistResDto> {
    return this.dataTransformService.artist(dto);
  }

  @MessagePattern(DATA_TRANSFORM_SERVICE_SONG)
  song(@Payload() dto: DataElasticSearchSearchResDto): Promise<SongResDto> {
    return this.dataTransformService.song(dto);
  }
}
