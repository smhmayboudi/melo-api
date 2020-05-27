import {
  DataArtistType,
  DataConfigElasticSearchReqDto,
  DataConfigImageReqDto,
  DataPaginationResDto,
  EmotionConfigReqDto,
  EmotionEmotionsReqDto,
  EmotionEmotionsResDto,
  SongResDto,
} from "@melo/common";
import { Test, TestingModule } from "@nestjs/testing";

import { ElasticsearchService } from "@nestjs/elasticsearch";
import { EmotionService } from "./emotion.service";
import { SongService } from "../song/song.service";
import { SongServiceInterface } from "../song/song.service.interface";

describe("EmotionService", () => {
  const config: EmotionConfigReqDto = {
    indexName: "",
    maxSize: 0,
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
  const emotion: EmotionEmotionsResDto = {
    emotions: [""],
    song,
  };
  const emotionPagination: DataPaginationResDto<EmotionEmotionsResDto> = {
    results: [emotion],
    total: 1,
  } as DataPaginationResDto<EmotionEmotionsResDto>;
  // TODO: interface?
  const emotionElasticsearch = {
    body: {
      hits: {
        hits: [{ _source: { emotions: [""], song_id: 0, user_id: 0 } }],
      },
    },
  };

  // TODO: interface ?
  const elasticsearchServiceMock = {
    search: (): any => Promise.resolve(emotionElasticsearch),
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

  let service: EmotionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmotionService,
        { provide: ElasticsearchService, useValue: elasticsearchServiceMock },
        { provide: SongService, useValue: songServiceMock },
      ],
    }).compile();
    service = module.get<EmotionService>(EmotionService);
  });

  it("emotions should return a list of emotions", async () => {
    const dto: EmotionEmotionsReqDto = {
      config,
      dataConfigElasticSearch,
      dataConfigImage,
      emotions: [""],
      from: 0,
      size: 0,
      sub: 1,
    };
    expect(await service.emotions(dto)).toEqual(emotionPagination);
  });
});
