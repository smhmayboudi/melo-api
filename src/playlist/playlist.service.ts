import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Error, Model, Types } from "mongoose";
import { AppImgProxyService } from "../app.img-proxy.service";
import { DataSongService } from "../data/data.song.service";
import { PlaylistAddSongReqDto } from "./dto/req/playlist.add-song.req.dto";
import { PlaylistCreateReqDto } from "./dto/req/playlist.create.req.dto";
import { PlaylistDeleteReqDto } from "./dto/req/playlist.delete.req.dto";
import { PlaylistEditReqDto } from "./dto/req/playlist.edit.req.dto";
import { PlaylistGetReqDto } from "./dto/req/playlist.get.req.dto";
import { PlaylistMyReqDto } from "./dto/req/playlist.my.req.dto";
import { PlaylistSongReqDto } from "./dto/req/playlist.song.req.dto";
import { PlaylistTopReqDto } from "./dto/req/playlist.top.req.dto";
import { PlaylistPaginationResDto } from "./dto/res/playlist.pagination.res.dto";
import { PlaylistPlaylistResDto } from "./dto/res/playlist.playlist.res.dto";
import { PlaylistSongResDto } from "./dto/res/playlist.song.res.dto";
import { PlaylistConfigService } from "./playlist.config.service";
import { playlistConstant } from "./playlist.constant";
import { Playlist } from "./type/playlist";

@Injectable()
export class PlaylistService {
  constructor(
    private readonly playlistConfigService: PlaylistConfigService,
    private readonly appImgProxyService: AppImgProxyService,
    private readonly dataSongService: DataSongService,
    @InjectModel("Playlist")
    private readonly playlistModel: Model<Playlist>
  ) {}

  async addSong(
    dto: PlaylistAddSongReqDto,
    songId: number
  ): Promise<PlaylistPlaylistResDto> {
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
    return {
      followersCount: playlist.followers_count,
      id: dto.playlistId,
      image: this.appImgProxyService.generateUrl(
        playlist.photo_id
          ? this.playlistConfigService.imagePath(playlist.photo_id)
          : this.playlistConfigService.defaultImagePath
      ),
      isPublic: playlist.isPublic,
      releaseDate: playlist.release_date,
      songs: (playlistSongs as unknown) as PlaylistPaginationResDto<
        PlaylistSongResDto
      >,
      title: playlist.title,
      tracksCount: playlistSongs.total
    };
  }

  async create(
    dto: PlaylistCreateReqDto,
    sub: number
  ): Promise<PlaylistPlaylistResDto> {
    const playlist = await new this.playlistModel({
      download_count: 0,
      followers_count: 0,
      owner_user_id: sub,
      photo_id: dto.photoId,
      release_date: new Date(),
      title: dto.title
    }).save();
    return {
      followersCount: playlist.followers_count,
      // TODO: which one id or _id ?
      id: playlist._id,
      image: this.appImgProxyService.generateUrl(
        playlist.photo_id
          ? this.playlistConfigService.imagePath(playlist.photo_id)
          : this.playlistConfigService.defaultImagePath
      ),
      isPublic: playlist.isPublic,
      releaseDate: playlist.release_date,
      title: playlist.title,
      tracksCount: playlist.tracks_count
    };
  }

  async delete(
    dto: PlaylistDeleteReqDto,
    sub: number
  ): Promise<PlaylistPlaylistResDto> {
    const query: any = {
      $and: [{ owner_user_id: sub }, { _id: new Types.ObjectId(dto.id) }]
    };
    const deletingPlaylist = await this.playlistModel.findOne(query);
    if (deletingPlaylist === undefined || deletingPlaylist === null) {
      throw new Error(playlistConstant.errors.service.playlistNotFound);
    }
    const deletedPlaylist = await this.playlistModel.deleteOne(query);
    if (
      deletedPlaylist.deletedCount === undefined ||
      deletedPlaylist.deletedCount === 0
    ) {
      throw new InternalServerErrorException(
        playlistConstant.errors.service.somethingWentWrong
      );
    }
    return {
      followersCount: deletingPlaylist.followers_count,
      id: deletingPlaylist._id,
      image: this.appImgProxyService.generateUrl(
        deletingPlaylist.photo_id
          ? this.playlistConfigService.imagePath(deletingPlaylist.photo_id)
          : this.playlistConfigService.defaultImagePath
      ),
      isPublic: deletingPlaylist.isPublic,
      releaseDate: deletingPlaylist.release_date,
      title: deletingPlaylist.title,
      tracksCount: deletingPlaylist.tracks_count
    };
  }

  async edit(dto: PlaylistEditReqDto): Promise<PlaylistPlaylistResDto> {
    const playlist = await this.playlistModel.findById(dto.id);
    if (playlist === null || playlist === undefined) {
      throw new Error(playlistConstant.errors.service.playlistNotFound);
    }
    await playlist.save();
    const playlistSongs = await this.dataSongService.byIds({
      ids: playlist.songs_ids
    });
    return {
      followersCount: playlist.followers_count,
      // TODO: which one id or _id ?
      id: playlist._id,
      image: this.appImgProxyService.generateUrl(
        playlist.photo_id
          ? this.playlistConfigService.imagePath(playlist.photo_id)
          : this.playlistConfigService.defaultImagePath
      ),
      isPublic: playlist.isPublic,
      releaseDate: playlist.release_date,
      title: playlist.title,
      tracksCount: playlist.tracks_count,
      songs: (playlistSongs as unknown) as PlaylistPaginationResDto<
        PlaylistSongResDto
      >
    };
  }

  async deleteSong(
    dto: PlaylistSongReqDto,
    songId: number
  ): Promise<PlaylistPlaylistResDto> {
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
    return {
      followersCount: playlist.followers_count,
      // TODO: which one id or _id ?
      id: playlist._id,
      image: this.appImgProxyService.generateUrl(
        playlist.photo_id
          ? this.playlistConfigService.imagePath(playlist.photo_id)
          : this.playlistConfigService.defaultImagePath
      ),
      isPublic: playlist.isPublic,
      releaseDate: playlist.release_date,
      title: playlist.title,
      tracksCount: playlist.tracks_count,
      songs: (playlistSongs as unknown) as PlaylistPaginationResDto<
        PlaylistSongResDto
      >
    };
  }

  async get(dto: PlaylistGetReqDto): Promise<PlaylistPlaylistResDto> {
    const playlist = await this.playlistModel.findById(dto.id);
    if (playlist === null || playlist === undefined) {
      throw new Error(playlistConstant.errors.service.playlistNotFound);
    }
    const playlistSongs = await this.dataSongService.byIds({
      ids: playlist.songs_ids
    });
    return {
      followersCount: playlist.followers_count,
      // TODO: which one id or _id ?
      id: playlist._id,
      image: this.appImgProxyService.generateUrl(
        playlist.photo_id
          ? this.playlistConfigService.imagePath(playlist.photo_id)
          : this.playlistConfigService.defaultImagePath
      ),
      isPublic: playlist.isPublic,
      releaseDate: playlist.release_date,
      title: playlist.title,
      tracksCount: playlist.tracks_count,
      songs: (playlistSongs as unknown) as PlaylistPaginationResDto<
        PlaylistSongResDto
      >
    };
  }

  async my(
    dto: PlaylistMyReqDto,
    sub: number
  ): Promise<PlaylistPaginationResDto<PlaylistPlaylistResDto>> {
    const playlists = await this.playlistModel
      .find({ owner_user_id: sub })
      .skip(dto.from)
      .limit(dto.limit);
    const results = await Promise.all(
      playlists.map(async value => {
        const playlistSongs = await this.dataSongService.byIds({
          ids: value.songs_ids
        });
        return {
          followersCount: value.followers_count,
          id: value._id,
          image: this.appImgProxyService.generateUrl(
            value.photo_id
              ? this.playlistConfigService.imagePath(value.photo_id)
              : this.playlistConfigService.defaultImagePath
          ),
          isPublic: value.isPublic,
          releaseDate: value.release_date,
          title: value.title,
          tracksCount: value.tracks_count,
          songs: (playlistSongs as unknown) as PlaylistPaginationResDto<
            PlaylistSongResDto
          >
        } as PlaylistPlaylistResDto;
      })
    );
    return {
      results: results,
      total: playlists.length
    } as PlaylistPaginationResDto<PlaylistPlaylistResDto>;
  }

  async top(
    dto: PlaylistTopReqDto
  ): Promise<PlaylistPaginationResDto<PlaylistPlaylistResDto>> {
    const playlists = await this.playlistModel
      .find()
      .sort({ created_at: -1 })
      .skip(dto.from)
      .limit(dto.limit);
    const results = await Promise.all(
      playlists.map(async value => {
        const playlistSongs = await this.dataSongService.byIds({
          ids: value.songs_ids
        });
        return {
          followersCount: value.followers_count,
          id: value._id,
          image: this.appImgProxyService.generateUrl(
            value.photo_id
              ? this.playlistConfigService.imagePath(value.photo_id)
              : this.playlistConfigService.defaultImagePath
          ),
          isPublic: value.isPublic,
          releaseDate: value.release_date,
          title: value.title,
          tracksCount: value.tracks_count,
          songs: (playlistSongs as unknown) as PlaylistPaginationResDto<
            PlaylistSongResDto
          >
        } as PlaylistPlaylistResDto;
      })
    );
    return {
      results: results,
      total: playlists.length
    } as PlaylistPaginationResDto<PlaylistPlaylistResDto>;
  }
}
