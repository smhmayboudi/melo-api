import { Injectable } from "@nestjs/common";
import { AppMixSongService } from "../app.mix-song.service";
import { DataAlbumService } from "../data/data.album.service";
import { SongMixResDto } from "../song/dto/res/song.mix.res.dto";
import { SongSongResDto } from "../song/dto/res/song.song.res.dto";
import { AlbumByIdReqDto } from "./dto/req/album.by-id.req.dto";
import { AlbumLatestReqDto } from "./dto/req/album.latest.req.dto";
import { AlbumAlbumResDto } from "./dto/res/album.album.res.dto";
import { AlbumPaginationResDto } from "./dto/res/album.pagination.res.dto";

@Injectable()
export class AlbumService {
  constructor(
    private readonly appMixSongService: AppMixSongService,
    private readonly dataAlbumService: DataAlbumService
  ) {}

  // TODO: CHECK(MIX)
  async byId(
    dto: AlbumByIdReqDto,
    id: number,
    sub: number
  ): Promise<SongMixResDto> {
    //AlbumAlbumResDto
    //TODO: change
    const song = await this.dataAlbumService.byId({ ...dto, id });
    return this.appMixSongService.mixSong(sub, [
      (song as unknown) as SongSongResDto
    ])[0];
  }

  async latest(
    dto: AlbumLatestReqDto
  ): Promise<AlbumPaginationResDto<AlbumAlbumResDto>> {
    return (this.dataAlbumService.lstest({ ...dto }) as unknown) as Promise<
      AlbumPaginationResDto<AlbumAlbumResDto>
    >;
  }
}
