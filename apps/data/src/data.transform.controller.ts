import {
  AlbumResDto,
  ArtistResDto,
  DATA_TRANSFORM_SERVICE_ALBUM,
  DATA_TRANSFORM_SERVICE_ARTIST,
  DATA_TRANSFORM_SERVICE_PLAYLIST,
  DATA_TRANSFORM_SERVICE_SONG,
  DataElasticsearchArtistResDto,
  DataElasticsearchSearchResDto,
  PlaylistResDto,
  SongResDto,
} from "@melo/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

import { Controller } from "@nestjs/common";
import { DataTransformService } from "./data.transform.service";
import { PlaylistModelReqDto } from "@melo/common/playlist/dto/req/playlist.model.req.dto";

@Controller()
export class DataTransformController {
  constructor(private readonly dataTransformService: DataTransformService) {}

  @MessagePattern(DATA_TRANSFORM_SERVICE_ALBUM)
  album(@Payload() dto: DataElasticsearchSearchResDto): Promise<AlbumResDto> {
    return this.dataTransformService.album(dto);
  }

  @MessagePattern(DATA_TRANSFORM_SERVICE_ARTIST)
  artist(@Payload() dto: DataElasticsearchArtistResDto): Promise<ArtistResDto> {
    return this.dataTransformService.artist(dto);
  }

  @MessagePattern(DATA_TRANSFORM_SERVICE_PLAYLIST)
  playlist(@Payload() dto: PlaylistModelReqDto): Promise<PlaylistResDto> {
    return this.dataTransformService.playlist(dto);
  }

  @MessagePattern(DATA_TRANSFORM_SERVICE_SONG)
  song(@Payload() dto: DataElasticsearchSearchResDto): Promise<SongResDto> {
    return this.dataTransformService.song(dto);
  }
}
