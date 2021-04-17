import {
  ArtistType,
  SearchMoodReqDto,
  SearchQueryReqDto,
  SearchResDto,
  SearchType,
  SongResDto,
} from "@melo/common";

import { SearchController } from "./search.controller";
import { SearchService } from "./search.service";
import { SearchServiceInterface } from "./search.service.interface";
import { Test } from "@nestjs/testing";

describe("SearchController", () => {
  const releaseDate = new Date();
  const search: SearchResDto = {
    type: SearchType.album,
  };
  const song: SongResDto = {
    artists: [
      {
        followersCount: 0,
        id: 0,
        type: ArtistType.prime,
      },
    ],
    audio: {},
    duration: 0,
    id: 0,
    localized: false,
    releaseDate,
    title: "",
  };
  const searchServiceMock: SearchServiceInterface = {
    mood: () => Promise.resolve([song]),
    query: () => Promise.resolve([search]),
  };

  let controller: SearchController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
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
      from: 0,
      query: "0",
      size: 0,
    };
    expect(await controller.query(dto)).toEqual([search]);
  });

  it("mood should be equal to a list of songs", async () => {
    const dto: SearchMoodReqDto = {
      from: 0,
      size: 0,
    };
    expect(await controller.mood(dto)).toEqual([song]);
  });
});
