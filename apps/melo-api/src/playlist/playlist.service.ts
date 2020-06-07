import { ApmAfterMethod, ApmBeforeMethod } from "@melo/apm";
import { Inject, Injectable } from "@nestjs/common";
import {
  PLAYLIST_SERVICE,
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

import { ClientProxy } from "@nestjs/microservices";
import { PlaylistServiceInterface } from "./playlist.service.interface";
import { PromMethodCounter } from "@melo/prom";

@Injectable()
// @PromInstanceCounter
export class PlaylistService implements PlaylistServiceInterface {
  constructor(
    @Inject(PLAYLIST_SERVICE) private readonly playlistClientProxy: ClientProxy
  ) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async addSong(dto: PlaylistAddSongReqDto): Promise<PlaylistResDto> {
    return this.playlistClientProxy
      .send<PlaylistResDto, PlaylistAddSongReqDto>(
        PLAYLIST_SERVICE_ADD_SONG,
        dto
      )
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async create(dto: PlaylistCreateReqDto): Promise<PlaylistResDto> {
    return this.playlistClientProxy
      .send<PlaylistResDto, PlaylistCreateReqDto>(PLAYLIST_SERVICE_CREATE, dto)
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async delete(dto: PlaylistDeleteReqDto): Promise<PlaylistResDto> {
    return this.playlistClientProxy
      .send<PlaylistResDto, PlaylistDeleteReqDto>(PLAYLIST_SERVICE_DELETE, dto)
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async edit(dto: PlaylistEditReqDto): Promise<PlaylistResDto> {
    return this.playlistClientProxy
      .send<PlaylistResDto, PlaylistEditReqDto>(PLAYLIST_SERVICE_EDIT, dto)
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async get(dto: PlaylistGetReqDto): Promise<PlaylistResDto> {
    return this.playlistClientProxy
      .send<PlaylistResDto, PlaylistGetReqDto>(PLAYLIST_SERVICE_GET, dto)
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async my(dto: PlaylistMyReqDto): Promise<PlaylistResDto[]> {
    return this.playlistClientProxy
      .send<PlaylistResDto[], PlaylistMyReqDto>(PLAYLIST_SERVICE_MY, dto)
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async removeSong(dto: PlaylistRemoveSongReqDto): Promise<PlaylistResDto> {
    return this.playlistClientProxy
      .send<PlaylistResDto, PlaylistRemoveSongReqDto>(
        PLAYLIST_SERVICE_REMOVE_SONG,
        dto
      )
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async top(dto: PlaylistTopReqDto): Promise<PlaylistResDto[]> {
    return this.playlistClientProxy
      .send<PlaylistResDto[], PlaylistTopReqDto>(PLAYLIST_SERVICE_TOP, dto)
      .toPromise();
  }
}
