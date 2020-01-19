import { Injectable } from "@nestjs/common";
import { PlaylistAddSongDto } from "./dto/playlist.add.song.dto";
import { PlaylistCreateDto } from "./dto/playlist.create.dto";
import { PlaylistDeleteDto } from "./dto/playlist.delete.dto";
import { PlaylistEditDto } from "./dto/playlist.edit.dto";
import { PlaylistGetDto } from "./dto/playlist.get.dto";
import { PlaylistMyDto } from "./dto/playlist.my.dto";
import { PlaylistSongDto } from "./dto/playlist.song.dto";
import { PlaylistTopDto } from "./dto/playlist.top.dto";

@Injectable()
export class PlaylistService {
  // constructor() {}

  async addSong(dto: PlaylistAddSongDto): Promise<any> {
    return Promise.resolve(dto);
  }

  async create(dto: PlaylistCreateDto): Promise<any> {
    return Promise.resolve(dto);
  }

  async delete(dto: PlaylistDeleteDto): Promise<any> {
    return Promise.resolve(dto);
  }

  async edit(dto: PlaylistEditDto): Promise<any> {
    return Promise.resolve(dto);
  }

  async get(dto: PlaylistGetDto): Promise<any> {
    return Promise.resolve(dto);
  }

  async my(dto: PlaylistMyDto): Promise<any> {
    return Promise.resolve(dto);
  }

  async song(dto: PlaylistSongDto): Promise<any> {
    return Promise.resolve(dto);
  }

  async top(dto: PlaylistTopDto): Promise<any> {
    return Promise.resolve(dto);
  }
}
