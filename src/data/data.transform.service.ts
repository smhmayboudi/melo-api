import { ApmAfterMethod, ApmBeforeMethod } from "../apm/apm.decorator";

import { AppImgProxyService } from "../app/app.img-proxy.service";
import { DataAlbumResDto } from "./dto/res/data.album.res.dto";
import { DataArtistElasticResDto } from "./dto/res/data.artist.elastic.res.dto";
import { DataArtistResDto } from "./dto/res/data.artist.res.dto";
import { DataConfigService } from "./data.config.service";
import { DataSearchElasticResDto } from "./dto/res/data.search.elastic.res.dto";
import { DataSongResDto } from "./dto/res/data.song.res.dto";
import { DataTransformServiceInterface } from "./data.transform.interface";
import { Injectable } from "@nestjs/common";
import { PromMethodCounter } from "../prom/prom.decorator";

@Injectable()
export class DataTransformService implements DataTransformServiceInterface {
  constructor(
    private readonly appImgProxyService: AppImgProxyService,
    private readonly dataConfigService: DataConfigService
  ) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  transformAlbum(album: DataSearchElasticResDto): DataAlbumResDto {
    return {
      artists: album.artists.map((value) => this.transformArtist(value)),
      downloadCount: album.album_downloads_count,
      id: album.album_id,
      image: this.appImgProxyService.generateUrl(
        album.unique_name === undefined
          ? this.dataConfigService.defaultAlbumImagePath
          : this.dataConfigService.imagePath(album.unique_name)
      ),
      name: album.album,
      releaseDate: album.release_date,
      tags:
        album.tags === undefined
          ? undefined
          : album.tags.map((value) => value.tag),
      tracksCount: album.album_tracks_count,
    };
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  transformArtist(artist: DataArtistElasticResDto): DataArtistResDto {
    return {
      followersCount: artist.followers_count,
      fullName: artist.full_name,
      id: artist.id,
      image: this.appImgProxyService.generateUrl(
        artist.has_cover === true
          ? this.dataConfigService.imagePath(
              `artist-${artist.full_name
                .toLowerCase()
                .replace(/ /g, "-")
                .replace(/-&-/g, "-")}`
            )
          : this.dataConfigService.defaultArtistImagePath
      ),
      sumSongsDownloadsCount:
        artist.sum_downloads_count > 0 ? artist.sum_downloads_count : undefined,
      tags:
        artist.tags === undefined
          ? undefined
          : artist.tags.map((value) => value.tag),
      type: artist.type,
    };
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  transformSong(song: DataSearchElasticResDto): DataSongResDto {
    return {
      album: this.transformAlbum(song),
      artists: song.artists.map((value) => this.transformArtist(value)),
      audio:
        song.max_audio_rate > 128
          ? {
              high: {
                fingerprint: "",
                url: `${this.dataConfigService.mp3Endpoint}${song.unique_name}-${song.max_audio_rate}.mp3`,
              },
              medium: {
                fingerprint: "",
                url: `${this.dataConfigService.mp3Endpoint}${song.unique_name}-128.mp3`,
              },
            }
          : {
              medium: {
                fingerprint: "",
                url: `${this.dataConfigService.mp3Endpoint}${song.unique_name}-${song.max_audio_rate}.mp3`,
              },
            },
      copyrighted: song.copyright,
      downloadCount: song.downloads_count,
      duration: song.duration,
      hasVideo: song.has_video,
      id: song.id,
      image: this.appImgProxyService.generateUrl(
        song.has_cover && song.unique_name
          ? this.dataConfigService.imagePath(song.unique_name)
          : this.dataConfigService.defaultSongImagePath
      ),
      localized:
        song.localize === undefined
          ? false
          : song.localize === true
          ? true
          : false,
      lyrics: song.lyrics,
      releaseDate: song.release_date,
      tags:
        song.tags === undefined
          ? undefined
          : song.tags.map((value) => value.tag),
      title: song.title === undefined ? "" : song.title,
    };
  }
}
