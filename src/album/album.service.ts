import { ApmAfterMethod, ApmBeforeMethod } from "../apm/apm.decorator";

import { AlbumArtistAlbumsReqDto } from "./dto/req/album.artist-albums.req.dto";
import { AlbumByIdReqDto } from "./dto/req/album.by-id.req.dto";
import { AlbumLatestReqDto } from "./dto/req/album.latest.req.dto";
import { DataAlbumResDto } from "../data/dto/res/data.album.res.dto";
import { DataAlbumService } from "../data/data.album.service";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { Injectable } from "@nestjs/common";
import { PromMethodCounter } from "../prom/prom.decorator";

@Injectable()
// @PromInstanceCounter
export class AlbumService {
  constructor(private readonly dataAlbumService: DataAlbumService) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async artistAlbums(
    dto: AlbumArtistAlbumsReqDto
  ): Promise<DataPaginationResDto<DataAlbumResDto>> {
    return this.dataAlbumService.albums({
      ...dto,
      id: dto.artistId,
    });
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async byId(dto: AlbumByIdReqDto): Promise<DataAlbumResDto> {
    return this.dataAlbumService.byId(dto);
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async latest(
    dto: AlbumLatestReqDto
  ): Promise<DataPaginationResDto<DataAlbumResDto>> {
    return this.dataAlbumService.latest(dto);
  }
}
