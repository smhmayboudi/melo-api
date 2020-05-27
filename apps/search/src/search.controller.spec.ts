import {
  DataArtistType,
  DataConfigElasticSearchReqDto,
  DataConfigImageReqDto,
  DataPaginationResDto,
  DataSearchType,
  SearchConfigReqDto,
  SearchMoodReqDto,
  SearchQueryReqDto,
  SearchResDto,
  SongResDto,
} from "@melo/common";
import { Test, TestingModule } from "@nestjs/testing";

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
  const search: SearchResDto = {
    type: DataSearchType.album,
  };
  const searchPagination: DataPaginationResDto<SearchResDto> = {
    results: [search],
    total: 1,
  } as DataPaginationResDto<SearchResDto>;
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
  const songPagination: DataPaginationResDto<SongResDto> = {
    results: [song],
    total: 1,
  } as DataPaginationResDto<SongResDto>;

  const searchServiceMock: SearchServiceInterface = {
    mood: (): Promise<DataPaginationResDto<SongResDto>> =>
      Promise.resolve(songPagination),
    query: (): Promise<DataPaginationResDto<SearchResDto>> =>
      Promise.resolve(searchPagination),
  };

  let controller: SearchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SearchController],
      providers: [{ provide: SearchService, useValue: searchServiceMock }],
    }).compile();
    controller = module.get<SearchController>(SearchController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("query should be equal to a list of search results", async () => {
    const dto: SearchQueryReqDto = {
      config,
      dataConfigElasticSearch,
      dataConfigImage,
      from: 0,
      query: "0",
      size: 0,
    };
    expect(await controller.query(dto)).toEqual(searchPagination);
  });

  it("mood should be equal to a list of songs", async () => {
    const dto: SearchMoodReqDto = {
      config,
      dataConfigElasticSearch,
      from: 0,
      size: 0,
    };
    expect(await controller.mood(dto)).toEqual(songPagination);
  });
});
