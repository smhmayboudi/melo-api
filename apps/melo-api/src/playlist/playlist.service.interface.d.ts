import {
  DataPaginationResDto,
  PlaylistAddSongReqDto,
  PlaylistCreateReqDto,
  PlaylistDeleteReqDto,
  PlaylistEditReqDto,
  PlaylistGetReqDto,
  PlaylistMyReqDto,
  PlaylistRemoveSongReqDto,
  PlaylistResDto,
  PlaylistTopReqDto,
} from "@melo/common";

export interface PlaylistServiceInterface {
  addSong(dto: PlaylistAddSongReqDto): Promise<PlaylistResDto>;
  create(dto: PlaylistCreateReqDto): Promise<PlaylistResDto>;
  delete(dto: PlaylistDeleteReqDto): Promise<PlaylistResDto>;
  edit(dto: PlaylistEditReqDto): Promise<PlaylistResDto>;
  get(dto: PlaylistGetReqDto): Promise<PlaylistResDto>;
  my(dto: PlaylistMyReqDto): Promise<DataPaginationResDto<PlaylistResDto>>;
  removeSong(dto: PlaylistRemoveSongReqDto): Promise<PlaylistResDto>;
  top(dto: PlaylistTopReqDto): Promise<DataPaginationResDto<PlaylistResDto>>;
}
