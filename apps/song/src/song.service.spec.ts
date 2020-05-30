import {
  DATA_SERVICE,
  DATA_SONG_SERVICE_GET,
  DataArtistType,
  DataConfigElasticsearchReqDto,
  DataConfigImageReqDto,
  RELATION_SERVICE,
  RELATION_SERVICE_GET,
  RelationEdgeType,
  RelationEntityReqDto,
  RelationEntityType,
  RelationResDto,
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
  SongPodcastGenresReqDto,
  SongResDto,
  SongSendTelegramReqDto,
  SongSimilarReqDto,
  SongSliderReqDto,
  SongSongGenresReqDto,
  SongTopDayReqDto,
  SongTopWeekReqDto,
  SongUnlikeReqDto,
  USER_SERVICE,
  UserResDto,
} from "@melo/common";
import { Observable, of } from "rxjs";
import { Test, TestingModule } from "@nestjs/testing";

import { AxiosResponse } from "axios";
import { HttpService } from "@nestjs/common";
import { SongService } from "./song.service";

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
    imageSignatureSize: 1,
    imageTypeSize: [
      {
        height: 0,
        name: "",
        width: 0,
      },
    ],
  };
  const from: RelationEntityReqDto = {
    id: 0,
    type: RelationEntityType.user,
  };
  const relationMultiHas: RelationResDto = {
    from,
    to: {
      id: 0,
      type: RelationEntityType.user,
    },
    type: RelationEdgeType.follows,
  };
  const releaseDate = new Date();
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
  const user: UserResDto = {
    id: 0,
    telegram_id: 0,
  };

  // TODO: interface ?
  const dataClientProxyMock = {
    send: (token: string) =>
      token === DATA_SONG_SERVICE_GET ? of(song) : of([song]),
  };
  // TODO: interface ?
  const relationClientProxyMock = {
    send: (token: string) =>
      token === RELATION_SERVICE_GET ? of([relationMultiHas]) : of(true),
  };
  // TODO: interface ?
  const userClientProxyMock = {
    send: () => of(user),
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

  let service: SongService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SongService,
        { provide: DATA_SERVICE, useValue: dataClientProxyMock },
        { provide: HttpService, useValue: httpServiceMock },
        { provide: RELATION_SERVICE, useValue: relationClientProxyMock },
        { provide: USER_SERVICE, useValue: userClientProxyMock },
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
    const dto: SongArtistSongsReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      from: 0,
      id: 0,
      size: 0,
    };
    expect(await service.artistSongsTop(dto)).toEqual([song]);
  });

  it("genre should be equal to a list of songs", async () => {
    const dto: SongSongGenresReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      from: 0,
      genres: [""],
      orderBy: SongOrderByType.downloads,
      size: 0,
    };
    expect(await service.genre(dto)).toEqual([song]);
  });

  it("get should be equal to a song", async () => {
    const dto: SongGetReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      id: 0,
    };
    expect(await service.get(dto)).toEqual(song);
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

  it("like should be equal to a songs", async () => {
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

  it("liked should be equal to a list of songs 2", async () => {
    // TODO: interface ?
    const relationClientProxyMock = {
      send: (): Observable<RelationResDto[]> => of([]),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SongService,
        { provide: DATA_SERVICE, useValue: dataClientProxyMock },
        { provide: HttpService, useValue: httpServiceMock },
        { provide: RELATION_SERVICE, useValue: relationClientProxyMock },
        { provide: USER_SERVICE, useValue: userClientProxyMock },
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

  it("newPodcast should be equal to a list of songs", async () => {
    const dto: SongNewPodcastReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      from: 0,
      size: 0,
    };
    expect(await service.newPodcast(dto)).toEqual([song]);
  });

  it("newSong should be equal to a list of songs", async () => {
    const dto: SongNewReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      from: 0,
      size: 0,
    };
    expect(await service.newSong(dto)).toEqual([song]);
  });

  it("podcast should be equal to a list of songs", async () => {
    const dto: SongPodcastGenresReqDto = {
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

  it("sendTelegram should be undefined 2", async () => {
    // TODO: interface ?
    const userClientProxyMock = {
      send: () =>
        of({
          ...user,
          telegram_id: undefined,
        }),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SongService,
        { provide: DATA_SERVICE, useValue: dataClientProxyMock },
        { provide: HttpService, useValue: httpServiceMock },
        { provide: RELATION_SERVICE, useValue: relationClientProxyMock },
        { provide: USER_SERVICE, useValue: userClientProxyMock },
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

  it("sendTelegram should be undefined 3", async () => {
    // TODO: interface ?
    const userClientProxyMock = {
      send: () => of(undefined),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SongService,
        { provide: DATA_SERVICE, useValue: dataClientProxyMock },
        { provide: HttpService, useValue: httpServiceMock },
        { provide: RELATION_SERVICE, useValue: relationClientProxyMock },
        { provide: USER_SERVICE, useValue: userClientProxyMock },
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
});
