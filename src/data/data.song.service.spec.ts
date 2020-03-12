import { HttpService } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AxiosResponse } from "axios";
import { Observable, of } from "rxjs";
import { DataArtistType } from "./data.artist.type";
import { DataConfigService } from "./data.config.service";
import { DataOrderByType } from "./data.order-by.type";
import { DataSongService } from "./data.song.service";
import { DataSongArtistSongsTopReqDto } from "./dto/req/data.song.artist-songs-top.req.dto";
import { DataSongArtistsReqDto } from "./dto/req/data.song.artists.req.dto";
import { DataSongByIdReqDto } from "./dto/req/data.song.by-id.req.dto";
import { DataSongByIdsReqDto } from "./dto/req/data.song.by-ids.req.dto";
import { DataSongGenreReqDto } from "./dto/req/data.song.genre.req.dto";
import { DataSongLanguageReqDto } from "./dto/req/data.song.language.req.dto";
import { DataSongMoodReqDto } from "./dto/req/data.song.mood.req.dto";
import { DataSongNewPodcastReqDto } from "./dto/req/data.song.new-podcast.req.dto";
import { DataSongNewReqDto } from "./dto/req/data.song.new.req.dto";
import { DataSongPodcastReqDto } from "./dto/req/data.song.podcast.req.dto";
import { DataSongSearchMoodReqDto } from "./dto/req/data.song.search-mood.req.dto";
import { DataSongSimilarReqDto } from "./dto/req/data.song.similar.req.dto";
import { DataSongTopDayReqDto } from "./dto/req/data.song.top-day.req.dto";
import { DataSongTopWeekReqDto } from "./dto/req/data.song.top-week.req.dto";
import { DataPaginationResDto } from "./dto/res/data.pagination.res.dto";
import { DataSongResDto } from "./dto/res/data.song.res.dto";

describe("DataSongService", () => {
  const releaseDate = new Date();
  const song: DataSongResDto = {
    artists: [
      {
        followersCount: 0,
        id: "",
        type: DataArtistType.feat
      }
    ],
    audio: {},
    duration: 0,
    id: "",
    localized: false,
    releaseDate,
    title: ""
  };
  const songPagination: DataPaginationResDto<DataSongResDto> = {
    results: [song],
    total: 1
  } as DataPaginationResDto<DataSongResDto>;

  // TODO: interface ?
  const httpServiceMock = {
    get: (): Observable<AxiosResponse<DataPaginationResDto<DataSongResDto>>> =>
      of({
        config: {},
        data: songPagination,
        headers: {},
        status: 200,
        statusText: ""
      })
  };

  let service: DataSongService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DataSongService,
        { provide: DataConfigService, useValue: {} },
        { provide: HttpService, useValue: httpServiceMock }
      ]
    }).compile();
    service = module.get<DataSongService>(DataSongService);
  });

  it("artistSongs should be equal to a list of songs", async () => {
    const dto: DataSongArtistsReqDto = {
      from: 0,
      id: "",
      limit: 0
    };
    expect(await service.artistSongs(dto)).toEqual(songPagination);
  });

  it("artistSongsTop should be equal to a list of songs", async () => {
    const dto: DataSongArtistSongsTopReqDto = {
      from: 0,
      id: "",
      limit: 0
    };
    expect(await service.artistSongsTop(dto)).toEqual(songPagination);
  });

  it("byId should be equal to a songs", async () => {
    const dto: DataSongByIdReqDto = {
      id: 0
    };
    expect(await service.byId(dto)).toEqual(songPagination);
  });

  it("byIds should be equal to a list of songs", async () => {
    const dto: DataSongByIdsReqDto = {
      ids: []
    };
    expect(await service.byIds(dto)).toEqual(songPagination);
  });

  it("genre should be equal to a list of songs", async () => {
    const dto: DataSongGenreReqDto = {
      from: 0,
      genres: [],
      limit: 0,
      orderBy: DataOrderByType.downloads
    };
    expect(await service.genre(dto)).toEqual(songPagination);
  });

  it("language should be equal to a list of songs", async () => {
    const dto: DataSongLanguageReqDto = {
      from: 0,
      language: "",
      limit: 0,
      orderBy: DataOrderByType.downloads
    };
    expect(await service.language(dto)).toEqual(songPagination);
  });

  it("mood should be equal to a list of songs", async () => {
    const dto: DataSongMoodReqDto = {
      from: 0,
      limit: 0,
      mood: ""
    };
    expect(await service.mood(dto)).toEqual(songPagination);
  });

  it("newPodcast should be equal to a list of songs", async () => {
    const dto: DataSongNewPodcastReqDto = {
      from: 0,
      limit: 0
    };
    expect(await service.newPodcast(dto)).toEqual(songPagination);
  });

  it("newSong should be equal to a list of songs", async () => {
    const dto: DataSongNewReqDto = {
      from: 0,
      limit: 0
    };
    expect(await service.newSong(dto)).toEqual(songPagination);
  });

  it("podcast should be equal to a list of songs", async () => {
    const dto: DataSongPodcastReqDto = {
      from: 0,
      genres: [],
      limit: 0,
      orderBy: DataOrderByType.downloads
    };
    expect(await service.podcast(dto)).toEqual(songPagination);
  });

  it("searchMood should be equal to a list of songs", async () => {
    const dto: DataSongSearchMoodReqDto = {
      from: 0,
      limit: 0
    };
    expect(await service.searchMood(dto)).toEqual(songPagination);
  });

  it("similar should be equal to a list of songs", async () => {
    const dto: DataSongSimilarReqDto = {
      from: 0,
      id: 0,
      limit: 0
    };
    expect(await service.similar(dto)).toEqual(songPagination);
  });

  it("slider should be equal to a list of songs", async () => {
    expect(await service.slider()).toEqual(songPagination);
  });

  it("topDay should be equal to a list of songs", async () => {
    const dto: DataSongTopDayReqDto = {
      from: 0,
      limit: 0
    };
    expect(await service.topDay(dto)).toEqual(songPagination);
  });

  it("topWeek should be equal to a list of songs", async () => {
    const dto: DataSongTopWeekReqDto = {
      from: 0,
      limit: 0
    };
    expect(await service.topWeek(dto)).toEqual(songPagination);
  });
});
