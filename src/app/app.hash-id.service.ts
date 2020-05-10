import { ApmAfterMethod, ApmBeforeMethod } from "../apm/apm.decorator";
import { BadRequestException, Injectable } from "@nestjs/common";

import { AppConfigService } from "./app.config.service";
import { AppHashIdServiceInterface } from "./app.hash-id.service.interface";
import { DataAlbumResDto } from "../data/dto/res/data.album.res.dto";
import { DataArtistResDto } from "../data/dto/res/data.artist.res.dto";
import { DataPlaylistResDto } from "../data/dto/res/data.playlist.res.dto";
import { DataSearchResDto } from "../data/dto/res/data.search.res.dto";
import { DataSongResDto } from "../data/dto/res/data.song.res.dto";
import Hashids from "hashids/cjs";
import { PromMethodCounter } from "../prom/prom.decorator";

@Injectable()
// @PromInstanceCounter
export class AppHashIdService implements AppHashIdServiceInterface {
  private readonly hashIds: Hashids;

  constructor(private readonly appConfigService: AppConfigService) {
    this.hashIds = new Hashids(
      this.appConfigService.hashIdSalt,
      this.appConfigService.hashIdMinLength,
      this.appConfigService.hashIdAlphabet,
      this.appConfigService.hashIdSeps
    );
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  decode(hash: string): number {
    // TODO: performance issue => return this.hashIds.decode(hash)[0] as number;
    return this.hashIds.decode(
      Buffer.from(hash, "base64").toString("utf8")
    )[0] as number;
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  encode(id: number): string {
    // TODO: performance issue => const encoded = this.hashIds.encode(id);
    const encoded = Buffer.from(this.hashIds.encode(id.toString()), "utf8")
      .toString("base64")
      .split("=")[0];
    if (encoded === "") {
      throw new BadRequestException();
    }
    return encoded;
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  encodeAlbum(dto: DataAlbumResDto): unknown {
    return {
      ...dto,
      artists:
        dto.artists === undefined
          ? undefined
          : dto.artists.map((value) => this.encodeArtist(value)),
      id: dto.id === undefined ? undefined : this.encode(dto.id),
      songs:
        dto.songs === undefined
          ? undefined
          : {
              results: dto.songs.results.map((value) => this.encodeSong(value)),
              total: dto.songs.total,
            },
    };
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  encodeArtist(dto: DataArtistResDto): unknown {
    return {
      ...dto,
      id: this.encode(dto.id),
    };
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  encodePlaylist(dto: DataPlaylistResDto): unknown {
    return {
      ...dto,
      songs:
        dto.songs === undefined
          ? undefined
          : {
              results: dto.songs.results.map((value) => this.encodeSong(value)),
              total: dto.songs.total,
            },
    };
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  encodeSearch(dto: DataSearchResDto): unknown {
    return {
      ...dto,
      album: dto.album === undefined ? undefined : this.encodeAlbum(dto.album),
      artist:
        dto.artist === undefined ? undefined : this.encodeArtist(dto.artist),
      playlist:
        dto.playlist === undefined
          ? undefined
          : this.encodePlaylist(dto.playlist),
      song: dto.song === undefined ? undefined : this.encodeSong(dto.song),
    };
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  encodeSong(dto: DataSongResDto): unknown {
    return {
      ...dto,
      album: dto.album === undefined ? undefined : this.encodeAlbum(dto.album),
      artists: dto.artists.map((value) => this.encodeArtist(value)),
      id: this.encode(dto.id),
    };
  }
}
