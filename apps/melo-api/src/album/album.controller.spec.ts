import {
  AlbumArtistsReqDto,
  AlbumGetReqDto,
  AlbumLatestReqDto,
  AlbumResDto,
  ArtistResDto,
  DataArtistType,
  DataConfigElasticsearchReqDto,
  DataConfigImageReqDto,
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
  const dataConfigElasticsearch: DataConfigElasticsearchReqDto = {
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

  const appArtistServiceMock: AppArtistServiceInterface = {
    follow: (): Promise<ArtistResDto> => Promise.resolve(artist),
    follows: (): Promise<ArtistResDto[]> => Promise.resolve([artist]),
  };
  const albumServiceMock: AlbumServiceInterface = {
    albums: (): Promise<AlbumResDto[]> => Promise.resolve([album]),
    get: (): Promise<AlbumResDto> => Promise.resolve(album),
    latest: (): Promise<AlbumResDto[]> => Promise.resolve([album]),
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
  const appSongServiceMock: AppSongServiceInterface = {
    like: (): Promise<SongResDto> => Promise.resolve(song),
    likes: (): Promise<SongResDto[]> => Promise.resolve([song]),
    localize: (): Promise<SongResDto> => Promise.resolve(song),
  };
  const dataAlbumServiceMock: DataAlbumServiceInterface = {
    albums: (): Promise<AlbumResDto[]> => Promise.resolve([album]),
    get: (): Promise<AlbumResDto> => Promise.resolve(album),
    latest: (): Promise<AlbumResDto[]> => Promise.resolve([album]),
  };
  const dataConfigServiceMock: DataConfigServiceInterface = {
    elasticsearchNode: "",
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
    typeormDatabase: "",
    typeormHost: "",
    typeormLogging: true,
    typeormPassword: "",
    typeormPort: 0,
    typeormSynchronize: true,
    typeormUsername: "",
  };

  let controller: AlbumController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlbumController],
      providers: [
        { provide: AlbumService, useValue: albumServiceMock },
        { provide: AppArtistService, useValue: appArtistServiceMock },
        { provide: AppHashIdService, useValue: appHashIdServiceMock },
        { provide: AppSongService, useValue: appSongServiceMock },
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
      dataConfigElasticsearch,
      dataConfigImage,
      from: 0,
      id: 0,
      size: 0,
    };
    expect(await controller.albums(dto)).toEqual([album]);
  });

  it("get should be equal to an album", async () => {
    const dto: AlbumGetReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      id: 0,
    };
    expect(await controller.get(dto)).toEqual(album);
  });

  it("latest should equal list of albums", async () => {
    const dto: AlbumLatestReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      from: 0,
      language: "",
      size: 0,
    };
    expect(await controller.latest(dto)).toEqual([album]);
  });
});
