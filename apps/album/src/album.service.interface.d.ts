import {
  AlbumArtistsReqDto,
  AlbumGetReqDto,
  AlbumLatestReqDto,
  AlbumResDto,
  DataElasticsearchSearchResDto,
} from "@melo/common";

export interface AlbumServiceInterface {
  albums(dto: AlbumArtistsReqDto): Promise<AlbumResDto[]>;
  get(dto: AlbumGetReqDto): Promise<AlbumResDto>;
  latest(dto: AlbumLatestReqDto): Promise<AlbumResDto[]>;
  transform(dto: DataElasticsearchSearchResDto): Promise<AlbumResDto>;
}
