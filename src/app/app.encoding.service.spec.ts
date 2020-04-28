import { Test, TestingModule } from "@nestjs/testing";

import { AppEncodingService } from "./app.encoding.service";
import { AppHashIdService } from "./app.hash-id.service";
import { AppHashIdServiceInterface } from "./app.hash-id.service.interface";
import { DataAlbumResDto } from "../data/dto/res/data.album.res.dto";
import { DataArtistResDto } from "../data/dto/res/data.artist.res.dto";
import { DataArtistType } from "../data/data.artist.type";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataPlaylistResDto } from "../data/dto/res/data.playlist.res.dto";
import { DataSearchResDto } from "../data/dto/res/data.search.res.dto";
import { DataSearchType } from "../data/data.search.type";
import { DataSongResDto } from "../data/dto/res/data.song.res.dto";

describe("AppEncodingService", () => {
  const releaseDate = new Date();
  const artist: DataArtistResDto = {
    followersCount: 0,
    id: 0,
    type: DataArtistType.prime,
  };
  const artistEncoded: unknown = {
    ...artist,
    id: "",
  };
  const song: DataSongResDto = {
    album: {
      artists: [artist],
      id: 0,
      name: "",
      releaseDate,
    },
    artists: [
      {
        followersCount: 0,
        id: 0,
        type: DataArtistType.feat,
      },
    ],
    audio: {},
    duration: 0,
    id: 0,
    localized: false,
    releaseDate,
    title: "",
  };
  const songEncoded: unknown = {
    ...song,
    album: {
      artists: [artistEncoded],
      id: "",
      name: "",
      releaseDate,
    },
    artists: [
      {
        followersCount: 0,
        id: "",
        type: DataArtistType.feat,
      },
    ],
    id: "",
  };
  const songPagination: DataPaginationResDto<DataSongResDto> = {
    results: [song],
    total: 1,
  } as DataPaginationResDto<DataSongResDto>;
  const songPaginationEncoded: unknown = {
    results: [songEncoded],
    total: 1,
  };
  const album: DataAlbumResDto = {
    artists: [artist],
    id: 0,
    name: "",
    releaseDate,
    songs: songPagination,
  };
  const albumEncoded: unknown = {
    ...album,
    artists: [artistEncoded],
    id: "",
    songs: songPaginationEncoded,
  };
  const playlist: DataPlaylistResDto = {
    followersCount: 0,
    id: "",
    image: {
      "": {
        url: "",
      },
    },
    isPublic: false,
    releaseDate,
    songs: songPagination,
    title: "",
    tracksCount: 0,
  };
  const playlistEncoded: unknown = {
    ...playlist,
    songs: songPaginationEncoded,
  };
  const searchFieldsUndefined: DataSearchResDto = {
    type: DataSearchType.album,
  };
  const search: DataSearchResDto = {
    album: album,
    artist: artist,
    playlist: playlist,
    song: song,
    type: DataSearchType.album,
  };
  const searchEncoded: unknown = {
    album: albumEncoded,
    artist: artistEncoded,
    playlist: playlistEncoded,
    song: songEncoded,
    type: DataSearchType.album,
  };

  const appHashIdServiceMock: AppHashIdServiceInterface = {
    decode: (): number => 0,
    encode: (): string => "",
  };

  let service: AppEncodingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: AppHashIdService, useValue: appHashIdServiceMock },
        AppEncodingService,
      ],
    }).compile();
    service = module.get<AppEncodingService>(AppEncodingService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("album should be equal to an array of albums", () => {
    expect(service.album(album)).toEqual(albumEncoded);
  });

  it("album should be equal to an array of albums arist, id undefined", () => {
    expect(
      service.album({ ...album, artists: undefined, id: undefined })
    ).toEqual({
      ...album,
      artists: undefined,
      id: undefined,
      songs: songPaginationEncoded,
    });
  });

  it("artists should be equal to an array of artists", () => {
    expect(service.artist(artist)).toEqual(artistEncoded);
  });

  it("songs should be equal to a list of songs", () => {
    expect(service.song(song)).toEqual(songEncoded);
  });

  it("songs should be equal to a list of songs album undefined", () => {
    expect(service.song({ ...song, album: undefined })).toEqual({
      ...song,
      album: undefined,
      artists: [
        {
          followersCount: 0,
          id: "",
          type: DataArtistType.feat,
        },
      ],
      id: "",
    });
  });

  it("playlists should be equal to a list of playlists", () => {
    expect(service.playlist(playlist)).toEqual(playlistEncoded);
  });

  it("playlists should be equal to a list of playlists songs undefined", () => {
    expect(service.playlist({ ...playlist, songs: undefined })).toEqual({
      ...playlist,
      songs: undefined,
    });
  });

  it("searches should be equal to a list of searches", () => {
    expect(service.search(search)).toEqual(searchEncoded);
  });

  it("searches should be equal to a list of searches fields undefined", () => {
    expect(service.search(searchFieldsUndefined)).toEqual(
      searchFieldsUndefined
    );
  });
});
