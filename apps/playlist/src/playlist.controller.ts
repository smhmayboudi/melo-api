import {
  DataPaginationResDto,
  PLAYLIST_SERVICE_ADD_SONG,
  PLAYLIST_SERVICE_CREATE,
  PLAYLIST_SERVICE_DELETE,
  PLAYLIST_SERVICE_EDIT,
  PLAYLIST_SERVICE_GET,
  PLAYLIST_SERVICE_MY,
  PLAYLIST_SERVICE_REMOVE_SONG,
  PLAYLIST_SERVICE_TOP,
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
import { MessagePattern, Payload } from "@nestjs/microservices";

import { Controller } from "@nestjs/common";
import { PlaylistService } from "./playlist.service";

@Controller()
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @MessagePattern(PLAYLIST_SERVICE_ADD_SONG)
  async addSong(
    @Payload() dto: PlaylistAddSongReqDto
  ): Promise<PlaylistResDto> {
    return this.playlistService.addSong(dto);
  }

  @MessagePattern(PLAYLIST_SERVICE_CREATE)
  async create(@Payload() dto: PlaylistCreateReqDto): Promise<PlaylistResDto> {
    return this.playlistService.create(dto);
  }

  @MessagePattern(PLAYLIST_SERVICE_DELETE)
  async delete(@Payload() dto: PlaylistDeleteReqDto): Promise<PlaylistResDto> {
    return this.playlistService.delete(dto);
  }

  @MessagePattern(PLAYLIST_SERVICE_EDIT)
  async edit(@Payload() dto: PlaylistEditReqDto): Promise<PlaylistResDto> {
    return this.playlistService.edit(dto);
  }

  @MessagePattern(PLAYLIST_SERVICE_GET)
  async get(@Payload() dto: PlaylistGetReqDto): Promise<PlaylistResDto> {
    return this.playlistService.get(dto);
  }

  @MessagePattern(PLAYLIST_SERVICE_MY)
  async my(
    @Payload() dto: PlaylistMyReqDto
  ): Promise<DataPaginationResDto<PlaylistResDto>> {
    return this.playlistService.my(dto);
  }

  @MessagePattern(PLAYLIST_SERVICE_REMOVE_SONG)
  async removeSong(
    @Payload() dto: PlaylistRemoveSongReqDto
  ): Promise<PlaylistResDto> {
    return this.playlistService.removeSong(dto);
  }

  @MessagePattern(PLAYLIST_SERVICE_TOP)
  async top(
    @Payload() dto: PlaylistTopReqDto
  ): Promise<DataPaginationResDto<PlaylistResDto>> {
    return this.playlistService.top(dto);
  }
}
