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
  encodeArtists(artists: DataArtistResDto[]): any[] {
    return artists.map((value) => ({
      ...value,
      id: this.appHashIdService.encode(value.id),
    }));
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  encodeAlbums(albums: DataAlbumResDto[]): any[] {
    return albums.map((value) => ({
      ...value,
      artists:
        value.artists === undefined
          ? undefined
          : this.encodeArtists(value.artists),
      id:
        value.id === undefined
          ? undefined
          : this.appHashIdService.encode(value.id),
      songs:
        value.songs === undefined
          ? undefined
          : {
              results: this.encodeSongs(value.songs.results),
              total: value.songs.total,
            },
    }));
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  encodePlaylists(playlists: DataPlaylistResDto[]): any[] {
    return playlists.map((value) => ({
      ...value,
      songs:
        value.songs === undefined
          ? undefined
          : {
              results: this.encodeSongs(value.songs.results),
              total: value.songs.total,
            },
    }));
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  encodeSearches(searches: DataSearchResDto[]): any[] {
    return searches.map((value) => ({
      ...value,
      album:
        value.album === undefined
          ? undefined
          : this.encodeAlbums([value.album])[0],
      artist:
        value.artist === undefined
          ? undefined
          : this.encodeArtists([value.artist])[0],
      playlist:
        value.playlist === undefined
          ? undefined
          : this.encodePlaylists([value.playlist])[0],
      song:
        value.song === undefined
          ? undefined
          : this.encodeSongs([value.song])[0],
    }));
  }

  @ApmAfterMethod
  @ApmBeforeMethod
  @PromMethodCounter
  encodeSongs(songs: DataSongResDto[]): any[] {
    return songs.map((value) => ({
      ...value,
      album:
        value.album === undefined
          ? undefined
          : this.encodeAlbums([value.album])[0],
      artists: this.encodeArtists(value.artists),
      id: this.appHashIdService.encode(value.id),
    }));
  }
}
