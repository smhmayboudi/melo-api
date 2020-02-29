import { Injectable } from "@nestjs/common";
import { AppMixArtistService } from "../app/app.mix-artist.service";
import { AppMixSongService } from "../app/app.mix-song.service";
import { DataAlbumService } from "../data/data.album.service";
import { DataAlbumResDto } from "../data/dto/res/data.album.res.dto";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import {
  // PromInstanceCounter,
  PromMethodCounter
} from "../prom/prom.decorator";
import { AlbumArtistAlbumsReqDto } from "./dto/req/album.artist-albums.req.dto";
import { AlbumByIdReqDto } from "./dto/req/album.by-id.req.dto";
import { AlbumLatestReqDto } from "./dto/req/album.latest.req.dto";
import { DataSongResDto } from "../data/dto/res/data.song.res.dto";

@Injectable()
// @PromInstanceCounter
export class AlbumService {
  constructor(
    private readonly appMixSongService: AppMixSongService,
    private readonly artistMixArtistService: AppMixArtistService,
    private readonly dataAlbumService: DataAlbumService
  ) {}

  @PromMethodCounter
  async artistAlbums(
    dto: AlbumArtistAlbumsReqDto,
    artistId: number,
    sub: number
  ): Promise<DataPaginationResDto<DataAlbumResDto>> {
    const albumResDto = await this.dataAlbumService.albums({
      ...dto,
      id: artistId
    });
    const results = await Promise.all(
      albumResDto.results
        .filter(value => value !== undefined)
        .map(async value => {
          const artists = await this.artistMixArtistService.mixArtist(
            sub,
            value.artists === undefined ? [] : value.artists
          );
          return {
            ...value,
            artists
          };
        })
    );
    return {
      results,
      total: results.length
    } as DataPaginationResDto<DataAlbumResDto>;
  }

  @PromMethodCounter
  async byId(
    dto: AlbumByIdReqDto,
    id: number,
    sub: number
  ): Promise<DataAlbumResDto> {
    const dataAlbumResDto = await this.dataAlbumService.byId({ ...dto, id });
    const songMixResDto = await this.appMixSongService.mixSong(
      sub,
      dataAlbumResDto.songs === undefined ? [] : dataAlbumResDto.songs.results
    );
    return {
      ...dataAlbumResDto,
      songs: {
        results: songMixResDto,
        total: songMixResDto.length
      } as DataPaginationResDto<DataSongResDto>
    };
  }

  @PromMethodCounter
  async latest(
    dto: AlbumLatestReqDto
  ): Promise<DataPaginationResDto<DataAlbumResDto>> {
    return this.dataAlbumService.latest({ ...dto });
  }
}
