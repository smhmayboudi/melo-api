import {
  BadRequestException,
  Injectable,
  InternalServerErrorException
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { AppImgProxyService } from "../app.img-proxy.service";
import { DataSongService } from "../data/data.song.service";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataPlaylistResDto } from "../data/dto/res/data.playlist.res.dto";
import { PlaylistAddSongReqDto } from "./dto/req/playlist.add-song.req.dto";
import { PlaylistCreateReqDto } from "./dto/req/playlist.create.req.dto";
import { PlaylistDeleteReqDto } from "./dto/req/playlist.delete.req.dto";
import { PlaylistEditReqDto } from "./dto/req/playlist.edit.req.dto";
import { PlaylistGetReqDto } from "./dto/req/playlist.get.req.dto";
import { PlaylistMyReqDto } from "./dto/req/playlist.my.req.dto";
import { PlaylistSongReqDto } from "./dto/req/playlist.song.req.dto";
import { PlaylistTopReqDto } from "./dto/req/playlist.top.req.dto";
import { PlaylistConfigService } from "./playlist.config.service";
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
  ): Promise<DataPlaylistResDto> {
    const playlist = await this.playlistModel.findById(
      new Types.ObjectId(dto.playlistId)
    );
    if (playlist === null || playlist === undefined) {
      throw new BadRequestException();
    }
    playlist.songs_ids.push(songId);
    await playlist.save();
    const dataSongResDto = await this.dataSongService.byIds({
      ids: playlist.songs_ids.map(value => value.toString())
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
      songs: dataSongResDto,
      title: playlist.title,
      tracksCount: dataSongResDto.total
    };
  }

  async create(
    dto: PlaylistCreateReqDto,
    sub: number
  ): Promise<DataPlaylistResDto> {
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
  ): Promise<DataPlaylistResDto> {
    const query: any = {
      $and: [{ owner_user_id: sub }, { _id: new Types.ObjectId(dto.id) }]
    };
    const playlist = await this.playlistModel.findOne(query);
    if (playlist === null || playlist === undefined) {
      throw new BadRequestException();
    }
    // TODO: refactory to its own repository
    const deleteOne = await this.playlistModel.deleteOne(query);
    if (deleteOne.deletedCount === undefined || deleteOne.deletedCount === 0) {
      throw new InternalServerErrorException();
    }
    return {
      followersCount: playlist.followers_count,
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

  async edit(dto: PlaylistEditReqDto): Promise<DataPlaylistResDto> {
    const playlist = await this.playlistModel.findById(Types.ObjectId(dto.id));
    if (playlist === null || playlist === undefined) {
      throw new BadRequestException();
    }
    await playlist.save();
    const dataSongResDto = await this.dataSongService.byIds({
      ids: playlist.songs_ids.map(value => value.toString())
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
      songs: dataSongResDto
    };
  }

  async deleteSong(
    dto: PlaylistSongReqDto,
    songId: number
  ): Promise<DataPlaylistResDto> {
    const playlist = await this.playlistModel.findById(dto.playlistId);
    if (playlist === null || playlist === undefined) {
      throw new BadRequestException();
    }
    playlist.songs_ids.splice(playlist.songs_ids.indexOf(songId), 1);
    await playlist.save();
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
      songs:
        playlist.songs_ids.length !== 0
          ? await this.dataSongService.byIds({
              ids: playlist.songs_ids.map(id => id.toString())
            })
          : undefined
    };
  }

  async get(dto: PlaylistGetReqDto): Promise<DataPlaylistResDto> {
    const playlist = await this.playlistModel.findById(dto.id);
    if (playlist === null || playlist === undefined) {
      throw new BadRequestException();
    }
    const dataSongResDto = await this.dataSongService.byIds({
      ids: playlist.songs_ids.map(value => value.toString())
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
      songs: dataSongResDto
    };
  }

  async my(
    dto: PlaylistMyReqDto,
    sub: number
  ): Promise<DataPaginationResDto<DataPlaylistResDto>> {
    const playlists = await this.playlistModel
      .find({ owner_user_id: sub })
      .skip(parseInt(dto.from.toString(), 10))
      .limit(parseInt(dto.limit.toString(), 10));
    const results = await Promise.all(
      playlists.map(async value => {
        const dataSongResDto = await this.dataSongService.byIds({
          ids: value.songs_ids.map(value => value.toString())
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
          songs: dataSongResDto
        };
      })
    );
    return {
      results: results,
      total: results.length
    } as DataPaginationResDto<DataPlaylistResDto>;
  }

  async top(
    dto: PlaylistTopReqDto
  ): Promise<DataPaginationResDto<DataPlaylistResDto>> {
    const playlists = await this.playlistModel
      .find()
      .skip(parseInt(dto.from.toString(), 10))
      .limit(parseInt(dto.limit.toString(), 10));

    const results = await Promise.all(
      playlists.map(async value => {
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
          songs:
            value.songs_ids.length !== 0
              ? await this.dataSongService.byIds({
                  ids: value.songs_ids.map(value => value.toString())
                })
              : undefined
        };
      })
    );
    return {
      results: results,
      total: results.length
    } as DataPaginationResDto<DataPlaylistResDto>;
  }
}
