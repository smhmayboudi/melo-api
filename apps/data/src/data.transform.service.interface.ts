import {
  AlbumResDto,
  ArtistResDto,
  DataElasticsearchArtistResDto,
  DataElasticsearchSearchResDto,
  PlaylistResDto,
  SongResDto,
} from "@melo/common";

import { PlaylistModelReqDto } from "@melo/common/playlist/dto/req/playlist.model.req.dto";

export interface DataTransformServiceInterface {
  album(dto: DataElasticsearchSearchResDto): Promise<AlbumResDto>;
  artist(dto: DataElasticsearchArtistResDto): Promise<ArtistResDto>;
  playlist(dto: PlaylistModelReqDto): Promise<PlaylistResDto>;
  song(dto: DataElasticsearchSearchResDto): Promise<SongResDto>;
}
