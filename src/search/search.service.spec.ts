import { Test, TestingModule } from "@nestjs/testing";

import { DataArtistType } from "../data/data.artist.type";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataSearchResDto } from "../data/dto/res/data.search.res.dto";
import { DataSearchService } from "../data/data.search.service";
import { DataSearchServiceInterface } from "../data/data.search.service.interface";
import { DataSearchType } from "../data/data.search.type";
import { DataSongResDto } from "../data/dto/res/data.song.res.dto";
import { SearchMoodParamDto } from "./dto/req/search.mood.param.req.dto";
import { SearchMoodQueryDto } from "./dto/req/search.mood.query.req.dto";
import { SearchQueryReqDto } from "./dto/req/search.query.req.dto";
import { SearchService } from "./search.service";

describe("SearchService", () => {
  const releaseDate = new Date();
  const search: DataSearchResDto = {
    type: DataSearchType.album,
  };
  const searchPagination: DataPaginationResDto<DataSearchResDto> = {
    results: [search],
    total: 1,
  } as DataPaginationResDto<DataSearchResDto>;
  const song: DataSongResDto = {
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
  const songPagination: DataPaginationResDto<DataSongResDto> = {
    results: [song],
    total: 1,
  } as DataPaginationResDto<DataSongResDto>;

  const dataSearchServiceMock: DataSearchServiceInterface = {
    mood: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    query: (): Promise<DataPaginationResDto<DataSearchResDto>> =>
      Promise.resolve(searchPagination),
  };

  let service: SearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SearchService,
        { provide: DataSearchService, useValue: dataSearchServiceMock },
      ],
    }).compile();
    service = module.get<SearchService>(SearchService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("query should be equal to a list of search results", async () => {
    const dto: SearchQueryReqDto = {
      from: 0,
      limit: 0,
      query: "",
    };
    expect(await service.query(dto)).toEqual(searchPagination);
  });

  it("mood should be equal to a list of songs", async () => {
    const paramDto: SearchMoodParamDto = {
      from: 0,
      limit: 0,
    };
    const queryDto: SearchMoodQueryDto = {};
    expect(await service.mood(paramDto, queryDto)).toEqual(songPagination);
  });
});
