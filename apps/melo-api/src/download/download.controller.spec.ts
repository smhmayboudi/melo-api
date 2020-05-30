import {
  AlbumResDto,
  ArtistResDto,
  DataArtistType,
  DataSearchType,
  DownloadOrderByType,
  DownloadSongParamReqDto,
  DownloadSongQueryReqDto,
  DownloadSongResDto,
  PlaylistResDto,
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
import { DownloadConfigService } from "./download.config.service";
import { DownloadConfigServiceInterface } from "./download.config.service.interface";
import { DownloadController } from "./download.controller";
import { DownloadService } from "./download.service";
import { DownloadServiceInterface } from "./download.service.interface";

describe("DownloadController", () => {
  const releaseDate = new Date();
  const artist: ArtistResDto = {
    followersCount: 0,
    id: 0,
    type: DataArtistType.prime,
  };
  const album: AlbumResDto = {
    name: "",
    releaseDate,
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
  const downloadSong: DownloadSongResDto = {
    downloadedAt: releaseDate,
    song,
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
  const downloadConfigServiceMock: DownloadConfigServiceInterface = {
    elasticsearchNode: "",
    indexName: "",
    maxSize: 0,
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
  const downloadServiceMock: DownloadServiceInterface = {
    downloadedSongs: (): Promise<DownloadSongResDto[]> =>
      Promise.resolve([downloadSong]),
  };

  let controller: DownloadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DownloadController],
      providers: [
        { provide: AppHashIdService, useValue: appHashIdServiceMock },
        { provide: AppSongService, useValue: appSongServiceMock },
        { provide: DownloadConfigService, useValue: downloadConfigServiceMock },
        { provide: DataConfigService, useValue: dataConfigServiceMock },
        { provide: DownloadService, useValue: downloadServiceMock },
      ],
    }).compile();
    controller = module.get<DownloadController>(DownloadController);
  });

  it("downloadedSongs should return an array of songId and dates", async () => {
    const paramDto: DownloadSongParamReqDto = {
      from: 0,
      orderBy: DownloadOrderByType.asc,
      size: 0,
    };
    const queryDto: DownloadSongQueryReqDto = {
      filter: "",
    };
    expect(
      await controller.downloadedSongs(
        0,
        DownloadOrderByType.asc,
        paramDto,
        queryDto
      )
    ).toEqual([downloadSong]);
  });
});
