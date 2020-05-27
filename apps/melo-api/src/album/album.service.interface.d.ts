import {
  AlbumArtistsReqDto,
  AlbumGetReqDto,
  AlbumLatestReqDto,
  AlbumResDto,
  DataPaginationResDto,
} from "@melo/common";

export interface AlbumServiceInterface {
  albums(dto: AlbumArtistsReqDto): Promise<DataPaginationResDto<AlbumResDto>>;
  get(dto: AlbumGetReqDto): Promise<AlbumResDto>;
  latest(dto: AlbumLatestReqDto): Promise<DataPaginationResDto<AlbumResDto>>;
}
