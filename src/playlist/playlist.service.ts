import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types, Error } from "mongoose";
import { PlaylistDto } from "../data/dto/playlist.dto";
import { PlaylistCreateDto } from "./dto/playlist.create.dto";
import { PlaylistDeleteDto } from "./dto/playlist.delete.dto";
import { PlaylistEditDto } from "./dto/playlist.edit.dto";
import { PlaylistGetDto } from "./dto/playlist.get.dto";
import { PlaylistMyDto } from "./dto/playlist.my.dto";
import { PlaylistSongDto } from "./dto/playlist.song.dto";
import { PlaylistTopDto } from "./dto/playlist.top.dto";
import { Playlist } from "./type/playlist";
import { DataSongService } from "../data/data.song.service";

@Injectable()
export class PlaylistService {
  constructor(
    private readonly dataSongService: DataSongService,
    @InjectModel("Playlist") private readonly playlistModel: Model<Playlist>
  ) {}

  async addSong(playlistId: string, songId: number): Promise<PlaylistDto> {
    const playlist = await this.playlistModel.findById(
      new Types.ObjectId(playlistId)
    );
    if (!playlist) throw new Error("Playlist not found.");

    playlist.songs_ids.push(songId);
    await playlist.save();
    const playlistSongs = await this.dataSongService.byIds({
      ids: playlist.songs_ids
    });
    // TODO: transform
    return {
      followersCount: playlist.followers_count,
      id: playlistId,
      // TODO: x?
      image: { x: { url: `${playlist.photo_id}` } },
      isPublic: playlist.isPublic,
      releaseDate: playlist.release_date,
      title: playlist.title,
      tracksCount: playlistSongs.total,
      songs: playlistSongs
    };
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

  async delete(dto: PlaylistDeleteDto, sub: number): Promise<boolean> {
    const deletedPlaylist = await this.playlistModel.deleteOne({
      $and: [{ owner_user_id: sub }, { _id: new Types.ObjectId(dto.id) }]
    });
    return deletedPlaylist === undefined;
  }

  async edit(dto: PlaylistEditDto): Promise<PlaylistDto> {
    const playlist = await this.playlistModel.findById(dto.id);
    if (playlist === undefined || playlist === null) {
      throw new Error("Playlist not found.");
    }
    if (dto.title && dto.title !== "") {
      playlist.title = dto.title;
    }
    if (dto.photoId) {
      playlist.photo_id = dto.photoId;
    }
    if (dto.isPublic !== undefined) {
      playlist.isPublic = dto.isPublic;
    }

    await playlist.save();
    const playlistSongs = await this.dataSongService.byIds({
      ids: playlist.songs_ids
    });
    return {
      followersCount: playlist.followers_count,
      id: playlist._id,
      image: { x: { url: `${playlist.photo_id}` } },
      isPublic: playlist.isPublic,
      releaseDate: playlist.release_date,
      title: playlist.title,
      tracksCount: playlist.tracks_count,
      songs: playlistSongs
    };
  }

  async get(dto: PlaylistGetDto): Promise<PlaylistDto> {
    const playlist = await this.playlistModel.findById(dto.id);
    if (playlist === undefined || playlist === null) {
      throw new Error("Playlist not found.");
    }
    const playlistSongs = await this.dataSongService.byIds({
      ids: playlist.songs_ids
    });

    return {
      followersCount: playlist.followers_count,
      id: playlist._id,
      image: { x: { url: `${playlist.photo_id}` } },
      isPublic: playlist.isPublic,
      releaseDate: playlist.release_date,
      title: playlist.title,
      tracksCount: playlist.tracks_count,
      songs: playlistSongs
    };
  }

  async my(dto: PlaylistMyDto, sub: number): Promise<any> {
    //Promise<PaginationResultDto<PlaylistDto>>
    const playlists = await this.playlistModel
      .find({ owner_user_id: sub })
      .skip(dto.from)
      .limit(dto.limit);
    // TODO: check it
    return {
      results: await Promise.all(
        playlists.map(async value => {
          const playlistSongs = await this.dataSongService.byIds({
            ids: value.songs_ids
          });
          return {
            followersCount: value.followers_count,
            id: value._id,
            image: { x: { url: `${value.photo_id}` } },
            isPublic: value.isPublic,
            releaseDate: value.release_date,
            title: value.title,
            tracksCount: value.tracks_count,
            songs: playlistSongs
          };
        })
      ),
      total: playlists.length
    };
  }

  async removeSong(dto: PlaylistSongDto): Promise<PlaylistDto> {
    const playlist = await this.playlistModel.updateOne(
      { _id: dto.playlistId },
      {
        $pull: { songs_ids: dto.songId }
      }
    );
    if (playlist === undefined || playlist === null) {
      throw new Error("Playlist not found.");
    }
    const playlistSongs = await this.dataSongService.byIds({
      ids: playlist.songs_ids
    });
    return {
      followersCount: playlist.followers_count,
      id: playlist._id,
      image: { x: { url: `${playlist.photo_id}` } },
      isPublic: playlist.isPublic,
      releaseDate: playlist.release_date,
      title: playlist.title,
      tracksCount: playlist.tracks_count,
      songs: playlistSongs
    };
  }

  async top(dto: PlaylistTopDto): Promise<any> {
    const playlists = await this.playlistModel
      .find()
      .sort({ created_at: -1 })
      .skip(dto.from)
      .limit(dto.limit);
    // TODO: check it
    return {
      results: await Promise.all(
        playlists.map(async value => {
          const playlistSongs = await this.dataSongService.byIds({
            ids: value.songs_ids
          });
          return {
            followersCount: value.followers_count,
            id: value._id,
            image: { x: { url: `${value.photo_id}` } },
            isPublic: value.isPublic,
            releaseDate: value.release_date,
            title: value.title,
            tracksCount: value.tracks_count,
            songs: playlistSongs
          };
        })
      ),
      total: playlists.length
    };
  }
}
