import {
  AlbumResDto,
  ArtistResDto,
  DataArtistType,
  DataConfigElasticsearchReqDto,
  DataConfigImageReqDto,
  DataSearchType,
  PlaylistResDto,
  SearchConfigReqDto,
  SearchMoodParamReqDto,
  SearchMoodQueryReqDto,
  SearchQueryReqDto,
  SearchResDto,
  SongResDto,
} from "@melo/common";
import { Test, TestingModule } from "@nestjs/testing";

import { AppHashIdService } from "../app/app.hash-id.service";
import { AppHashIdServiceInterface } from "../app/app.hash-id.service.interface";
import { DataConfigService } from "../data/data.config.service";
import { DataConfigServiceInterface } from "../data/data.config.service.interface";
import { SearchConfigService } from "./search.config.service";
import { SearchConfigServiceInterface } from "./search.config.service.interface";
import { SearchController } from "./search.controller";
import { SearchService } from "./search.service";
import { SearchServiceInterface } from "./search.service.interface";

describe("SearchController", () => {
  const config: SearchConfigReqDto = {
    indexName: "",
    maxSize: 0,
    scriptScore: "",
    suggestIndex: "",
  };
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
  const search: SearchResDto = {
    type: DataSearchType.album,
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

  const appHashIdServiceMock: AppHashIdServiceInterface = {
    decode: (): number => 0,
    encode: (): string => "",
    encodeAlbum: (): unknown => album,
    encodeArtist: (): unknown => artist,
    encodePlaylist: (): unknown => playlist,
    encodeSearch: (): unknown => search,
    encodeSong: (): unknown => song,
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
  const searchConfigServiceMock: SearchConfigServiceInterface = {
    cacheHost: "",
    cacheMax: 0,
    cachePort: 0,
    cacheStore: "",
    cacheTTL: 0,
    elasticsearchNode: "",
    indexName: "",
    maxSize: 0,
    scriptScore: "",
    suggestIndex: "",
  };
  const searchServiceMock: SearchServiceInterface = {
    mood: (): Promise<SongResDto[]> => Promise.resolve([song]),
    query: (): Promise<SearchResDto[]> => Promise.resolve([search]),
  };

  let controller: SearchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SearchController],
      providers: [
        { provide: AppHashIdService, useValue: appHashIdServiceMock },
        { provide: DataConfigService, useValue: dataConfigServiceMock },
        { provide: SearchConfigService, useValue: searchConfigServiceMock },
        { provide: SearchService, useValue: searchServiceMock },
      ],
    }).compile();
    controller = module.get<SearchController>(SearchController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("query should be equal to a list of search results", async () => {
    const dto: SearchQueryReqDto = {
      config,
      dataConfigElasticsearch,
      dataConfigImage,
      from: 0,
      query: "0",
      size: 0,
    };
    expect(await controller.query(dto)).toEqual([search]);
  });

  it("mood should be equal to a list of songs", async () => {
    const paramDto: SearchMoodParamReqDto = {
      from: 0,
      size: 0,
    };
    const queryDto: SearchMoodQueryReqDto = {};
    expect(await controller.mood(paramDto, queryDto)).toEqual([song]);
  });
});
