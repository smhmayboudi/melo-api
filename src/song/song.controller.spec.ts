import { Test, TestingModule } from "@nestjs/testing";

import { AppEncodingService } from "../app/app.encoding.service";
import { AppEncodingServiceInterface } from "../app/app.encoding.service.interface";
import { AppHashIdService } from "../app/app.hash-id.service";
import { AppHashIdServiceInterface } from "../app/app.hash-id.service.interface";
import { AppSong } from "../app/app.song";
import { AppSongInterface } from "../app/app.song.interface";
import { DataAlbumResDto } from "../data/dto/res/data.album.res.dto";
import { DataArtistResDto } from "../data/dto/res/data.artist.res.dto";
import { DataArtistType } from "../data/data.artist.type";
import { DataOrderByType } from "../data/data.order-by.type";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataPlaylistResDto } from "../data/dto/res/data.playlist.res.dto";
import { DataSearchResDto } from "../data/dto/res/data.search.res.dto";
import { DataSearchType } from "../data/data.search.type";
import { DataSongNewPodcastReqDto } from "../data/dto/req/data.song.new-podcast.req.dto";
import { DataSongResDto } from "../data/dto/res/data.song.res.dto";
import { SongArtistSongsReqDto } from "./dto/req/song.artist-songs.req.dto";
import { SongByIdReqDto } from "./dto/req/song.by-id.req.dto";
import { SongController } from "./song.controller";
import { SongLanguageReqDto } from "./dto/req/song.language.req.dto";
import { SongLikeReqDto } from "./dto/req/song.like.req.dto";
import { SongLikedReqDto } from "./dto/req/song.liked.req.dto";
import { SongMoodReqDto } from "./dto/req/song.mood.req.dto";
import { SongNewReqDto } from "./dto/req/song.new.req.dto";
import { SongPodcastGenresParamReqDto } from "./dto/req/song.podcast.genres.param.req.dto";
import { SongPodcastGenresQueryReqDto } from "./dto/req/song.podcast.genres.query.req.dto";
import { SongSendTelegramReqDto } from "./dto/req/song.send-telegram.req.dto";
import { SongService } from "./song.service";
import { SongServiceInterface } from "./song.service.interface";
import { SongSimilarReqDto } from "./dto/req/song.similar.req.dto";
import { SongSongGenresParamReqDto } from "./dto/req/song.song.genres.param.req.dto";
import { SongSongGenresQueryReqDto } from "./dto/req/song.song.genres.query.req.dto";
import { SongTopDayReqDto } from "./dto/req/song.top-day.req.dto";
import { SongTopWeekReqDto } from "./dto/req/song.top-week.req.dto";
import { SongUnlikeReqDto } from "./dto/req/song.unlike.req.dto";

describe("SongController", () => {
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
  const search: DataSearchResDto = {
    type: DataSearchType.album,
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
  const appSongMock: AppSongInterface = {
    like: (): Promise<DataSongResDto[]> => Promise.resolve([song]),
    localize: (): DataSongResDto[] => [song],
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
    sendTelegram: (): Promise<void> => Promise.resolve(undefined),
    similar: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    slider: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    topDay: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    topWeek: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    unlike: (): Promise<DataSongResDto> => Promise.resolve(song),
  };

  let controller: SongController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SongController],
      providers: [
        { provide: AppEncodingService, useValue: appEncodingServiceMock },
        { provide: AppHashIdService, useValue: appHashIdServiceMock },
        { provide: SongService, useValue: songServiceMock },
        {
          provide: AppSong,
          useValue: appSongMock,
        },
      ],
    }).compile();
    controller = module.get<SongController>(SongController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("artistSongs should be equal to a list of songs", async () => {
    const dto: SongArtistSongsReqDto = {
      artistId: 0,
      from: 0,
      limit: 0,
    };
    expect(await controller.artistSongs(dto)).toEqual(songPagination);
  });

  it("artistSongsTop should be equal to a list of songs", async () => {
    const dto: SongArtistSongsReqDto = {
      artistId: 0,
      from: 0,
      limit: 0,
    };
    expect(await controller.artistSongsTop(dto)).toEqual(songPagination);
  });

  it("byId should be equal to a song", async () => {
    const dto: SongByIdReqDto = {
      id: 0,
    };
    expect(await controller.byId(dto)).toEqual(song);
  });

  it("genre should be equal to a list of songs", async () => {
    const paramDto: SongSongGenresParamReqDto = {
      from: 0,
      limit: 0,
      orderBy: DataOrderByType.downloads,
    };
    const queryDto: SongSongGenresQueryReqDto = {
      genres: [""],
    };
    expect(
      await controller.genre(DataOrderByType.downloads, paramDto, queryDto)
    ).toEqual(songPagination);
  });

  it("language should be equal to a list of songs", async () => {
    const dto: SongLanguageReqDto = {
      from: 0,
      language: "",
      limit: 0,
      orderBy: DataOrderByType.downloads,
    };
    expect(await controller.language(DataOrderByType.downloads, dto)).toEqual(
      songPagination
    );
  });

  it("like should be equal to a songs", async () => {
    const dto: SongLikeReqDto = {
      id: 0,
      sub: 0,
    };
    expect(await controller.like(dto, 0)).toEqual(song);
  });

  it("liked should be equal to a list of songs", async () => {
    const dto: SongLikedReqDto = {
      from: 0,
      limit: 0,
      sub: 0,
    };
    expect(await controller.liked(dto, 0)).toEqual(songPagination);
  });

  it("mood should be equal to a list of songs", async () => {
    const dto: SongMoodReqDto = {
      from: 0,
      limit: 0,
      mood: "",
    };
    expect(await controller.mood(dto)).toEqual(songPagination);
  });

  it("newPodcast should be equal to a list of songs", async () => {
    const dto: DataSongNewPodcastReqDto = {
      from: 0,
      limit: 0,
    };
    expect(await controller.newPodcast(dto)).toEqual(songPagination);
  });

  it("newSong should be equal to a list of songs", async () => {
    const dto: SongNewReqDto = {
      from: 0,
      limit: 0,
    };
    expect(await controller.newSong(dto)).toEqual(songPagination);
  });

  it("podcastGenre should be equal to a list of songs", async () => {
    const paramDto: SongPodcastGenresParamReqDto = {
      from: 0,
      limit: 0,
      orderBy: DataOrderByType.downloads,
    };
    const queryDto: SongPodcastGenresQueryReqDto = {
      genres: [""],
    };
    expect(
      await controller.podcast(DataOrderByType.downloads, paramDto, queryDto)
    ).toEqual(songPagination);
  });

  it("sendTelegram should be undefined", async () => {
    const dto: SongSendTelegramReqDto = {
      id: 0,
      sub: 0,
    };
    expect(await controller.sendTelegram(dto, 0)).toBeUndefined();
  });

  it("similar should be equal to a list of songs", async () => {
    const dto: SongSimilarReqDto = {
      from: 0,
      id: 0,
      limit: 0,
    };
    expect(await controller.similar(dto)).toEqual(songPagination);
  });

  it("slider should be equal to a list of songs", async () => {
    expect(await controller.slider()).toEqual(songPagination);
  });

  it("topDay should be equal to a list of songs", async () => {
    const dto: SongTopDayReqDto = {
      from: 0,
      limit: 0,
    };
    expect(await controller.topDay(dto)).toEqual(songPagination);
  });

  it("topWeek should be equal to a list of songs", async () => {
    const dto: SongTopWeekReqDto = {
      from: 0,
      limit: 0,
    };
    expect(await controller.topWeek(dto)).toEqual(songPagination);
  });

  it("unlike should be equal to a songs", async () => {
    const dto: SongUnlikeReqDto = {
      id: 0,
      sub: 0,
    };
    expect(await controller.unlike(dto, 0)).toEqual(song);
  });
});
