import { ApmAfterMethod, ApmBeforeMethod } from "@melo/apm";
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import {
  DataConfigElasticsearchReqDto,
  DataConfigImageReqDto,
  DataImageResDto,
  PLAYLIST,
  PlaylistAddSongReqDto,
  PlaylistConfigReqDto,
  PlaylistCreateReqDto,
  PlaylistDeleteReqDto,
  PlaylistEditReqDto,
  PlaylistGetReqDto,
  PlaylistMyReqDto,
  PlaylistRemoveSongReqDto,
  PlaylistResDto,
  PlaylistTopReqDto,
  SongResDto,
} from "@melo/common";
import { Model, Types } from "mongoose";

import { DataImageService } from "../data/data.image.service";
import { DataSongService } from "../data/data.song.service";
import { InjectModel } from "@nestjs/mongoose";
import { PlaylistInterface } from "./playlist.module.interface";
import { PlaylistServiceInterface } from "./playlist.service.interface";
import { PromMethodCounter } from "@melo/prom";
import lodash from "lodash";

@Injectable()
// @PromInstanceCounter
export class PlaylistService implements PlaylistServiceInterface {
  private image(
    dto: {
      config: PlaylistConfigReqDto;
      dataConfigImage: DataConfigImageReqDto;
    },
    playlist: PlaylistInterface
  ): Promise<DataImageResDto> {
    const uri =
      playlist.photo_id === undefined
        ? dto.config.imagePathDefaultPlaylist
        : lodash.template(dto.config.imagePath)({
            id: playlist.photo_id,
          });
    return this.dataImageService.generateUrl({
      ...dto,
      uri,
    });
  }

  private song(
    dto: {
      dataConfigElasticsearch: DataConfigElasticsearchReqDto;
      dataConfigImage: DataConfigImageReqDto;
    },
    playlist: PlaylistInterface
  ): Promise<SongResDto[]> | undefined {
    return playlist.songs_ids.length === 0
      ? undefined
      : this.dataSongService.getByIds({
          ...dto,
          ids: playlist.songs_ids.map((value) => value),
        });
  }

  constructor(
    private readonly dataImageService: DataImageService,
    private readonly dataSongService: DataSongService,
    @InjectModel(PLAYLIST)
    private readonly playlistModel: Model<PlaylistInterface>
  ) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async addSong(dto: PlaylistAddSongReqDto): Promise<PlaylistResDto> {
    let playlist = await this.playlistModel.findById(
      new Types.ObjectId(dto.playlistId)
    );
    if (playlist === null || playlist === undefined) {
      throw new BadRequestException();
    }
    playlist = {
      ...playlist,
      songs_ids: [...playlist.songs_ids, dto.songId],
    } as PlaylistInterface;
    await playlist.save();
    return {
      followersCount: playlist.followers_count,
      id: dto.playlistId,
      image: await this.image(dto, playlist),
      isPublic: playlist.isPublic,
      releaseDate: playlist.release_date,
      songs: await this.song(dto, playlist),
      title: playlist.title,
      tracksCount: playlist.tracks_count,
    };
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async create(dto: PlaylistCreateReqDto): Promise<PlaylistResDto> {
    const playlist = await new this.playlistModel({
      downloads_count: 0,
      followers_count: 0,
      isPublic: false,
      owner_user_id: dto.sub,
      photo_id: dto.photoId,
      release_date: new Date(),
      songs_ids: [],
      title: dto.title,
      tracks_count: 0,
    }).save();
    return {
      followersCount: playlist.followers_count,
      id: playlist._id,
      image: await this.image(dto, playlist),
      isPublic: playlist.isPublic,
      releaseDate: playlist.release_date,
      title: playlist.title,
      tracksCount: playlist.tracks_count,
    };
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async delete(dto: PlaylistDeleteReqDto): Promise<PlaylistResDto> {
    const playlist = await this.playlistModel.findOne({
      $and: [
        {
          owner_user_id: dto.sub,
        },
        {
          _id: new Types.ObjectId(dto.id),
        },
      ],
    });
    if (playlist === null || playlist === undefined) {
      throw new BadRequestException();
    }
    // TODO: refactory to its own repository
    const deleteOne = await this.playlistModel.deleteOne({
      $and: [
        {
          owner_user_id: dto.sub,
        },
        {
          _id: new Types.ObjectId(dto.id),
        },
      ],
    });
    if (deleteOne.deletedCount === undefined || deleteOne.deletedCount === 0) {
      throw new InternalServerErrorException();
    }
    return {
      followersCount: playlist.followers_count,
      id: playlist._id,
      image: await this.image(dto, playlist),
      isPublic: playlist.isPublic,
      releaseDate: playlist.release_date,
      title: playlist.title,
      tracksCount: playlist.tracks_count,
    };
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async edit(dto: PlaylistEditReqDto): Promise<PlaylistResDto> {
    const playlist = await this.playlistModel.findById(Types.ObjectId(dto.id));
    if (playlist === null || playlist === undefined) {
      throw new BadRequestException();
    }
    await playlist.save();
    return {
      followersCount: playlist.followers_count,
      id: playlist._id,
      image: await this.image(dto, playlist),
      isPublic: playlist.isPublic,
      releaseDate: playlist.release_date,
      songs: await this.song(dto, playlist),
      title: playlist.title,
      tracksCount: playlist.tracks_count,
    };
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async get(dto: PlaylistGetReqDto): Promise<PlaylistResDto> {
    const playlist = await this.playlistModel.findById(dto.id);
    if (playlist === null || playlist === undefined) {
      throw new BadRequestException();
    }
    return {
      followersCount: playlist.followers_count,
      id: playlist._id,
      image: await this.image(dto, playlist),
      isPublic: playlist.isPublic,
      releaseDate: playlist.release_date,
      songs: await this.song(dto, playlist),
      title: playlist.title,
      tracksCount: playlist.tracks_count,
    };
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async my(dto: PlaylistMyReqDto): Promise<PlaylistResDto[]> {
    const playlists = await this.playlistModel
      .find({ owner_user_id: dto.sub })
      .skip(parseInt(dto.from.toString(), 10))
      .limit(parseInt(dto.size.toString(), 10));
    return await Promise.all(
      playlists.map(async (value) => ({
        followersCount: value.followers_count,
        id: value._id,
        image: await this.image(dto, value),
        isPublic: value.isPublic,
        releaseDate: value.release_date,
        songs: await this.song(dto, value),
        title: value.title,
        tracksCount: value.tracks_count,
      }))
    );
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async removeSong(dto: PlaylistRemoveSongReqDto): Promise<PlaylistResDto> {
    let playlist = await this.playlistModel.findById(dto.playlistId);
    if (playlist === null || playlist === undefined) {
      throw new BadRequestException();
    }
    playlist = {
      ...playlist,
      songs_ids: playlist.songs_ids.filter((value) => value === dto.songId),
    } as PlaylistInterface;
    await playlist.save();
    return {
      followersCount: playlist.followers_count,
      id: playlist._id,
      image: await this.image(dto, playlist),
      isPublic: playlist.isPublic,
      releaseDate: playlist.release_date,
      songs: await this.song(dto, playlist),
      title: playlist.title,
      tracksCount: playlist.tracks_count,
    };
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async top(dto: PlaylistTopReqDto): Promise<PlaylistResDto[]> {
    const playlists = await this.playlistModel
      .find()
      .skip(parseInt(dto.from.toString(), 10))
      .limit(parseInt(dto.size.toString(), 10));
    return await Promise.all(
      playlists.map(async (value) => ({
        followersCount: value.followers_count,
        id: value._id,
        image: await this.image(dto, value),
        isPublic: value.isPublic,
        releaseDate: value.release_date,
        songs: await this.song(dto, value),
        title: value.title,
        tracksCount: value.tracks_count,
      }))
    );
  }
}
