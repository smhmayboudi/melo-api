import {
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
  my(dto: PlaylistMyReqDto): Promise<PlaylistResDto[]>;
  removeSong(dto: PlaylistRemoveSongReqDto): Promise<PlaylistResDto>;
  top(dto: PlaylistTopReqDto): Promise<PlaylistResDto[]>;
}
