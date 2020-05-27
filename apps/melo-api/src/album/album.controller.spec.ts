import {
  AlbumArtistsReqDto,
  AlbumGetReqDto,
  AlbumLatestReqDto,
  AlbumResDto,
  ArtistResDto,
  DataArtistType,
  DataConfigElasticSearchReqDto,
  DataConfigImageReqDto,
  DataPaginationResDto,
  DataSearchType,
  PlaylistResDto,
  SearchResDto,
  SongResDto,
} from "@melo/common";
import { Test, TestingModule } from "@nestjs/testing";

import { AlbumController } from "./album.controller";
import { AlbumService } from "./album.service";
import { AlbumServiceInterface } from "./album.service.interface";
import { AppArtistService } from "../app/app.artist.service";
import { AppArtistServiceInterface } from "../app/app.artist.service.interface";
import { AppHashIdService } from "../app/app.hash-id.service";
import { AppHashIdServiceInterface } from "../app/app.hash-id.service.interface";
import { AppSongService } from "../app/app.song.service";
import { AppSongServiceInterface } from "../app/app.song.service.interface";
import { DataAlbumService } from "../../../data/src/data.album.service";
import { DataAlbumServiceInterface } from "../../../data/src/data.album.service.interface";
import { DataConfigService } from "../../../data/src/data.config.service";
import { DataConfigServiceInterface } from "../../../data/src/data.config.service.interface";

describe("AlbumController", () => {
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
  const albumPagination: DataPaginationResDto<AlbumResDto> = {
    results: [album],
    total: 1,
  } as DataPaginationResDto<AlbumResDto>;
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
  const search: SearchResDto = {
    type: DataSearchType.album,
  };

  const appArtistMock: AppArtistServiceInterface = {
    follow: (): Promise<ArtistResDto> => Promise.resolve(artist),
    follows: (): Promise<ArtistResDto[]> => Promise.resolve([artist]),
  };
  const albumServiceMock: AlbumServiceInterface = {
    albums: (): Promise<DataPaginationResDto<AlbumResDto>> =>
      Promise.resolve(albumPagination),
    get: (): Promise<AlbumResDto> => Promise.resolve(album),
    latest: (): Promise<DataPaginationResDto<AlbumResDto>> =>
      Promise.resolve(albumPagination),
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
  const dataAlbumServiceMock: DataAlbumServiceInterface = {
    albums: (): Promise<DataPaginationResDto<AlbumResDto>> =>
      Promise.resolve(albumPagination),
    get: (): Promise<AlbumResDto> => Promise.resolve(album),
    latest: (): Promise<DataPaginationResDto<AlbumResDto>> =>
      Promise.resolve(albumPagination),
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

  let controller: AlbumController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlbumController],
      providers: [
        { provide: AlbumService, useValue: albumServiceMock },
        { provide: AppArtistService, useValue: appArtistMock },
        { provide: AppHashIdService, useValue: appHashIdServiceMock },
        { provide: AppSongService, useValue: appSongMock },
        { provide: DataAlbumService, useValue: dataAlbumServiceMock },
        { provide: DataConfigService, useValue: dataConfigServiceMock },
      ],
    }).compile();
    controller = module.get<AlbumController>(AlbumController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("albums should equal list of albums", async () => {
    const dto: AlbumArtistsReqDto = {
      dataConfigElasticSearch,
      dataConfigImage,
      from: 0,
      id: 0,
      size: 0,
    };
    expect(await controller.albums(dto)).toEqual(albumPagination);
  });

  it("get should be equal to an album", async () => {
    const dto: AlbumGetReqDto = {
      dataConfigElasticSearch,
      dataConfigImage,
      id: 0,
    };
    expect(await controller.get(dto)).toEqual(album);
  });

  it("latest should equal list of albums", async () => {
    const dto: AlbumLatestReqDto = {
      dataConfigElasticSearch,
      dataConfigImage,
      from: 0,
      language: "",
      size: 0,
    };
    expect(await controller.latest(dto)).toEqual(albumPagination);
  });
});
