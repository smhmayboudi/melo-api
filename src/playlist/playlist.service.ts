import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Error, Model, Types } from "mongoose";
import { DataSongService } from "../data/data.song.service";
import { PlaylistDto } from "../data/dto/playlist.dto";
import { PlaylistAddSongDto } from "./dto/playlist.add.song.dto";
import { PlaylistCreateDto } from "./dto/playlist.create.dto";
import { PlaylistDeleteDto } from "./dto/playlist.delete.dto";
import { PlaylistEditDto } from "./dto/playlist.edit.dto";
import { PlaylistGetDto } from "./dto/playlist.get.dto";
import { PlaylistMyDto } from "./dto/playlist.my.dto";
import { PlaylistSongDto } from "./dto/playlist.song.dto";
import { PlaylistTopDto } from "./dto/playlist.top.dto";
import { Playlist } from "./type/playlist";
import { playlistConstant } from "./playlist.constant";
import { PaginationResultDto } from "../data/dto/pagination.result.dto";

@Injectable()
export class PlaylistService {
  constructor(
    private readonly dataSongService: DataSongService,
    @InjectModel("Playlist")
    private readonly playlistModel: Model<Playlist>
  ) {}

  async addSong(dto: PlaylistAddSongDto, songId: number): Promise<PlaylistDto> {
    const playlist = await this.playlistModel.findById(
      new Types.ObjectId(dto.playlistId)
    );
    if (playlist === null || playlist === undefined) {
      throw new Error(playlistConstant.errors.service.playlistNotFound);
    }
    playlist.songs_ids.push(songId);
    await playlist.save();
    const playlistSongs = await this.dataSongService.byIds({
      ids: playlist.songs_ids
    });
    // TODO: transform
    return {
      followersCount: playlist.followers_count,
      id: dto.playlistId,
      // TODO: x?
      image: { x: { url: `${playlist.photo_id}` } },
      isPublic: playlist.isPublic,
      releaseDate: playlist.release_date,
      songs: playlistSongs,
      title: playlist.title,
      tracksCount: playlistSongs.total
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
    if (playlist === null || playlist === undefined) {
      throw new Error(playlistConstant.errors.service.playlistNotFound);
    }
    await playlist.save();
    const playlistSongs = await this.dataSongService.byIds({
      ids: playlist.songs_ids
    });
    // TODO: transform
    return {
      followersCount: playlist.followers_count,
      id: playlist._id,
      // TODO: x?
      image: { x: { url: `${playlist.photo_id}` } },
      isPublic: playlist.isPublic,
      releaseDate: playlist.release_date,
      title: playlist.title,
      tracksCount: playlist.tracks_count,
      songs: playlistSongs
    };
  }

  async deleteSong(dto: PlaylistSongDto, songId: number): Promise<PlaylistDto> {
    const playlist = await this.playlistModel.updateOne(
      { _id: dto.playlistId },
      {
        $pull: { songs_ids: songId }
      }
    );
    if (playlist === null || playlist === undefined) {
      throw new Error(playlistConstant.errors.service.playlistNotFound);
    }
    const playlistSongs = await this.dataSongService.byIds({
      ids: playlist.songs_ids
    });
    // TODO: transform
    return {
      followersCount: playlist.followers_count,
      id: playlist._id,
      // TODO: x?
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
    if (playlist === null || playlist === undefined) {
      throw new Error("Playlist not found.");
    }
    const playlistSongs = await this.dataSongService.byIds({
      ids: playlist.songs_ids
    });
    // TODO: transform
    return {
      followersCount: playlist.followers_count,
      id: playlist._id,
      // TODO: x?
      image: { x: { url: `${playlist.photo_id}` } },
      isPublic: playlist.isPublic,
      releaseDate: playlist.release_date,
      title: playlist.title,
      tracksCount: playlist.tracks_count,
      songs: playlistSongs
    };
  }

  async my(
    dto: PlaylistMyDto,
    sub: number
  ): Promise<PaginationResultDto<PlaylistDto>> {
    const playlists = await this.playlistModel
      .find({ owner_user_id: sub })
      .skip(dto.from)
      .limit(dto.limit);
    const results = await Promise.all(
      playlists.map(async value => {
        const playlistSongs = await this.dataSongService.byIds({
          ids: value.songs_ids
        });
        // TODO: transform
        return {
          followersCount: value.followers_count,
          id: value._id,
          // TODO: x?
          image: { x: { url: `${value.photo_id}` } },
          isPublic: value.isPublic,
          releaseDate: value.release_date,
          title: value.title,
          tracksCount: value.tracks_count,
          songs: playlistSongs
        } as PlaylistDto;
      })
    );
    return {
      results: results,
      total: playlists.length
    } as PaginationResultDto<PlaylistDto>;
  }

  async top(dto: PlaylistTopDto): Promise<PaginationResultDto<PlaylistDto>> {
    const playlists = await this.playlistModel
      .find()
      .sort({ created_at: -1 })
      .skip(dto.from)
      .limit(dto.limit);
    // TODO: check it
    const results = await Promise.all(
      playlists.map(async value => {
        const playlistSongs = await this.dataSongService.byIds({
          ids: value.songs_ids
        });
        // TODO: transform
        return {
          followersCount: value.followers_count,
          id: value._id,
          // TODO: x?
          image: { x: { url: `${value.photo_id}` } },
          isPublic: value.isPublic,
          releaseDate: value.release_date,
          title: value.title,
          tracksCount: value.tracks_count,
          songs: playlistSongs
        } as PlaylistDto;
      })
    );
    return {
      results: results,
      total: playlists.length
    } as PaginationResultDto<PlaylistDto>;
  }
}
