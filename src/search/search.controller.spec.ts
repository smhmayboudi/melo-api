import { Test, TestingModule } from "@nestjs/testing";

import { AppEncodingService } from "../app/app.encoding.service";
import { AppEncodingServiceInterface } from "../app/app.encoding.service.interface";
import { AppHashIdService } from "../app/app.hash-id.service";
import { AppHashIdServiceInterface } from "../app/app.hash-id.service.interface";
import { DataAlbumResDto } from "../data/dto/res/data.album.res.dto";
import { DataArtistResDto } from "../data/dto/res/data.artist.res.dto";
import { DataArtistType } from "../data/data.artist.type";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataPlaylistResDto } from "../data/dto/res/data.playlist.res.dto";
import { DataSearchResDto } from "../data/dto/res/data.search.res.dto";
import { DataSearchType } from "../data/data.search.type";
import { DataSongResDto } from "../data/dto/res/data.song.res.dto";
import { SearchController } from "./search.controller";
import { SearchMoodParamDto } from "./dto/req/search.mood.param.req.dto";
import { SearchMoodQueryDto } from "./dto/req/search.mood.query.req.dto";
import { SearchQueryReqDto } from "./dto/req/search.query.req.dto";
import { SearchService } from "./search.service";
import { SearchServiceInterface } from "./search.service.interface";

describe("SearchController", () => {
  const releaseDate = new Date();
  const album: DataAlbumResDto = {
    name: "",
    releaseDate,
  };
  const artist: DataArtistResDto = {
    followersCount: 0,
    id: 0,
    type: DataArtistType.prime,
  };
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
    title: "",
    tracksCount: 0,
  };

  const appEncodingServiceMock: AppEncodingServiceInterface = {
    encodeAlbums: (): DataAlbumResDto[] => [album],
    encodeArtists: (): DataArtistResDto[] => [artist],
    encodePlaylists: (): DataPlaylistResDto[] => [playlist],
    encodeSearches: (): DataSearchResDto[] => [search],
    encodeSongs: (): DataSongResDto[] => [song],
  };
  const appHashIdServiceMock: AppHashIdServiceInterface = {
    decode: (): number => 0,
    encode: (): string => "",
  };
  const searchServiceMock: SearchServiceInterface = {
    mood: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    query: (): Promise<DataPaginationResDto<DataSearchResDto>> =>
      Promise.resolve(searchPagination),
  };

  let controller: SearchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SearchController],
      providers: [
        { provide: AppEncodingService, useValue: appEncodingServiceMock },
        { provide: AppHashIdService, useValue: appHashIdServiceMock },
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
      from: 0,
      limit: 0,
      query: "0",
    };
    expect(await controller.query(dto)).toEqual(searchPagination);
  });

  it("searchMood should be equal to a list of songs", async () => {
    const paramDto: SearchMoodParamDto = {
      from: 0,
      limit: 0,
    };
    const queryDto: SearchMoodQueryDto = {};
    expect(await controller.searchMood(paramDto, queryDto)).toEqual(
      songPagination
    );
  });
});
