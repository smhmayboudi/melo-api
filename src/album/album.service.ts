import { ApmAfterMethod, ApmBeforeMethod } from "../apm/apm.decorator";

import { AlbumArtistAlbumsReqDto } from "./dto/req/album.artist-albums.req.dto";
import { AlbumByIdReqDto } from "./dto/req/album.by-id.req.dto";
import { AlbumLatestReqDto } from "./dto/req/album.latest.req.dto";
import { AppMixArtistService } from "../app/app.mix-artist.service";
import { DataAlbumResDto } from "../data/dto/res/data.album.res.dto";
import { DataAlbumService } from "../data/data.album.service";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { Injectable } from "@nestjs/common";
import { PromMethodCounter } from "../prom/prom.decorator";

@Injectable()
// @PromInstanceCounter
export class AlbumService {
  constructor(
    private readonly appMixArtistService: AppMixArtistService,
    private readonly dataAlbumService: DataAlbumService
  ) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async artistAlbums(
    dto: AlbumArtistAlbumsReqDto,
    artistId: number,
    sub: number
  ): Promise<DataPaginationResDto<DataAlbumResDto>> {
    const albumResDto = await this.dataAlbumService.albums({
      ...dto,
      id: artistId,
    });
    const results = await Promise.all(
      albumResDto.results
        .filter((value) => value !== undefined)
        .map(async (value) => {
          const artists = await this.appMixArtistService.mixArtist(
            value.artists === undefined ? [] : value.artists,
            sub
          );
          return {
            ...value,
            artists,
          };
        })
    );
    return {
      results,
      total: results.length,
    } as DataPaginationResDto<DataAlbumResDto>;
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async byId(dto: AlbumByIdReqDto, id: number): Promise<DataAlbumResDto> {
    return this.dataAlbumService.byId({ ...dto, id });
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async latest(
    dto: AlbumLatestReqDto
  ): Promise<DataPaginationResDto<DataAlbumResDto>> {
    return this.dataAlbumService.latest({ ...dto });
  }
}
