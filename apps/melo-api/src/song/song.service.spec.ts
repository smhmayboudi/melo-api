import {
  AlbumResDto,
  ArtistResDto,
  ConstImageResDto,
  DataArtistType,
  DataConfigElasticsearchReqDto,
  DataConfigImageReqDto,
  RelationEdgeType,
  RelationEntityReqDto,
  RelationEntityType,
  RelationResDto,
  SongArtistSongsReqDto,
  SongArtistSongsTopReqDto,
  SongAudioResDto,
  SongConfigReqDto,
  SongGenreReqDto,
  SongGetReqDto,
  SongLanguageReqDto,
  SongLikeReqDto,
  SongLikedReqDto,
  SongMoodReqDto,
  SongNewPodcastReqDto,
  SongNewReqDto,
  SongOrderByType,
  SongPodcastReqDto,
  SongResDto,
  SongSendTelegramReqDto,
  SongSimilarReqDto,
  SongSliderReqDto,
  SongTopDayReqDto,
  SongTopWeekReqDto,
  SongUnlikeReqDto,
  UserResDto,
} from "@melo/common";
import { Observable, of } from "rxjs";

import { AppSongService } from "../app/app.song.service";
import { AppSongServiceInterface } from "../app/app.song.service.interface";
import { AxiosResponse } from "axios";
import { DataSongService } from "../data/data.song.service";
import { DataSongServiceInterface } from "../data/data.song.service.interface";
import { HttpService } from "@nestjs/common";
import { RelationService } from "../relation/relation.service";
import { RelationServiceInterface } from "../relation/relation.service.interface";
import { SongService } from "./song.service";
import { Test } from "@nestjs/testing";
import { UserService } from "../user/user.service";
import { UserServiceInterface } from "../user/user.service.interface";

describe("SongService", () => {
  const config: SongConfigReqDto = {
    maxSize: 0,
    sendUrl: "",
  };
  const dataConfigElasticsearch: DataConfigElasticsearchReqDto = {
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
    imageSignatureSize: 32,
    imageTypeSize: [
      {
        height: 1024,
        name: "cover",
        width: 1024,
      },
    ],
  };
  const releaseDate = new Date();
  const image: ConstImageResDto = {
    cover: {
      url:
        "Hc_ZS0sdjGuezepA_VM2iPDk4f2duSiHE42FzLqiIJM/rs:fill:1024:1024:1/dpr:1/L2Fzc2V0L3BvcC5qcGc",
    },
  };
  const artist: ArtistResDto = {
    followersCount: 0,
    fullName: "",
    id: 0,
    image,
    sumSongsDownloadsCount: 1,
    tags: [""],
    type: DataArtistType.prime,
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
  const user: UserResDto = {
    id: 0,
    telegram_id: 0,
  };
  const from: RelationEntityReqDto = {
    id: 0,
    type: RelationEntityType.user,
  };
  const to: RelationEntityReqDto = {
    id: 0,
    type: RelationEntityType.album,
  };
  const relation: RelationResDto = {
    from,
    to,
    type: RelationEdgeType.follows,
  };

  const appSongServiceMock: AppSongServiceInterface = {
    like: () => Promise.resolve(song),
    likes: () => Promise.resolve([song]),
    localize: () => Promise.resolve(song),
  };
  const dataSongServiceMock: DataSongServiceInterface = {
    albumSongs: () => Promise.resolve([song]),
    artistSongs: () => Promise.resolve([song]),
    artistSongsTop: () => Promise.resolve([song]),
    genre: () => Promise.resolve([song]),
    get: () => Promise.resolve(song),
    getByIds: () => Promise.resolve([song]),
    language: () => Promise.resolve([song]),
    mood: () => Promise.resolve([song]),
    newPodcast: () => Promise.resolve([song]),
    newSong: () => Promise.resolve([song]),
    podcast: () => Promise.resolve([song]),
    similar: () => Promise.resolve([song]),
    slider: () => Promise.resolve([song]),
    topDay: () => Promise.resolve([song]),
    topWeek: () => Promise.resolve([song]),
  };
  // TODO: interface ?
  const httpServiceMock = {
    post: (): Observable<AxiosResponse<number>> =>
      of({
        config: {},
        data: 0,
        headers: {},
        status: 200,
        statusText: "",
      }),
  };
  const relationServiceMock: RelationServiceInterface = {
    get: () => Promise.resolve([relation]),
    has: () => Promise.resolve(relation),
    multiHas: () => Promise.resolve([relation]),
    remove: () => Promise.resolve(relation),
    set: () => Promise.resolve(relation),
  };
  const userServiceMock: UserServiceInterface = {
    edit: () => Promise.resolve(user),
    find: () => Promise.resolve([user]),
    findOne: () => Promise.resolve(user),
    findOneByTelegramId: () => Promise.resolve(user),
    findOneByUsername: () => Promise.resolve(user),
    get: () => Promise.resolve(user),
    save: () => Promise.resolve(user),
  };

  let service: SongService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        SongService,
        { provide: AppSongService, useValue: appSongServiceMock },
        { provide: DataSongService, useValue: dataSongServiceMock },
        { provide: HttpService, useValue: httpServiceMock },
        { provide: RelationService, useValue: relationServiceMock },
        { provide: UserService, useValue: userServiceMock },
      ],
    }).compile();
    service = module.get<SongService>(SongService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("artistSongs should be equal to a list of songs", async () => {
    const dto: SongArtistSongsReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      from: 0,
      id: 0,
      size: 0,
    };
    expect(await service.artistSongs(dto)).toEqual([song]);
  });

  it("artistSongsTop should be equal to a list of songs", async () => {
    const dto: SongArtistSongsTopReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      from: 0,
      id: 0,
      size: 0,
    };
    expect(await service.artistSongsTop(dto)).toEqual([song]);
  });

  it("get should be equal to a songs", async () => {
    const dto: SongGetReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      id: 0,
    };
    expect(await service.get(dto)).toEqual(song);
  });

  it("genre should be equal to a list of songs", async () => {
    const dto: SongGenreReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      from: 0,
      genres: [""],
      orderBy: SongOrderByType.downloads,
      size: 0,
    };
    expect(await service.genre(dto)).toEqual([song]);
  });

  it("language should be equal to a list of songs", async () => {
    const dto: SongLanguageReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      from: 0,
      language: "",
      orderBy: SongOrderByType.downloads,
      size: 0,
    };
    expect(await service.language(dto)).toEqual([song]);
  });

  it("likes should be equal to a songs", async () => {
    const dto: SongLikeReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      id: 0,
      sub: 1,
    };
    expect(await service.like(dto)).toEqual({
      ...song,
      liked: true,
    });
  });

  it("liked should be equal to a list of songs", async () => {
    const dto: SongLikedReqDto = {
      config,
      dataConfigElasticsearch,
      dataConfigImage,
      from: 0,
      size: 0,
      sub: 1,
    };
    expect(await service.liked(dto)).toEqual([song]);
  });

  it("mood should be equal to a list of songs", async () => {
    const dto: SongMoodReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      from: 0,
      mood: "",
      size: 0,
    };
    expect(await service.mood(dto)).toEqual([song]);
  });

  it("new should be equal to a list of songs", async () => {
    const dto: SongNewReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      from: 0,
      size: 0,
    };
    expect(await service.newSong(dto)).toEqual([song]);
  });

  it("newPodcast should be equal to a list of songs", async () => {
    const dto: SongNewPodcastReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      from: 0,
      size: 0,
    };
    expect(await service.newPodcast(dto)).toEqual([song]);
  });

  it("podcast should be equal to a list of songs", async () => {
    const dto: SongPodcastReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      from: 0,
      genres: [""],
      orderBy: SongOrderByType.downloads,
      size: 0,
    };
    expect(await service.podcast(dto)).toEqual([song]);
  });

  it("sendTelegram should be undefined", async () => {
    const dto: SongSendTelegramReqDto = {
      config,
      id: 0,
      sub: 1,
    };
    expect(await service.sendTelegram(dto)).toBeUndefined();
  });

  it("similar should be equal to a list of songs", async () => {
    const dto: SongSimilarReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      from: 0,
      id: 0,
      size: 0,
    };
    expect(await service.similar(dto)).toEqual([song]);
  });

  it("slider should be equal to a list of songs", async () => {
    const dto: SongSliderReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
    };
    expect(await service.slider(dto)).toEqual([song]);
  });

  it("topDay should be equal to a list of songs", async () => {
    const dto: SongTopDayReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      from: 0,
      size: 0,
    };
    expect(await service.topDay(dto)).toEqual([song]);
  });

  it("topWeek should be equal to a list of songs", async () => {
    const dto: SongTopWeekReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      from: 0,
      size: 0,
    };
    expect(await service.topWeek(dto)).toEqual([song]);
  });

  it("unlike should be equal to a songs", async () => {
    const dto: SongUnlikeReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      id: 0,
      sub: 1,
    };
    expect(await service.unlike(dto)).toEqual({
      ...song,
      liked: false,
    });
  });

  it("liked should be equal to an empty list", async () => {
    const relationServiceMockGet: RelationServiceInterface = {
      ...relationServiceMock,
      get: () => Promise.resolve([]),
    };

    const module = await Test.createTestingModule({
      providers: [
        SongService,
        { provide: AppSongService, useValue: appSongServiceMock },
        { provide: DataSongService, useValue: dataSongServiceMock },
        { provide: HttpService, useValue: httpServiceMock },
        { provide: RelationService, useValue: relationServiceMockGet },
        { provide: UserService, useValue: userServiceMock },
      ],
    }).compile();
    service = module.get<SongService>(SongService);

    const dto: SongLikedReqDto = {
      config,
      dataConfigElasticsearch,
      dataConfigImage,
      from: 0,
      size: 0,
      sub: 1,
    };
    expect(await service.liked(dto)).toEqual([]);
  });

  it("sendTelegram should throw exception", async () => {
    const userServiceMockFindOne: UserServiceInterface = {
      ...userServiceMock,
      findOne: () => Promise.resolve(undefined),
    };

    const module = await Test.createTestingModule({
      providers: [
        SongService,
        { provide: AppSongService, useValue: appSongServiceMock },
        { provide: DataSongService, useValue: dataSongServiceMock },
        { provide: HttpService, useValue: httpServiceMock },
        { provide: RelationService, useValue: relationServiceMock },
        {
          provide: UserService,
          useValue: userServiceMockFindOne,
        },
      ],
    }).compile();
    service = module.get<SongService>(SongService);

    const dto: SongSendTelegramReqDto = {
      config,
      id: 0,
      sub: 1,
    };
    return expect(service.sendTelegram(dto)).rejects.toThrowError();
  });
});
