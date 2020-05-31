import { ApmAfterMethod, ApmBeforeMethod } from "@melo/apm";
import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import {
  DATA_SERVICE,
  DATA_TRANSFORM_SERVICE_PLAYLIST,
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
} from "@melo/common";
import { Model, Types } from "mongoose";

import { ClientProxy } from "@nestjs/microservices";
import { InjectModel } from "@nestjs/mongoose";
import { PlaylistInterface } from "./playlist.module.interface";
import { PlaylistModelReqDto } from "@melo/common/playlist/dto/req/playlist.model.req.dto";
import { PlaylistServiceInterface } from "./playlist.service.interface";
import { PromMethodCounter } from "@melo/prom";

@Injectable()
// @PromInstanceCounter
export class PlaylistService implements PlaylistServiceInterface {
  constructor(
    @Inject(DATA_SERVICE) private readonly dataClientProxy: ClientProxy,
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
    return this.dataClientProxy
      .send<PlaylistResDto, PlaylistModelReqDto>(
        DATA_TRANSFORM_SERVICE_PLAYLIST,
        {
          ...dto,
          ...playlist,
        }
      )
      .toPromise();
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
    return this.dataClientProxy
      .send<PlaylistResDto, PlaylistModelReqDto>(
        DATA_TRANSFORM_SERVICE_PLAYLIST,
        {
          ...dto,
          ...playlist,
        }
      )
      .toPromise();
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
    return this.dataClientProxy
      .send<PlaylistResDto, PlaylistModelReqDto>(
        DATA_TRANSFORM_SERVICE_PLAYLIST,
        {
          ...dto,
          ...playlist,
        }
      )
      .toPromise();
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
    return this.dataClientProxy
      .send<PlaylistResDto, PlaylistModelReqDto>(
        DATA_TRANSFORM_SERVICE_PLAYLIST,
        {
          ...dto,
          ...playlist,
        }
      )
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async get(dto: PlaylistGetReqDto): Promise<PlaylistResDto> {
    const playlist = await this.playlistModel.findById(dto.id);
    if (playlist === null || playlist === undefined) {
      throw new BadRequestException();
    }
    return this.dataClientProxy
      .send<PlaylistResDto, PlaylistModelReqDto>(
        DATA_TRANSFORM_SERVICE_PLAYLIST,
        {
          ...dto,
          ...playlist,
        }
      )
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async my(dto: PlaylistMyReqDto): Promise<PlaylistResDto[]> {
    const playlists = await this.playlistModel
      .find({
        owner_user_id: dto.sub,
      })
      .skip(parseInt(dto.from.toString(), 10))
      .limit(parseInt(dto.size.toString(), 10));
    return Promise.all(
      playlists.map((value) =>
        this.dataClientProxy
          .send<PlaylistResDto, PlaylistModelReqDto>(
            DATA_TRANSFORM_SERVICE_PLAYLIST,
            {
              ...dto,
              ...value,
            }
          )
          .toPromise()
      )
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
    return this.dataClientProxy
      .send<PlaylistResDto, PlaylistModelReqDto>(
        DATA_TRANSFORM_SERVICE_PLAYLIST,
        {
          ...dto,
          ...playlist,
        }
      )
      .toPromise();
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async top(dto: PlaylistTopReqDto): Promise<PlaylistResDto[]> {
    const playlists = await this.playlistModel
      .find()
      .skip(parseInt(dto.from.toString(), 10))
      .limit(parseInt(dto.size.toString(), 10));
    return Promise.all(
      playlists.map((value) =>
        this.dataClientProxy
          .send<PlaylistResDto, PlaylistModelReqDto>(
            DATA_TRANSFORM_SERVICE_PLAYLIST,
            {
              ...dto,
              ...value,
            }
          )
          .toPromise()
      )
    );
  }
}
