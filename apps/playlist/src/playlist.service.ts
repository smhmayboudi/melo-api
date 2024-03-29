import { ApmAfterMethod, ApmBeforeMethod } from "@melo/apm";
import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import {
  CONST_SERVICE,
  CONST_SERVICE_IMAGE,
  ConstImageReqDto,
  ConstImageResDto,
  PLAYLIST,
  PlaylistAddSongReqDto,
  PlaylistCreateReqDto,
  PlaylistDeleteReqDto,
  PlaylistEditReqDto,
  PlaylistGetReqDto,
  PlaylistMyReqDto,
  PlaylistRemoveSongReqDto,
  PlaylistResDto,
  PlaylistTopReqDto,
  SONG_SERVICE,
  SONG_SERVICE_GET_BY_IDS,
  SongGetByIdsReqDto,
  SongResDto,
} from "@melo/common";
import { Model, Types } from "mongoose";

import { ClientProxy } from "@nestjs/microservices";
import { InjectModel } from "@nestjs/mongoose";
import { PlaylistConfigService } from "./playlist.config.service";
import { PlaylistInterface } from "./playlist.module.interface";
import { PlaylistServiceInterface } from "./playlist.service.interface";
import { PromMethodCounter } from "@melo/prom";
import lodash from "lodash";

@Injectable()
// @PromInstanceCounter
export class PlaylistService implements PlaylistServiceInterface {
  private image(
    dto: {},
    playlist: PlaylistInterface
  ): Promise<ConstImageResDto> {
    const uri =
      playlist.photo_id === undefined
        ? this.playlistConfigService.imagePathDefaultPlaylist
        : lodash.template(this.playlistConfigService.imagePath)({
            id: playlist.photo_id,
          });
    return this.constClientProxy
      .send<ConstImageResDto, ConstImageReqDto>(CONST_SERVICE_IMAGE, {
        ...dto,
        uri,
      })
      .toPromise();
  }

  private song(
    dto: {},
    playlist: PlaylistInterface
  ): Promise<SongResDto[]> | undefined {
    return playlist.songs_ids.length === 0
      ? undefined
      : this.songClientProxy
          .send<SongResDto[], SongGetByIdsReqDto>(SONG_SERVICE_GET_BY_IDS, {
            ...dto,
            ids: playlist.songs_ids.map((value) => value),
          })
          .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async transform(
    dto: {},
    playlist: PlaylistInterface
  ): Promise<PlaylistResDto> {
    return {
      followersCount: playlist.followers_count,
      id: playlist._id,
      image: await this.image(dto, playlist),
      isPublic: playlist.isPublic,
      releaseDate: playlist.release_date,
      songs:
        playlist.songs_ids.length === 0
          ? undefined
          : await this.song(dto, playlist),
      title: playlist.title,
      tracksCount: playlist.tracks_count,
    };
  }

  constructor(
    @Inject(CONST_SERVICE) private readonly constClientProxy: ClientProxy,
    @Inject(SONG_SERVICE) private readonly songClientProxy: ClientProxy,
    private readonly playlistConfigService: PlaylistConfigService,
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
    return this.transform(dto, playlist);
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
    return this.transform(dto, playlist);
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
    return this.transform(dto, playlist);
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
    return this.transform(dto, playlist);
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
      playlists.map(async (value) => this.transform(dto, value))
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
    return this.transform(dto, playlist);
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
      playlists.map(async (value) => this.transform(dto, value))
    );
  }
}
