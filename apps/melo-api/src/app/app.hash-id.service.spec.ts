import {
  AlbumResDto,
  ArtistResDto,
  DataArtistType,
  DataPaginationResDto,
  DataSearchType,
  PlaylistResDto,
  SearchResDto,
  SongResDto,
} from "@melo/common";
import { Test, TestingModule } from "@nestjs/testing";

import { AppConfigService } from "./app.config.service";
import { AppConfigServiceInterface } from "./app.config.service.interface";
import { AppHashIdService } from "./app.hash-id.service";

describe("AppHashIdService", () => {
  const releaseDate = new Date();
  const artist: ArtistResDto = {
    followersCount: 0,
    id: 0,
    type: DataArtistType.prime,
  };
  const artistEncoded: unknown = {
    ...artist,
    id: "SHY",
  };
  const song: SongResDto = {
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
      id: "SHY",
      name: "",
      releaseDate,
    },
    artists: [
      {
        followersCount: 0,
        id: "SHY",
        type: DataArtistType.feat,
      },
    ],
    id: "SHY",
  };
  const songPagination: DataPaginationResDto<SongResDto> = {
    results: [song],
    total: 1,
  } as DataPaginationResDto<SongResDto>;
  const songPaginationEncoded: unknown = {
    results: [songEncoded],
    total: 1,
  };
  const album: AlbumResDto = {
    artists: [artist],
    id: 0,
    name: "",
    releaseDate,
    songs: songPagination,
  };
  const albumEncoded: unknown = {
    ...album,
    artists: [artistEncoded],
    id: "SHY",
    songs: songPaginationEncoded,
  };
  const playlist: PlaylistResDto = {
    followersCount: 0,
    id: "SHY",
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
  const searchFieldsUndefined: SearchResDto = {
    type: DataSearchType.album,
  };
  const search: SearchResDto = {
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

  const appConfigServiceMock: AppConfigServiceInterface = {
    apmActive: false,
    apmLogLevel: "trace",
    apmSecretToken: "",
    apmServerUrl: "",
    apmServiceName: "",
    cacheHost: "",
    cacheMax: 0,
    cachePort: 0,
    cacheStore: "",
    cacheTTL: 0,
    dgraphAddress: "",
    dgraphDebug: true,
    hashIdAlphabet:
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
    hashIdMinLength: 0,
    hashIdSalt: "cfhistuCFHISTU",
    hashIdSeps: "",
    mangooseRetryAttempts: 0,
    mangooseRetryDelay: 0,
    mangooseUri: "",
    port: 0,
    promDefaultLabels: { "": "" },
    promDefaultMetricsEnabled: true,
    promPath: "",
    promPrefix: "",
    rateLimitMax: 0,
    rateLimitWindowMs: 0,
    sentryDebug: true,
    sentryDsn: "",
    sentryEnviroment: "",
    sentryLogLevel: 0,
    sentryRelease: "",
    typeOrmDatabase: "",
    typeOrmHost: "",
    typeOrmLogging: true,
    typeOrmPassword: "",
    typeOrmPort: 0,
    typeOrmSynchronize: true,
    typeOrmUsername: "",
  };

  let service: AppHashIdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: AppConfigService, useValue: appConfigServiceMock },
        AppHashIdService,
      ],
    }).compile();
    service = module.get<AppHashIdService>(AppHashIdService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("decode should return a value", () => {
    expect(service.decode("SHY")).toEqual(0);
  });

  it("encode should return a value", () => {
    expect(service.encode(0)).toEqual("SHY");
  });

  it.todo("encoded === ''");

  it("encodeAlbum should be equal to an array of albums", () => {
    expect(service.encodeAlbum(album)).toEqual(albumEncoded);
  });

  it("encodeAlbum should be equal to an array of albums arist, id undefined", () => {
    expect(
      service.encodeAlbum({ ...album, artists: undefined, id: undefined })
    ).toEqual({
      ...album,
      artists: undefined,
      id: undefined,
      songs: songPaginationEncoded,
    });
  });

  it("encodeArtist should be equal to an array of artists", () => {
    expect(service.encodeArtist(artist)).toEqual(artistEncoded);
  });

  it("encodeSong should be equal to a list of songs", () => {
    expect(service.encodeSong(song)).toEqual(songEncoded);
  });

  it("encodeSong should be equal to a list of songs album undefined", () => {
    expect(service.encodeSong({ ...song, album: undefined })).toEqual({
      ...song,
      album: undefined,
      artists: [
        {
          followersCount: 0,
          id: "SHY",
          type: DataArtistType.feat,
        },
      ],
      id: "SHY",
    });
  });

  it("encodePlaylist should be equal to a list of playlists", () => {
    expect(service.encodePlaylist(playlist)).toEqual(playlistEncoded);
  });

  it("encodePlaylist should be equal to a list of playlists songs undefined", () => {
    expect(service.encodePlaylist({ ...playlist, songs: undefined })).toEqual({
      ...playlist,
      songs: undefined,
    });
  });

  it("encodeSearchshould be equal to a list of searches", () => {
    expect(service.encodeSearch(search)).toEqual(searchEncoded);
  });

  it("encodeSearchshould be equal to a list of searches fields undefined", () => {
    expect(service.encodeSearch(searchFieldsUndefined)).toEqual(
      searchFieldsUndefined
    );
  });
});
