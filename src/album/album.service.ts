import { Injectable } from "@nestjs/common";
import { AppMixSongService } from "../app.mix-song.service";
import { DataAlbumService } from "../data/data.album.service";
import { DataAlbumResDto } from "../data/dto/res/data.album.res.dto";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { AlbumByIdReqDto } from "./dto/req/album.by-id.req.dto";
import { AlbumLatestReqDto } from "./dto/req/album.latest.req.dto";

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
  ): Promise<DataAlbumResDto> {
    // TODO: DataAlbumResDto
    const dataAlbumResDto = await this.dataAlbumService.byId({ ...dto, id });
    const songMixResDto = await this.appMixSongService.mixSong(
      sub,
      dataAlbumResDto.songs?.results!
    )[0];
    return {
      ...dataAlbumResDto,
      songs: songMixResDto
    };
  }

  async latest(
    dto: AlbumLatestReqDto
  ): Promise<DataPaginationResDto<DataAlbumResDto>> {
    return this.dataAlbumService.lstest({ ...dto });
  }
}
