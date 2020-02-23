import { Injectable } from "@nestjs/common";
// import { Counter } from "prom-client";
import { AppMixArtistService } from "../app/app.mix-artist.service";
import { AppMixSongService } from "../app/app.mix-song.service";
import { DataAlbumService } from "../data/data.album.service";
import { DataAlbumResDto } from "../data/dto/res/data.album.res.dto";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
// import { InjectCounter } from "../prom/prom.decorators";
// import { AlbumModule } from "./album.module";
import { AlbumArtistAlbumsReqDto } from "./dto/req/album.artist-albums.req.dto";
import { AlbumByIdReqDto } from "./dto/req/album.by-id.req.dto";
import { AlbumLatestReqDto } from "./dto/req/album.latest.req.dto";

@Injectable()
export class AlbumService {
  constructor(
    private readonly appMixSongService: AppMixSongService,
    private readonly artistMixArtistService: AppMixArtistService,
    // @InjectCounter("album")
    // private readonly counter: Counter,
    private readonly dataAlbumService: DataAlbumService
  ) {}

  async artistAlbums(
    dto: AlbumArtistAlbumsReqDto,
    artistId: number,
    sub: number
  ): Promise<DataPaginationResDto<DataAlbumResDto>> {
    // this.counter.inc({
    //   module: AlbumModule.name,
    //   service: AlbumService.name,
    //   function: this.artistAlbums.name
    // });
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

  async byId(
    dto: AlbumByIdReqDto,
    id: number,
    sub: number
  ): Promise<DataAlbumResDto> {
    // this.counter.inc({
    //   module: AlbumModule.name,
    //   service: AlbumService.name,
    //   function: this.byId.name
    // });
    const dataAlbumResDto = await this.dataAlbumService.byId({ ...dto, id });
    const songMixResDto = await this.appMixSongService.mixSong(
      sub,
      dataAlbumResDto.songs === undefined ? [] : dataAlbumResDto.songs.results
    )[0];
    return {
      ...dataAlbumResDto,
      songs: songMixResDto
    };
  }

  async latest(
    dto: AlbumLatestReqDto
  ): Promise<DataPaginationResDto<DataAlbumResDto>> {
    // this.counter.inc({
    //   module: AlbumModule.name,
    //   service: AlbumService.name,
    //   function: this.latest.name
    // });
    return this.dataAlbumService.latest({ ...dto });
  }
}
