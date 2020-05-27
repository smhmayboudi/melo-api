import {
  AlbumResDto,
  ArtistResDto,
  DataArtistType,
  DataConfigElasticSearchReqDto,
  DataConfigImageReqDto,
  DataPaginationResDto,
  DataSearchType,
  PlaylistResDto,
  SearchResDto,
  SongArtistSongsReqDto,
  SongConfigReqDto,
  SongGetReqDto,
  SongLanguageReqDto,
  SongLikeReqDto,
  SongLikedReqDto,
  SongMoodReqDto,
  SongNewPodcastReqDto,
  SongNewReqDto,
  SongOrderByType,
  SongPodcastGenresParamReqDto,
  SongPodcastGenresQueryReqDto,
  SongResDto,
  SongSendTelegramReqDto,
  SongSimilarReqDto,
  SongSliderReqDto,
  SongSongGenresParamReqDto,
  SongSongGenresQueryReqDto,
  SongTopDayReqDto,
  SongTopWeekReqDto,
  SongUnlikeReqDto,
} from "@melo/common";
import { Test, TestingModule } from "@nestjs/testing";

import { AppHashIdService } from "../app/app.hash-id.service";
import { AppHashIdServiceInterface } from "../app/app.hash-id.service.interface";
import { AppSongService } from "../app/app.song.service";
import { AppSongServiceInterface } from "../app/app.song.service.interface";
import { DataConfigService } from "../data/data.config.service";
import { DataConfigServiceInterface } from "../data/data.config.service.interface";
import { SongConfigService } from "./song.config.service";
import { SongConfigServiceInterface } from "./song.config.service.interface";
import { SongController } from "./song.controller";
import { SongService } from "./song.service";
import { SongServiceInterface } from "./song.service.interface";

describe("SongController", () => {
  const config: SongConfigReqDto = {
    maxSize: 0,
    url: "",
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
  const album: AlbumResDto = {
    name: "",
    releaseDate,
  };
  const artist: ArtistResDto = {
    followersCount: 0,
    id: 0,
    type: DataArtistType.prime,
  };
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
  const playlist: PlaylistResDto = {
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
  const search: SearchResDto = {
    type: DataSearchType.album,
  };

  const appHashIdServiceMock: AppHashIdServiceInterface = {
    decode: (): number => 0,
    encode: (): string => "",
    encodeAlbum: (): unknown => album,
    encodeArtist: (): unknown => artist,
    encodePlaylist: (): unknown => playlist,
    encodeSearch: (): unknown => search,
    encodeSong: (): unknown => song,
  };
  const appSongMock: AppSongServiceInterface = {
    like: (): Promise<SongResDto> => Promise.resolve(song),
    likes: (): Promise<SongResDto[]> => Promise.resolve([song]),
    localize: (): Promise<SongResDto> => Promise.resolve(song),
  };
  const dataConfigServiceMock: DataConfigServiceInterface = {
    elasticNode: "",
    imageBaseUrl: "",
    imageEncode: true,
    imageKey: "",
    imagePath: "",
    imagePathDefaultAlbum: "",
    imagePathDefaultArtist: "",
    imagePathDefaultSong: "",
    imageSalt: "",
    imageSignatureSize: 32,
    imageTypeSize: [{ height: 1024, name: "cover", width: 1024 }],
    indexName: "",
    maxSize: 0,
    mp3Endpoint: "",
    typeOrmDatabase: "",
    typeOrmHost: "",
    typeOrmLogging: true,
    typeOrmPassword: "",
    typeOrmPort: 0,
    typeOrmSynchronize: true,
    typeOrmUsername: "",
  };
  const songConfigServiceMock: SongConfigServiceInterface = {
    cacheHost: "",
    cacheMax: 0,
    cachePort: 0,
    cacheStore: "",
    cacheTTL: 0,
    maxSize: 0,
    timeout: 0,
    url: "",
  };
  const songServiceMock: SongServiceInterface = {
    artistSongs: (): Promise<DataPaginationResDto<SongResDto>> =>
      Promise.resolve(songPagination),
    artistSongsTop: (): Promise<DataPaginationResDto<SongResDto>> =>
      Promise.resolve(songPagination),
    genre: (): Promise<DataPaginationResDto<SongResDto>> =>
      Promise.resolve(songPagination),
    get: (): Promise<SongResDto> => Promise.resolve(song),
    language: (): Promise<DataPaginationResDto<SongResDto>> =>
      Promise.resolve(songPagination),
    like: (): Promise<SongResDto> => Promise.resolve(song),
    liked: (): Promise<DataPaginationResDto<SongResDto>> =>
      Promise.resolve(songPagination),
    mood: (): Promise<DataPaginationResDto<SongResDto>> =>
      Promise.resolve(songPagination),
    newPodcast: (): Promise<DataPaginationResDto<SongResDto>> =>
      Promise.resolve(songPagination),
    newSong: (): Promise<DataPaginationResDto<SongResDto>> =>
      Promise.resolve(songPagination),
    podcast: (): Promise<DataPaginationResDto<SongResDto>> =>
      Promise.resolve(songPagination),
    sendTelegram: (): Promise<void> => Promise.resolve(undefined),
    similar: (): Promise<DataPaginationResDto<SongResDto>> =>
      Promise.resolve(songPagination),
    slider: (): Promise<DataPaginationResDto<SongResDto>> =>
      Promise.resolve(songPagination),
    topDay: (): Promise<DataPaginationResDto<SongResDto>> =>
      Promise.resolve(songPagination),
    topWeek: (): Promise<DataPaginationResDto<SongResDto>> =>
      Promise.resolve(songPagination),
    unlike: (): Promise<SongResDto> => Promise.resolve(song),
  };

  let controller: SongController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SongController],
      providers: [
        { provide: AppHashIdService, useValue: appHashIdServiceMock },
        { provide: DataConfigService, useValue: dataConfigServiceMock },
        { provide: SongService, useValue: songServiceMock },
        {
          provide: AppSongService,
          useValue: appSongMock,
        },
        {
          provide: SongConfigService,
          useValue: songConfigServiceMock,
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
      dataConfigElasticSearch,
      dataConfigImage,
      from: 0,
      id: 0,
      size: 0,
    };
    expect(await controller.artistSongs(dto)).toEqual(songPagination);
  });

  it("artistSongsTop should be equal to a list of songs", async () => {
    const dto: SongArtistSongsReqDto = {
      dataConfigElasticSearch,
      dataConfigImage,
      from: 0,
      id: 0,
      size: 0,
    };
    expect(await controller.artistSongsTop(dto)).toEqual(songPagination);
  });

  it("get should be equal to a song", async () => {
    const dto: SongGetReqDto = {
      dataConfigElasticSearch,
      dataConfigImage,
      id: 0,
    };
    expect(await controller.get(dto)).toEqual(song);
  });

  it("genre should be equal to a list of songs", async () => {
    const paramDto: SongSongGenresParamReqDto = {
      from: 0,
      orderBy: SongOrderByType.downloads,
      size: 0,
    };
    const queryDto: SongSongGenresQueryReqDto = {
      genres: [""],
    };
    expect(
      await controller.genre(SongOrderByType.downloads, paramDto, queryDto)
    ).toEqual(songPagination);
  });

  it("language should be equal to a list of songs", async () => {
    const dto: SongLanguageReqDto = {
      dataConfigElasticSearch,
      dataConfigImage,
      from: 0,
      language: "",
      orderBy: SongOrderByType.downloads,
      size: 0,
    };
    expect(await controller.language(SongOrderByType.downloads, dto)).toEqual(
      songPagination
    );
  });

  it("likes should be equal to a songs", async () => {
    const dto: SongLikeReqDto = {
      dataConfigElasticSearch,
      dataConfigImage,
      id: 0,
      sub: 1,
    };
    expect(await controller.like(dto, 0)).toEqual(song);
  });

  it("liked should be equal to a list of songs", async () => {
    const dto: SongLikedReqDto = {
      config,
      dataConfigElasticSearch,
      dataConfigImage,
      from: 0,
      size: 0,
      sub: 1,
    };
    expect(await controller.liked(dto, 0)).toEqual(songPagination);
  });

  it("mood should be equal to a list of songs", async () => {
    const dto: SongMoodReqDto = {
      dataConfigElasticSearch,
      dataConfigImage,
      from: 0,
      mood: "",
      size: 0,
    };
    expect(await controller.mood(dto)).toEqual(songPagination);
  });

  it("newPodcast should be equal to a list of songs", async () => {
    const dto: SongNewPodcastReqDto = {
      dataConfigElasticSearch,
      dataConfigImage,
      from: 0,
      size: 0,
    };
    expect(await controller.newPodcast(dto)).toEqual(songPagination);
  });

  it("newSong should be equal to a list of songs", async () => {
    const dto: SongNewReqDto = {
      dataConfigElasticSearch,
      dataConfigImage,
      from: 0,
      size: 0,
    };
    expect(await controller.newSong(dto)).toEqual(songPagination);
  });

  it("podcastGenre should be equal to a list of songs", async () => {
    const paramDto: SongPodcastGenresParamReqDto = {
      from: 0,
      orderBy: SongOrderByType.downloads,
      size: 0,
    };
    const queryDto: SongPodcastGenresQueryReqDto = {
      genres: [""],
    };
    expect(
      await controller.podcast(SongOrderByType.downloads, paramDto, queryDto)
    ).toEqual(songPagination);
  });

  it("sendTelegram should be undefined", async () => {
    const dto: SongSendTelegramReqDto = {
      config,
      id: 0,
      sub: 1,
    };
    expect(await controller.sendTelegram(dto, 0)).toBeUndefined();
  });

  it("similar should be equal to a list of songs", async () => {
    const dto: SongSimilarReqDto = {
      dataConfigElasticSearch,
      dataConfigImage,
      from: 0,
      id: 0,
      size: 0,
    };
    expect(await controller.similar(dto)).toEqual(songPagination);
  });

  it("slider should be equal to a list of songs", async () => {
    const dto: SongSliderReqDto = {
      dataConfigElasticSearch,
      dataConfigImage,
    };
    expect(await controller.slider(dto)).toEqual(songPagination);
  });

  it("topDay should be equal to a list of songs", async () => {
    const dto: SongTopDayReqDto = {
      dataConfigElasticSearch,
      dataConfigImage,
      from: 0,
      size: 0,
    };
    expect(await controller.topDay(dto)).toEqual(songPagination);
  });

  it("topWeek should be equal to a list of songs", async () => {
    const dto: SongTopWeekReqDto = {
      dataConfigElasticSearch,
      dataConfigImage,
      from: 0,
      size: 0,
    };
    expect(await controller.topWeek(dto)).toEqual(songPagination);
  });

  it("unlike should be equal to a songs", async () => {
    const dto: SongUnlikeReqDto = {
      dataConfigElasticSearch,
      dataConfigImage,
      id: 0,
      sub: 1,
    };
    expect(await controller.unlike(dto, 0)).toEqual(song);
  });
});
