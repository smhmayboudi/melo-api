import {
  AlbumResDto,
  ArtistResDto,
  DataArtistType,
  DataConfigElasticSearchReqDto,
  DataConfigImageReqDto,
  DataPaginationResDto,
  DataSearchType,
  PlaylistAddSongReqDto,
  PlaylistConfigReqDto,
  PlaylistCreateReqDto,
  PlaylistDeleteReqDto,
  PlaylistEditReqDto,
  PlaylistGetReqDto,
  PlaylistMyReqDto,
  PlaylistRemoveSongReqDto,
  PlaylistResDto,
  PlaylistTopReqDto,
  SearchResDto,
  SongResDto,
} from "@melo/common";
import { Test, TestingModule } from "@nestjs/testing";

import { AppHashIdService } from "../app/app.hash-id.service";
import { AppHashIdServiceInterface } from "../app/app.hash-id.service.interface";
import { AppSongService } from "../app/app.song.service";
import { AppSongServiceInterface } from "../app/app.song.service.interface";
import { DataConfigService } from "../../../data/src/data.config.service";
import { DataConfigServiceInterface } from "../../../data/src/data.config.service.interface";
import { PlaylistConfigService } from "./playlist.config.service";
import { PlaylistConfigServiceInterface } from "./playlist.config.service.interface";
import { PlaylistController } from "./playlist.controller";
import { PlaylistService } from "./playlist.service";
import { PlaylistServiceInterface } from "./playlist.service.interface";

describe("PlaylistController", () => {
  const config: PlaylistConfigReqDto = {
    imagePath: "",
    imagePathDefaultPlaylist: "",
  };
  const dataConfigElasticSearch: DataConfigElasticSearchReqDto = {
    imagePath: "",
    imagePathDefaultAlbum: "",
    imagePathDefaultArtist: "",
    imagePathDefaultSong: "",
    indexName: "",
    maxSize: 0,
    mp3Endpoint: "",
  };
  const dataConfigImage: DataConfigImageReqDto = {
    imageBaseUrl: "",
    imageEncode: true,
    imageKey: "",
    imageSalt: "",
    imageSignatureSize: 1,
    imageTypeSize: [
      {
        height: 0,
        name: "",
        width: 0,
      },
    ],
  };
  const releaseDate = new Date();
  const album: AlbumResDto = {
    name: "",
    releaseDate,
  };
  const artist: ArtistResDto = {
    followersCount: 0,
    id: 0,
    type: DataArtistType.prime,
  };
  const playlist: PlaylistResDto = {
    followersCount: 0,
    id: "",
    image: {
      "": {
        url: "",
      },
    },
    isPublic: false,
    releaseDate,
    title: "",
    tracksCount: 0,
  };
  const playlistPagination: DataPaginationResDto<PlaylistResDto> = {
    results: [playlist],
    total: 1,
  } as DataPaginationResDto<PlaylistResDto>;
  const song: SongResDto = {
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
  const search: SearchResDto = {
    type: DataSearchType.album,
  };

  const appHashIdServiceMock: AppHashIdServiceInterface = {
    decode: (): number => 0,
    encode: (): string => "",
    encodeAlbum: (): unknown => album,
    encodeArtist: (): unknown => artist,
    encodePlaylist: (): unknown => playlist,
    encodeSearch: (): unknown => search,
    encodeSong: (): unknown => song,
  };
  const appSongMock: AppSongServiceInterface = {
    like: (): Promise<SongResDto> => Promise.resolve(song),
    likes: (): Promise<SongResDto[]> => Promise.resolve([song]),
    localize: (): Promise<SongResDto> => Promise.resolve(song),
  };
  const dataConfigServiceMock: DataConfigServiceInterface = {
    elasticNode: "",
    imageBaseUrl: "",
    imageEncode: true,
    imageKey: "",
    imagePath: "",
    imagePathDefaultAlbum: "",
    imagePathDefaultArtist: "",
    imagePathDefaultSong: "",
    imageSalt: "",
    imageSignatureSize: 32,
    imageTypeSize: [{ height: 1024, name: "cover", width: 1024 }],
    indexName: "",
    maxSize: 0,
    mp3Endpoint: "",
    typeOrmDatabase: "",
    typeOrmHost: "",
    typeOrmLogging: true,
    typeOrmPassword: "",
    typeOrmPort: 0,
    typeOrmSynchronize: true,
    typeOrmUsername: "",
  };
  const playlistConfigServiceMock: PlaylistConfigServiceInterface = {
    cacheHost: "",
    cacheMax: 0,
    cachePort: 0,
    cacheStore: "",
    cacheTTL: 0,
    imagePath: "",
    imagePathDefaultPlaylist: "",
  };
  const playlistServiceMock: PlaylistServiceInterface = {
    addSong: (): Promise<PlaylistResDto> => Promise.resolve(playlist),
    create: (): Promise<PlaylistResDto> => Promise.resolve(playlist),
    delete: (): Promise<PlaylistResDto> => Promise.resolve(playlist),
    edit: (): Promise<PlaylistResDto> => Promise.resolve(playlist),
    get: (): Promise<PlaylistResDto> => Promise.resolve(playlist),
    my: (): Promise<DataPaginationResDto<PlaylistResDto>> =>
      Promise.resolve(playlistPagination),
    removeSong: (): Promise<PlaylistResDto> => Promise.resolve(playlist),
    top: (): Promise<DataPaginationResDto<PlaylistResDto>> =>
      Promise.resolve(playlistPagination),
  };

  let controller: PlaylistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlaylistController],
      providers: [
        { provide: AppHashIdService, useValue: appHashIdServiceMock },
        { provide: AppSongService, useValue: appSongMock },
        { provide: DataConfigService, useValue: dataConfigServiceMock },
        { provide: PlaylistConfigService, useValue: playlistConfigServiceMock },
        { provide: PlaylistService, useValue: playlistServiceMock },
      ],
    }).compile();
    controller = module.get<PlaylistController>(PlaylistController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("addSong should be equal to a playlist", async () => {
    const dto: PlaylistAddSongReqDto = {
      config,
      dataConfigElasticSearch,
      dataConfigImage,
      playlistId: "000000000000",
      songId: 0,
    };
    expect(await controller.addSong(dto)).toEqual(playlist);
  });

  it("create should be equal to a playlist", async () => {
    const dto: PlaylistCreateReqDto = {
      config,
      dataConfigElasticSearch,
      dataConfigImage,
      sub: 1,
      title: "",
    };
    expect(await controller.create(dto, 0)).toEqual(playlist);
  });

  it("delete should be equal to a playlist", async () => {
    const dto: PlaylistDeleteReqDto = {
      config,
      dataConfigElasticSearch,
      dataConfigImage,
      id: "",
      sub: 1,
    };
    expect(await controller.delete(dto, 0)).toEqual(playlist);
  });

  it("edit should be equal to a playlist", async () => {
    const dto: PlaylistEditReqDto = {
      config,
      dataConfigElasticSearch,
      dataConfigImage,
      id: "",
    };
    expect(await controller.edit(dto)).toEqual(playlist);
  });

  it("get should be equal to a playlist", async () => {
    const dto: PlaylistGetReqDto = {
      config,
      dataConfigElasticSearch,
      dataConfigImage,
      id: "",
    };
    expect(await controller.get(dto)).toEqual(playlist);
  });

  it("my should be equal to a list of playlists", async () => {
    const dto: PlaylistMyReqDto = {
      config,
      dataConfigElasticSearch,
      dataConfigImage,
      from: 0,
      size: 0,
      sub: 1,
    };
    expect(await controller.my(dto, 0)).toEqual(playlistPagination);
  });

  it("removeSong should be equal to a playlist", async () => {
    const dto: PlaylistRemoveSongReqDto = {
      config,
      dataConfigElasticSearch,
      dataConfigImage,
      playlistId: "000000000000",
      songId: 0,
    };
    expect(await controller.removeSong(dto)).toEqual(playlist);
  });

  it("top should be equal to a list of playlists", async () => {
    const dto: PlaylistTopReqDto = {
      config,
      dataConfigElasticSearch,
      dataConfigImage,
      from: 0,
      size: 0,
    };
    expect(await controller.top(dto)).toEqual(playlistPagination);
  });
});
