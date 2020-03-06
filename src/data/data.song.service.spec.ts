import { HttpService } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { of } from "rxjs";
import { DataArtistType } from "./data.artist.type";
import { DataConfigService } from "./data.config.service";
import { DataConfigServiceInterface } from "./data.config.service.interface";
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
  describe("paginated songs", () => {
    const song: DataSongResDto = {
      artists: [
        {
          followersCount: 0,
          id: "",
          type: DataArtistType.prime
        }
      ],
      audio: {},
      duration: 0,
      id: "",
      localized: false,
      releaseDate: new Date(),
      title: ""
    };
    const songPagination: DataPaginationResDto<DataSongResDto> = {
      results: [song],
      total: 1
    } as DataPaginationResDto<DataSongResDto>;
    const observable = {
      status: 0,
      statusText: "",
      headers: "",
      config: {}
    };
    const dataPaginationObservable = {
      data: songPagination,
      ...observable
    };
    const dataObservable = {
      data: song,
      ...observable
    };
    const dataConfigServiceMock: DataConfigServiceInterface = {
      timeout: 0,
      url: ""
    };

    let service: DataSongService;
    let httpService: HttpService;

    beforeEach(async () => {
      // TODO: interface ?
      const songHttpServiceMock = {
        get: (): any => dataObservable
      };

      const module: TestingModule = await Test.createTestingModule({
        providers: [
          DataSongService,
          { provide: DataConfigService, useValue: dataConfigServiceMock },
          { provide: HttpService, useValue: songHttpServiceMock }
        ]
      }).compile();
      service = module.get<DataSongService>(DataSongService);
      httpService = module.get<HttpService>(HttpService);
    });

    it("artistSongs should return a list of songs", async () => {
      const dto: DataSongArtistsReqDto = {
        from: 0,
        id: "",
        limit: 0
      };
      jest
        .spyOn(httpService, "get")
        .mockImplementationOnce(() => of(dataPaginationObservable));
      expect(await service.artistSongs(dto)).toEqual(songPagination);
    });

    it("artistSongsTop should return a list of songs", async () => {
      const dto: DataSongArtistSongsTopReqDto = {
        from: 0,
        id: "",
        limit: 0
      };
      jest
        .spyOn(httpService, "get")
        .mockImplementationOnce(() => of(dataPaginationObservable));
      expect(await service.artistSongsTop(dto)).toEqual(songPagination);
    });

    it("byIds should return a list of songs", async () => {
      const dto: DataSongByIdsReqDto = {
        ids: []
      };
      jest
        .spyOn(httpService, "get")
        .mockImplementationOnce(() => of(dataPaginationObservable));
      expect(await service.byIds(dto)).toEqual(songPagination);
    });

    it("genre should return a list of songs", async () => {
      const dto: DataSongGenreReqDto = {
        from: 0,
        genres: [],
        limit: 0,
        orderBy: DataOrderByType.downloads
      };
      jest
        .spyOn(httpService, "get")
        .mockImplementationOnce(() => of(dataPaginationObservable));
      expect(await service.genre(dto)).toEqual(songPagination);
    });

    it("language should return a list of songs", async () => {
      const dto: DataSongLanguageReqDto = {
        from: 0,
        language: "",
        limit: 0,
        orderBy: DataOrderByType.downloads
      };
      jest
        .spyOn(httpService, "get")
        .mockImplementationOnce(() => of(dataPaginationObservable));
      expect(await service.language(dto)).toEqual(songPagination);
    });

    it("mood should return a list of songs", async () => {
      const dto: DataSongMoodReqDto = {
        from: 0,
        limit: 0,
        mood: ""
      };
      jest
        .spyOn(httpService, "get")
        .mockImplementationOnce(() => of(dataPaginationObservable));
      expect(await service.mood(dto)).toEqual(songPagination);
    });

    it("newPodcast should return a list of songs", async () => {
      const dto: DataSongNewPodcastReqDto = {
        from: 0,
        limit: 0
      };
      jest
        .spyOn(httpService, "get")
        .mockImplementationOnce(() => of(dataPaginationObservable));
      expect(await service.newPodcast(dto)).toEqual(songPagination);
    });

    it("newSong should return a list of songs", async () => {
      const dto: DataSongNewReqDto = {
        from: 0,
        limit: 0
      };
      jest
        .spyOn(httpService, "get")
        .mockImplementationOnce(() => of(dataPaginationObservable));
      expect(await service.newSong(dto)).toEqual(songPagination);
    });

    it("podcast should return a list of songs", async () => {
      const dto: DataSongPodcastReqDto = {
        from: 0,
        genres: [],
        limit: 0,
        orderBy: DataOrderByType.downloads
      };
      jest
        .spyOn(httpService, "get")
        .mockImplementationOnce(() => of(dataPaginationObservable));
      expect(await service.podcast(dto)).toEqual(songPagination);
    });

    it("searchMood should return a list of songs", async () => {
      const dto: DataSongSearchMoodReqDto = {
        from: 0,
        limit: 0
      };
      jest
        .spyOn(httpService, "get")
        .mockImplementationOnce(() => of(dataPaginationObservable));
      expect(await service.searchMood(dto)).toEqual(songPagination);
    });

    it("similar should return a list of songs", async () => {
      const dto: DataSongSimilarReqDto = {
        from: 0,
        id: 0,
        limit: 0
      };
      jest
        .spyOn(httpService, "get")
        .mockImplementationOnce(() => of(dataPaginationObservable));
      expect(await service.similar(dto)).toEqual(songPagination);
    });

    it("slider should return a list of songs", async () => {
      jest
        .spyOn(httpService, "get")
        .mockImplementationOnce(() => of(dataPaginationObservable));
      expect(await service.slider()).toEqual(songPagination);
    });

    it("topDay should return a list of songs", async () => {
      const dto: DataSongTopDayReqDto = {
        from: 0,
        limit: 0
      };
      jest
        .spyOn(httpService, "get")
        .mockImplementation(() => of(dataPaginationObservable));
      expect(await service.topDay(dto)).toEqual(songPagination);
    });

    it("topWeek should return a list of songs", async () => {
      const dto: DataSongTopWeekReqDto = {
        from: 0,
        limit: 0
      };
      jest
        .spyOn(httpService, "get")
        .mockImplementationOnce(() => of(dataPaginationObservable));
      expect(await service.topWeek(dto)).toEqual(songPagination);
    });
  });
  describe("single songs", () => {
    const song: DataSongResDto = {
      artists: [
        {
          followersCount: 0,
          id: "",
          type: DataArtistType.prime
        }
      ],
      audio: {},
      duration: 0,
      id: "",
      localized: false,
      releaseDate: new Date(),
      title: ""
    };
    const observable = {
      status: 0,
      statusText: "",
      headers: "",
      config: {}
    };
    const dataObservable = {
      data: song,
      ...observable
    };
    const dataConfigServiceMock: DataConfigServiceInterface = {
      timeout: 0,
      url: ""
    };

    let service: DataSongService;
    let httpService: HttpService;

    beforeEach(async () => {
      // TODO: interface ?
      const songHttpServiceMock = {
        get: (): any => dataObservable
      };
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          DataSongService,
          { provide: DataConfigService, useValue: dataConfigServiceMock },
          { provide: HttpService, useValue: songHttpServiceMock }
        ]
      }).compile();
      service = module.get<DataSongService>(DataSongService);
      httpService = module.get<HttpService>(HttpService);
    });
    it("byId should return a songs", async () => {
      const dto: DataSongByIdReqDto = {
        id: 0
      };
      jest
        .spyOn(httpService, "get")
        .mockImplementationOnce(() => of(dataObservable));
      expect(await service.byId(dto)).toEqual(song);
    });
  });
});
