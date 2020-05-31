import {
  AlbumResDto,
  ArtistResDto,
  DataElasticsearchArtistResDto,
  DataElasticsearchSearchResDto,
  PlaylistResDto,
  SongResDto,
} from "@melo/common";
import { ApmAfterMethod, ApmBeforeMethod } from "@melo/apm";

import { DataImageService } from "./data.image.service";
import { DataSongService } from "./data.song.service";
import { DataTransformServiceInterface } from "./data.transform.interface";
import { Injectable } from "@nestjs/common";
import { PlaylistModelReqDto } from "@melo/common/playlist/dto/req/playlist.model.req.dto";
import { PromMethodCounter } from "@melo/prom";
import lodash from "lodash";

@Injectable()
export class DataTransformService implements DataTransformServiceInterface {
  constructor(
    private readonly dataImageService: DataImageService,
    private readonly dataSongService: DataSongService
  ) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async album(dto: DataElasticsearchSearchResDto): Promise<AlbumResDto> {
    const artists = await Promise.all(
      dto.artists.map(async (value) => await this.artist(value))
    );
    const uri =
      dto.unique_name === undefined
        ? dto.dataConfigElasticsearch.imagePathDefaultAlbum
        : lodash.template(dto.dataConfigElasticsearch.imagePath)({
            id: dto.unique_name,
          });
    const image = await this.dataImageService.generateUrl({
      ...dto,
      uri,
    });
    const tags =
      dto.tags === undefined ? undefined : dto.tags.map((value) => value.tag);
    return {
      artists,
      downloadCount: dto.album_downloads_count,
      id: dto.album_id,
      image,
      name: dto.album,
      releaseDate: dto.release_date,
      tags,
      tracksCount: dto.album_tracks_count,
    };
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async artist(dto: DataElasticsearchArtistResDto): Promise<ArtistResDto> {
    const uri = !dto.has_cover
      ? dto.dataConfigElasticsearch.imagePathDefaultArtist
      : lodash.template(dto.dataConfigElasticsearch.imagePath)({
          id: `artist-${dto.full_name
            .toLowerCase()
            .replace(/ /g, "-")
            .replace(/-&-/g, "-")}`,
        });
    const image = await this.dataImageService.generateUrl({
      ...dto,
      uri,
    });
    const sumSongsDownloadsCount =
      dto.sum_downloads_count > 0 ? dto.sum_downloads_count : undefined;
    const tags =
      dto.tags === undefined ? undefined : dto.tags.map((value) => value.tag);
    return {
      followersCount: dto.followers_count,
      fullName: dto.full_name,
      id: dto.id,
      image,
      sumSongsDownloadsCount,
      tags,
      type: dto.type,
    };
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async playlist(dto: PlaylistModelReqDto): Promise<PlaylistResDto> {
    const uri =
      dto.photo_id === undefined
        ? dto.config.imagePathDefaultPlaylist
        : lodash.template(dto.config.imagePath)({
            id: dto.photo_id,
          });
    const image = await this.dataImageService.generateUrl({
      ...dto,
      uri,
    });
    const songs =
      dto.songs_ids.length === 0
        ? undefined
        : await this.dataSongService.getByIds({
            ...dto,
            ids: dto.songs_ids.map((value) => value),
          });
    return {
      followersCount: dto.followers_count,
      id: dto._id,
      image,
      isPublic: dto.isPublic,
      releaseDate: dto.release_date,
      songs,
      title: dto.title,
      tracksCount: dto.tracks_count,
    };
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  async song(dto: DataElasticsearchSearchResDto): Promise<SongResDto> {
    const artists = await Promise.all(
      dto.artists.map(async (value) => await this.artist(value))
    );
    const audio =
      dto.max_audio_rate > 128
        ? {
            high: {
              fingerprint: "",
              url: `${dto.dataConfigElasticsearch.mp3Endpoint}${dto.unique_name}-${dto.max_audio_rate}.mp3`,
            },
            medium: {
              fingerprint: "",
              url: `${dto.dataConfigElasticsearch.mp3Endpoint}${dto.unique_name}-128.mp3`,
            },
          }
        : {
            medium: {
              fingerprint: "",
              url: `${dto.dataConfigElasticsearch.mp3Endpoint}${dto.unique_name}-${dto.max_audio_rate}.mp3`,
            },
          };
    const uri =
      !dto.has_cover || dto.unique_name === undefined
        ? dto.dataConfigElasticsearch.imagePathDefaultSong
        : lodash.template(dto.dataConfigElasticsearch.imagePath)({
            id: dto.unique_name,
          });
    const image = await this.dataImageService.generateUrl({
      ...dto,
      uri,
    });
    const localized =
      dto.localize === undefined ? false : dto.localize === true ? true : false;
    const tags =
      dto.tags === undefined ? undefined : dto.tags.map((value) => value.tag);
    return {
      album: await this.album(dto),
      artists,
      audio,
      copyrighted: dto.copyright,
      downloadCount: dto.downloads_count,
      duration: dto.duration,
      hasVideo: dto.has_video,
      id: dto.id,
      image,
      localized,
      lyrics: dto.lyrics,
      releaseDate: dto.release_date,
      tags,
      title: dto.title === undefined ? "" : dto.title,
    };
  }
}
