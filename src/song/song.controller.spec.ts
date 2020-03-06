import { Test, TestingModule } from "@nestjs/testing";
import { AppHashIdService } from "../app/app.hash-id.service";
import { AppHashIdServiceInterface } from "../app/app.hash-id.service.interface";
import { DataArtistType } from "../data/data.artist.type";
import { DataOrderByType } from "../data/data.order-by.type";
import { DataSongNewPodcastReqDto } from "../data/dto/req/data.song.new-podcast.req.dto";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataSongResDto } from "../data/dto/res/data.song.res.dto";
import { SongArtistSongsReqDto } from "./dto/req/song.artist-songs.req.dto";
import { SongByIdReqDto } from "./dto/req/song.by-id.req.dto";
import { SongLanguageReqDto } from "./dto/req/song.language.req.dto";
import { SongLikeReqDto } from "./dto/req/song.like.req.dto";
import { SongLikedReqDto } from "./dto/req/song.liked.req.dto";
import { SongMoodReqDto } from "./dto/req/song.mood.req.dto";
import { SongNewReqDto } from "./dto/req/song.new.req.dto";
import { SongPodcastGenresParamReqDto } from "./dto/req/song.podcast.genres.param.req.dto";
import { SongPodcastGenresQueryReqDto } from "./dto/req/song.podcast.genres.query.req.dto";
import { SongSearchMoodParamDto } from "./dto/req/song.search-mood.param.req.dto";
import { SongSearchMoodQueryDto } from "./dto/req/song.search-mood.query.req.dto";
import { SongSendTelegramReqDto } from "./dto/req/song.send-telegram.req.dto";
import { SongSimilarReqDto } from "./dto/req/song.similar.req.dto";
import { SongSongGenresParamReqDto } from "./dto/req/song.song.genres.param.req.dto";
import { SongSongGenresQueryReqDto } from "./dto/req/song.song.genres.query.req.dto";
import { SongTopDayReqDto } from "./dto/req/song.top-day.req.dto";
import { SongTopWeekReqDto } from "./dto/req/song.top-week.req.dto";
import { SongUnlikeReqDto } from "./dto/req/song.unlike.req.dto";
import { SongController } from "./song.controller";
import { SongService } from "./song.service";
import { SongServiceInterface } from "./song.service.interface";

describe("SongController", () => {
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

  const appHashIdServiceMock: AppHashIdServiceInterface = {
    decode: (): number => 0,
    encode: (): string => ""
  };
  const songServiceMock: SongServiceInterface = {
    artistSongs: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    artistSongsTop: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    byId: (): Promise<DataSongResDto> => Promise.resolve(song),
    genre: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    language: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    like: (): Promise<DataSongResDto> => Promise.resolve(song),
    liked: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    mood: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    newPodcast: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    newSong: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    podcast: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    searchMood: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    sendTelegram: (): Promise<void> => Promise.resolve(undefined),
    similar: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    slider: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    topDay: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    topWeek: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    unlike: (): Promise<DataSongResDto> => Promise.resolve(song)
  };

  let controller: SongController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SongController],
      providers: [
        { provide: AppHashIdService, useValue: appHashIdServiceMock },
        { provide: SongService, useValue: songServiceMock }
      ]
    }).compile();
    controller = module.get<SongController>(SongController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("artistSongs should return a list of songs", async () => {
    const dto: SongArtistSongsReqDto = {
      from: 0,
      artistId: "0",
      limit: 0
    };
    expect(await controller.artistSongs(dto, 0, 0)).toBe(songPagination);
  });

  it("artistSongsTop should return a list of songs", async () => {
    const dto: SongArtistSongsReqDto = {
      from: 0,
      artistId: "0",
      limit: 0
    };
    expect(await controller.artistSongsTop(dto, 0, 0)).toBe(songPagination);
  });

  it("byId should return a song", async () => {
    const dto: SongByIdReqDto = {
      id: ""
    };
    expect(await controller.byId(dto, 0, 0)).toBe(song);
  });

  it("genre should return a list of songs", async () => {
    const paramDto: SongSongGenresParamReqDto = {
      from: 0,
      limit: 0,
      orderBy: DataOrderByType.downloads
    };
    const queryDto: SongSongGenresQueryReqDto = {
      genres: [""]
    };
    expect(
      await controller.genre(DataOrderByType.downloads, paramDto, queryDto, 0)
    ).toBe(songPagination);
  });

  it("language should return a list of songs", async () => {
    const dto: SongLanguageReqDto = {
      from: 0,
      language: "",
      limit: 0,
      orderBy: DataOrderByType.downloads
    };
    expect(await controller.language(DataOrderByType.downloads, dto, 0)).toBe(
      songPagination
    );
  });

  it("like should return a songs", async () => {
    const dto: SongLikeReqDto = {
      id: ""
    };
    expect(await controller.like(dto, 0, 0)).toBe(song);
  });

  it("liked should return a list of songs", async () => {
    const dto: SongLikedReqDto = {
      from: 0,
      limit: 0
    };
    expect(await controller.liked(dto, 0)).toBe(songPagination);
  });

  it("mood should return a list of songs", async () => {
    const dto: SongMoodReqDto = {
      from: 0,
      limit: 0,
      mood: ""
    };
    expect(await controller.mood(dto, 0)).toBe(songPagination);
  });

  it("newPodcast should return a list of songs", async () => {
    const dto: DataSongNewPodcastReqDto = {
      from: 0,
      limit: 0
    };
    expect(await controller.newPodcast(dto, 0)).toBe(songPagination);
  });

  it("newSong should return a list of songs", async () => {
    const dto: SongNewReqDto = {
      from: 0,
      limit: 0
    };
    expect(await controller.newSong(dto, 0)).toBe(songPagination);
  });

  it("podcastGenre should return a list of songs", async () => {
    const paramDto: SongPodcastGenresParamReqDto = {
      from: 0,
      limit: 0,
      orderBy: DataOrderByType.downloads
    };
    const queryDto: SongPodcastGenresQueryReqDto = {
      genres: [""]
    };
    expect(
      await controller.podcast(DataOrderByType.downloads, paramDto, queryDto, 0)
    ).toBe(songPagination);
  });

  it("searchMood should return a list of songs", async () => {
    const paramDto: SongSearchMoodParamDto = {
      from: 0,
      limit: 0
    };
    const queryDto: SongSearchMoodQueryDto = {};
    expect(await controller.searchMood(paramDto, queryDto)).toBe(
      songPagination
    );
  });

  it("sendTelegram should be defined", async () => {
    const dto: SongSendTelegramReqDto = {
      id: "0"
    };
    expect(await controller.sendTelegram(dto, 0, 0)).toBe(undefined);
  });

  it("similar should return a list of songs", async () => {
    const dto: SongSimilarReqDto = {
      from: 0,
      limit: 0,
      id: ""
    };
    expect(await controller.similar(dto, 0, 0)).toBe(songPagination);
  });

  it("slider should return a list of songs", async () => {
    expect(await controller.slider(0)).toBe(songPagination);
  });

  it("topDay should return a list of songs", async () => {
    const dto: SongTopDayReqDto = {
      from: 0,
      limit: 0
    };
    expect(await controller.topDay(dto, 0)).toBe(songPagination);
  });

  it("topWeek should return a list of songs", async () => {
    const dto: SongTopWeekReqDto = {
      from: 0,
      limit: 0
    };
    expect(await controller.topWeek(dto, 0)).toBe(songPagination);
  });

  it("unlike should return a songs", async () => {
    const dto: SongUnlikeReqDto = {
      id: ""
    };
    expect(await controller.unlike(dto, 0, 0)).toBe(song);
  });
});
