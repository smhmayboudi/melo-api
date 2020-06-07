import {
  AlbumResDto,
  ArtistResDto,
  ArtistType,
  ConstImageResDto,
  SEARCH_SERVICE,
  SEARCH_SERVICE_MOOD,
  SearchMoodReqDto,
  SearchQueryReqDto,
  SearchResDto,
  SearchType,
  SongAudioResDto,
  SongResDto,
} from "@melo/common";

import { SearchService } from "./search.service";
import { Test } from "@nestjs/testing";
import { of } from "rxjs";

describe("SearchService", () => {
  const releaseDate = new Date();
  const image: ConstImageResDto = {
    cover: {
      url:
        "Cz6suIAYeF_rXp18UTsU4bHL-gaGsq2PpE2_dLMWj9s/rs:fill:1024:1024:1/dpr:1/plain/asset/pop.jpg",
    },
  };
  const artist: ArtistResDto = {
    followersCount: 0,
    fullName: "",
    id: 0,
    image,
    sumSongsDownloadsCount: 1,
    tags: [""],
    type: ArtistType.prime,
  };
  const album: AlbumResDto = {
    artists: [artist],
    downloadCount: 0,
    id: 0,
    image,
    name: "",
    releaseDate,
    tags: [""],
    tracksCount: 0,
  };
  const audio: SongAudioResDto = {
    medium: {
      fingerprint: "",
      url: "-0.mp3",
    },
  };
  const search: SearchResDto = {
    album: album,
    type: SearchType.album,
  };
  const song: SongResDto = {
    album,
    artists: [artist],
    audio,
    copyrighted: false,
    downloadCount: 0,
    duration: 0,
    hasVideo: false,
    id: 0,
    image,
    localized: false,
    lyrics: "",
    releaseDate,
    tags: [""],
    title: "",
  };

  // TODO: interface ?
  const searchClientProxyMock = {
    send: (token: string) =>
      token === SEARCH_SERVICE_MOOD ? of([song]) : of([search]),
  };

  let service: SearchService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        SearchService,
        { provide: SEARCH_SERVICE, useValue: searchClientProxyMock },
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
      query: "0",
      size: 0,
    };
    expect(await service.query(dto)).toEqual([search]);
  });

  it("mood should be equal to a list of songs", async () => {
    const dto: SearchMoodReqDto = {
      date: 1,
      from: 0,
      size: 0,
    };
    expect(await service.mood(dto)).toEqual([song]);
  });
});
