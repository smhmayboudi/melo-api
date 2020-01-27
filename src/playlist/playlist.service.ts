import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PlaylistDto } from "../data/dto/playlist.dto";
import { PlaylistCreateDto } from "./dto/playlist.create.dto";
import { PlaylistDeleteDto } from "./dto/playlist.delete.dto";
import { PlaylistEditDto } from "./dto/playlist.edit.dto";
import { PlaylistGetDto } from "./dto/playlist.get.dto";
import { PlaylistMyDto } from "./dto/playlist.my.dto";
import { PlaylistSongDto } from "./dto/playlist.song.dto";
import { PlaylistTopDto } from "./dto/playlist.top.dto";
import { Playlist } from "./type/playlist";

@Injectable()
export class PlaylistService {
  constructor(
    @InjectModel("Playlist") private readonly playlistModel: Model<Playlist>
  ) {}

  async addSong(playlistId: string, songId: number): Promise<any> {
    return Promise.resolve(`${playlistId}_${songId}`);
  }

  async create(dto: PlaylistCreateDto, sub: number): Promise<PlaylistDto> {
    const playlist = await new this.playlistModel({
      download_count: 0,
      followers_count: 0,
      owner_user_id: sub,
      photo_id: dto.photoId,
      release_date: new Date(),
      title: dto.title
    }).save();
    // TODO: transform
    return {
      followersCount: playlist.followers_count,
      id: playlist._id,
      // TODO: x?
      image: { x: { url: `${playlist.photo_id}` } },
      isPublic: playlist.isPublic,
      releaseDate: playlist.release_date,
      title: playlist.title,
      tracksCount: playlist.tracks_count
    };
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
