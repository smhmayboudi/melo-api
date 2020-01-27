/* eslint-disable @typescript-eslint/camelcase */
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
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

  async create(dto: PlaylistCreateDto, sub: string): Promise<any> {
    const playlist = await new this.playlistModel({
      title: dto.title,
      photo_id: dto.photoId,
      release_date: new Date(),
      followers_count: 0,
      owner_user_id: sub,
      download_count: 0
    }).save();
    return {
      // TODO: upload stuff & response type
      id: playlist._id,
      title: playlist.title,
      tracksCount: playlist.tracks_count,
      image: playlist.photo_id,
      isPublic: playlist.public,
      releaseDate: playlist.release_date,
      followersCount: playlist.followers_count,
      songs: null
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
