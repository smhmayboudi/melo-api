import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataPlaylistResDto } from "../data/dto/res/data.playlist.res.dto";
import { PlaylistAddSongReqDto } from "./dto/req/playlist.add-song.req.dto";
import { PlaylistCreateReqDto } from "./dto/req/playlist.create.req.dto";
import { PlaylistDeleteReqDto } from "./dto/req/playlist.delete.req.dto";
import { PlaylistEditReqDto } from "./dto/req/playlist.edit.req.dto";
import { PlaylistGetReqDto } from "./dto/req/playlist.get.req.dto";
import { PlaylistMyReqDto } from "./dto/req/playlist.my.req.dto";
import { PlaylistSongReqDto } from "./dto/req/playlist.song.req.dto";
import { PlaylistTopReqDto } from "./dto/req/playlist.top.req.dto";

export interface PlaylistServiceInterface {
  addSong(
    dto: PlaylistAddSongReqDto,
    songId: number
  ): Promise<DataPlaylistResDto>;

  create(dto: PlaylistCreateReqDto, sub: number): Promise<DataPlaylistResDto>;

  delete(dto: PlaylistDeleteReqDto, sub: number): Promise<DataPlaylistResDto>;

  edit(dto: PlaylistEditReqDto): Promise<DataPlaylistResDto>;

  deleteSong(
    dto: PlaylistSongReqDto,
    songId: number
  ): Promise<DataPlaylistResDto>;

  get(dto: PlaylistGetReqDto): Promise<DataPlaylistResDto>;

  my(
    dto: PlaylistMyReqDto,
    sub: number
  ): Promise<DataPaginationResDto<DataPlaylistResDto>>;

  top(
    dto: PlaylistTopReqDto
  ): Promise<DataPaginationResDto<DataPlaylistResDto>>;
}
