import { Injectable } from "@nestjs/common";
import { DataAlbumService } from "../data/data.album.service";
import { AlbumByIdReqDto } from "./dto/req/album.by-id.req.dto";
import { AlbumAlbumResDto } from "./dto/res/album.album.res.dto";
import { AlbumLatestReqDto } from "./dto/req/album.latest.req.dto";
import { AlbumPaginationResDto } from "./dto/res/album.pagination.res.dto";

@Injectable()
export class AlbumService {
  constructor(private readonly dataAlbumService: DataAlbumService) {}

  // TODO: mixSongs
  async byId(dto: AlbumByIdReqDto, id: number): Promise<AlbumAlbumResDto> {
    return this.dataAlbumService.byId({ ...dto, id }) as Promise<
      AlbumAlbumResDto
    >;
  }

  async latest(
    dto: AlbumLatestReqDto
  ): Promise<AlbumPaginationResDto<AlbumAlbumResDto>> {
    return (this.dataAlbumService.lstest({ ...dto }) as unknown) as Promise<
      AlbumPaginationResDto<AlbumAlbumResDto>
    >;
  }
}
