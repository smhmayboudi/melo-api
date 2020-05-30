import {
  DataArtistType,
  DataConfigElasticsearchReqDto,
  DataConfigImageReqDto,
  SongAlbumReqDto,
  SongArtistSongsTopReqDto,
  SongArtistsReqDto,
  SongGenreReqDto,
  SongGetByIdsReqDto,
  SongGetReqDto,
  SongLanguageReqDto,
  SongMoodReqDto,
  SongNewPodcastReqDto,
  SongNewReqDto,
  SongOrderByType,
  SongPodcastReqDto,
  SongResDto,
  SongSimilarReqDto,
  SongSliderReqDto,
  SongTopDayReqDto,
  SongTopWeekReqDto,
} from "@melo/common";
import { Test, TestingModule } from "@nestjs/testing";

import { DataSongController } from "./data.song.controller";
import { DataSongService } from "./data.song.service";
import { DataSongServiceInterface } from "./data.song.service.interface.d";

describe("DataSongController", () => {
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
  const dataSongServiceMock: DataSongServiceInterface = {
    albumSongs: (): Promise<SongResDto[]> => Promise.resolve([song]),
    artistSongs: (): Promise<SongResDto[]> => Promise.resolve([song]),
    artistSongsTop: (): Promise<SongResDto[]> => Promise.resolve([song]),
    genre: (): Promise<SongResDto[]> => Promise.resolve([song]),
    get: (): Promise<SongResDto> => Promise.resolve(song),
    getByIds: (): Promise<SongResDto[]> => Promise.resolve([song]),
    language: (): Promise<SongResDto[]> => Promise.resolve([song]),
    mood: (): Promise<SongResDto[]> => Promise.resolve([song]),
    newPodcast: (): Promise<SongResDto[]> => Promise.resolve([song]),
    newSong: (): Promise<SongResDto[]> => Promise.resolve([song]),
    podcast: (): Promise<SongResDto[]> => Promise.resolve([song]),
    similar: (): Promise<SongResDto[]> => Promise.resolve([song]),
    slider: (): Promise<SongResDto[]> => Promise.resolve([song]),
    topDay: (): Promise<SongResDto[]> => Promise.resolve([song]),
    topWeek: (): Promise<SongResDto[]> => Promise.resolve([song]),
  };

  let controller: DataSongController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataSongController],
      providers: [{ provide: DataSongService, useValue: dataSongServiceMock }],
    }).compile();
    controller = module.get<DataSongController>(DataSongController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("albumSongs should be equal to a list of songs", async () => {
    const dto: SongAlbumReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      id: 0,
    };
    expect(await controller.albumSongs(dto)).toEqual([song]);
  });

  it("artistSongs should be equal to a list of songs", async () => {
    const dto: SongArtistsReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      from: 0,
      id: 0,
      size: 0,
    };
    expect(await controller.artistSongs(dto)).toEqual([song]);
  });

  it("artistSongsTop should be equal to a list of songs", async () => {
    const dto: SongArtistSongsTopReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      from: 0,
      id: 0,
      size: 0,
    };
    expect(await controller.artistSongsTop(dto)).toEqual([song]);
  });

  it("genre should be equal to a list of songs", async () => {
    const dto: SongGenreReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      from: 0,
      genres: [],
      orderBy: SongOrderByType.downloads,
      size: 0,
    };
    expect(await controller.genre(dto)).toEqual([song]);
  });

  it("get should be equal to a songs", async () => {
    const dto: SongGetReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      id: 0,
    };
    expect(await controller.get(dto)).toEqual(song);
  });

  it("getByIds should be equal to a list of songs", async () => {
    const dto: SongGetByIdsReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      ids: [],
    };
    expect(await controller.getByIds(dto)).toEqual([song]);
  });

  it("genre should be equal to a list of songs, genre all", async () => {
    const dto: SongGenreReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      from: 0,
      genres: ["all"],
      orderBy: SongOrderByType.downloads,
      size: 0,
    };
    expect(await controller.genre(dto)).toEqual([song]);
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
    const dto: SongPodcastReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      from: 0,
      genres: [],
      orderBy: SongOrderByType.downloads,
      size: 0,
    };
    expect(await controller.podcast(dto)).toEqual([song]);
  });

  it("podcast should be equal to a list of songs genres all", async () => {
    const dto: SongPodcastReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      from: 0,
      genres: ["all"],
      orderBy: SongOrderByType.downloads,
      size: 0,
    };
    expect(await controller.podcast(dto)).toEqual([song]);
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
});
