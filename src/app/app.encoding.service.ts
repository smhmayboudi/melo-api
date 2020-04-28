import { ApmAfterMethod, ApmBeforeMethod } from "../apm/apm.decorator";

import { AppEncodingServiceInterface } from "./app.encoding.service.interface";
import { AppHashIdService } from "./app.hash-id.service";
import { DataAlbumResDto } from "../data/dto/res/data.album.res.dto";
import { DataArtistResDto } from "../data/dto/res/data.artist.res.dto";
import { DataPlaylistResDto } from "../data/dto/res/data.playlist.res.dto";
import { DataSearchResDto } from "../data/dto/res/data.search.res.dto";
import { DataSongResDto } from "../data/dto/res/data.song.res.dto";
import { Injectable } from "@nestjs/common";
import { PromMethodCounter } from "../prom/prom.decorator";

@Injectable()
// @PromInstanceCounter
export class AppEncodingService implements AppEncodingServiceInterface {
  constructor(private readonly appHashIdService: AppHashIdService) {}

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  artist(dto: DataArtistResDto): unknown {
    return {
      ...dto,
      id: this.appHashIdService.encode(dto.id),
    };
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  album(dto: DataAlbumResDto): unknown {
    return {
      ...dto,
      artists:
        dto.artists === undefined
          ? undefined
          : dto.artists.map((value) => this.artist(value)),
      id:
        dto.id === undefined ? undefined : this.appHashIdService.encode(dto.id),
      songs:
        dto.songs === undefined
          ? undefined
          : {
              results: dto.songs.results.map((value) => this.song(value)),
              total: dto.songs.total,
            },
    };
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  playlist(dto: DataPlaylistResDto): unknown {
    return {
      ...dto,
      songs:
        dto.songs === undefined
          ? undefined
          : {
              results: dto.songs.results.map((value) => this.song(value)),
              total: dto.songs.total,
            },
    };
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  search(dto: DataSearchResDto): unknown {
    return {
      ...dto,
      album: dto.album === undefined ? undefined : this.album(dto.album),
      artist: dto.artist === undefined ? undefined : this.artist(dto.artist),
      playlist:
        dto.playlist === undefined ? undefined : this.playlist(dto.playlist),
      song: dto.song === undefined ? undefined : this.song(dto.song),
    };
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  song(dto: DataSongResDto): unknown {
    return {
      ...dto,
      album: dto.album === undefined ? undefined : this.album(dto.album),
      artists: dto.artists.map((value) => this.artist(value)),
      id: this.appHashIdService.encode(dto.id),
    };
  }
}
