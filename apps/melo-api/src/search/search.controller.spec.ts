import {
  AlbumResDto,
  ArtistResDto,
  ArtistType,
  ConstImageResDto,
  PlaylistResDto,
  SearchMoodParamReqDto,
  SearchMoodQueryReqDto,
  SearchQueryReqDto,
  SearchResDto,
  SearchType,
  SongAudioResDto,
  SongResDto,
} from "@melo/common";

import { AppHashIdService } from "../app/app.hash-id.service";
import { AppHashIdServiceInterface } from "../app/app.hash-id.service.interface";
import { SearchConfigService } from "./search.config.service";
import { SearchConfigServiceInterface } from "./search.config.service.interface";
import { SearchController } from "./search.controller";
import { SearchService } from "./search.service";
import { SearchServiceInterface } from "./search.service.interface";
import { Test } from "@nestjs/testing";

describe("SearchController", () => {
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
  const playlist: PlaylistResDto = {
    followersCount: 0,
    id: "000000000000000000000000",
    image,
    isPublic: false,
    releaseDate,
    songs: [song],
    title: "",
    tracksCount: 1,
  };
  const search: SearchResDto = {
    album: album,
    type: SearchType.album,
  };

  const appHashIdServiceMock: AppHashIdServiceInterface = {
    decode: (): number => 0,
    encode: (): string => "",
    encodeAlbum: () => album,
    encodeArtist: () => artist,
    encodePlaylist: () => playlist,
    encodeSearch: () => search,
    encodeSong: () => song,
  };
  const searchConfigServiceMock: SearchConfigServiceInterface = {
    cacheHost: "",
    cacheMax: 0,
    cachePort: 0,
    cacheStore: "",
    cacheTTL: 0,
  };
  const searchServiceMock: SearchServiceInterface = {
    mood: () => Promise.resolve([song]),
    query: () => Promise.resolve([search]),
  };

  let controller: SearchController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [SearchController],
      providers: [
        { provide: AppHashIdService, useValue: appHashIdServiceMock },
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
