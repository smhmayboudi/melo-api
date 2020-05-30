import {
  DataArtistType,
  DataConfigElasticsearchReqDto,
  DataConfigImageReqDto,
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
} from "@melo/common";
import { Test, TestingModule } from "@nestjs/testing";

import { SongController } from "./song.controller";
import { SongService } from "./song.service";
import { SongServiceInterface } from "./song.service.interface";

describe("SongController", () => {
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

  const songServiceMock: SongServiceInterface = {
    artistSongs: (): Promise<SongResDto[]> => Promise.resolve([song]),
    artistSongsTop: (): Promise<SongResDto[]> => Promise.resolve([song]),
    genre: (): Promise<SongResDto[]> => Promise.resolve([song]),
    get: (): Promise<SongResDto> => Promise.resolve(song),
    language: (): Promise<SongResDto[]> => Promise.resolve([song]),
    like: (): Promise<SongResDto> => Promise.resolve(song),
    liked: (): Promise<SongResDto[]> => Promise.resolve([song]),
    mood: (): Promise<SongResDto[]> => Promise.resolve([song]),
    newPodcast: (): Promise<SongResDto[]> => Promise.resolve([song]),
    newSong: (): Promise<SongResDto[]> => Promise.resolve([song]),
    podcast: (): Promise<SongResDto[]> => Promise.resolve([song]),
    sendTelegram: (): Promise<void> => Promise.resolve(undefined),
    similar: (): Promise<SongResDto[]> => Promise.resolve([song]),
    slider: (): Promise<SongResDto[]> => Promise.resolve([song]),
    topDay: (): Promise<SongResDto[]> => Promise.resolve([song]),
    topWeek: (): Promise<SongResDto[]> => Promise.resolve([song]),
    unlike: (): Promise<SongResDto> => Promise.resolve(song),
  };

  let controller: SongController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SongController],
      providers: [{ provide: SongService, useValue: songServiceMock }],
    }).compile();
    controller = module.get<SongController>(SongController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("artistSongs should be equal to a list of songs", async () => {
    const dto: SongArtistSongsReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      from: 0,
      id: 0,
      size: 0,
    };
    expect(await controller.artistSongs(dto)).toEqual([song]);
  });

  it("artistSongsTop should be equal to a list of songs", async () => {
    const dto: SongArtistSongsReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      from: 0,
      id: 0,
      size: 0,
    };
    expect(await controller.artistSongsTop(dto)).toEqual([song]);
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
    expect(await controller.genre(dto)).toEqual([song]);
  });

  it("get should be equal to a song", async () => {
    const dto: SongGetReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      id: 0,
    };
    expect(await controller.get(dto)).toEqual(song);
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
    expect(await controller.language(dto)).toEqual([song]);
  });

  it("likes should be equal to a songs", async () => {
    const dto: SongLikeReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      id: 0,
      sub: 1,
    };
    expect(await controller.like(dto)).toEqual(song);
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
    expect(await controller.liked(dto)).toEqual([song]);
  });

  it("mood should be equal to a list of songs", async () => {
    const dto: SongMoodReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      from: 0,
      mood: "",
      size: 0,
    };
    expect(await controller.mood(dto)).toEqual([song]);
  });

  it("newPodcast should be equal to a list of songs", async () => {
    const dto: SongNewPodcastReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      from: 0,
      size: 0,
    };
    expect(await controller.newPodcast(dto)).toEqual([song]);
  });

  it("newSong should be equal to a list of songs", async () => {
    const dto: SongNewReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      from: 0,
      size: 0,
    };
    expect(await controller.newSong(dto)).toEqual([song]);
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
    expect(await controller.podcast(dto)).toEqual([song]);
  });

  it("sendTelegram should be undefined", async () => {
    const dto: SongSendTelegramReqDto = {
      config,
      id: 0,
      sub: 1,
    };
    expect(await controller.sendTelegram(dto)).toBeUndefined();
  });

  it("similar should be equal to a list of songs", async () => {
    const dto: SongSimilarReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      from: 0,
      id: 0,
      size: 0,
    };
    expect(await controller.similar(dto)).toEqual([song]);
  });

  it("slider should be equal to a list of songs", async () => {
    const dto: SongSliderReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
    };
    expect(await controller.slider(dto)).toEqual([song]);
  });

  it("topDay should be equal to a list of songs", async () => {
    const dto: SongTopDayReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      from: 0,
      size: 0,
    };
    expect(await controller.topDay(dto)).toEqual([song]);
  });

  it("topWeek should be equal to a list of songs", async () => {
    const dto: SongTopWeekReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      from: 0,
      size: 0,
    };
    expect(await controller.topWeek(dto)).toEqual([song]);
  });

  it("unlike should be equal to a songs", async () => {
    const dto: SongUnlikeReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      id: 0,
      sub: 1,
    };
    expect(await controller.unlike(dto)).toEqual(song);
  });
});
