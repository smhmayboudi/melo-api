import {
  AlbumResDto,
  ArtistResDto,
  PlaylistResDto,
  SearchResDto,
  SongResDto,
  TagRelationResDto,
  TagResDto,
} from "@melo/common";
import { ApmAfterMethod, ApmBeforeMethod } from "@melo/apm";
import { BadRequestException, Injectable } from "@nestjs/common";

import { AppConfigService } from "./app.config.service";
import { AppHashIdServiceInterface } from "./app.hash-id.service.interface";
import Hashids from "hashids/cjs";
import { PromMethodCounter } from "@melo/prom";

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
  encodeAlbum(dto: AlbumResDto): unknown {
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
          : dto.songs.map((value) => this.encodeSong(value)),
    };
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  encodeArtist(dto: ArtistResDto): unknown {
    return {
      ...dto,
      id: this.encode(dto.id),
    };
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  encodePlaylist(dto: PlaylistResDto): unknown {
    return {
      ...dto,
      songs:
        dto.songs === undefined
          ? undefined
          : dto.songs.map((value) => this.encodeSong(value)),
    };
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  encodeSearch(dto: SearchResDto): unknown {
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
  encodeSong(dto: SongResDto): unknown {
    return {
      ...dto,
      album: dto.album === undefined ? undefined : this.encodeAlbum(dto.album),
      artists: dto.artists.map((value) => this.encodeArtist(value)),
      id: this.encode(dto.id),
    };
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  encodeTag(dto: TagResDto): unknown {
    return {
      ...dto,
      id: this.encode(dto.id),
      typeId: this.encode(dto.typeId),
    };
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  encodeTagRelation(dto: TagRelationResDto): unknown {
    return {
      ...dto,
      categoryId: this.encode(dto.categoryId),
      id: this.encode(dto.id),
      tagId: this.encode(dto.tagId),
    };
  }
}
