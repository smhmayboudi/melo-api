import { DataAlbumResDto } from "../data/dto/res/data.album.res.dto";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { AlbumArtistAlbumsReqDto } from "./dto/req/album.artist-albums.req.dto";
import { AlbumByIdReqDto } from "./dto/req/album.by-id.req.dto";
import { AlbumLatestReqDto } from "./dto/req/album.latest.req.dto";

export interface AlbumServiceInterface {
  artistAlbums(
    dto: AlbumArtistAlbumsReqDto,
    artistId: number,
    sub: number
  ): Promise<DataPaginationResDto<DataAlbumResDto>>;
  byId(dto: AlbumByIdReqDto, id: number, sub: number): Promise<DataAlbumResDto>;
  latest(
    dto: AlbumLatestReqDto
  ): Promise<DataPaginationResDto<DataAlbumResDto>>;
}
