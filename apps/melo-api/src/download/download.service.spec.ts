import {
  DataArtistType,
  DataConfigElasticSearchReqDto,
  DataConfigImageReqDto,
  DataPaginationResDto,
  DownloadConfigReqDto,
  DownloadOrderByType,
  DownloadSongReqDto,
  DownloadSongResDto,
  SongResDto,
} from "@melo/common";
import { Test, TestingModule } from "@nestjs/testing";

import { DownloadService } from "./download.service";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { SongService } from "../song/song.service";
import { SongServiceInterface } from "../song/song.service.interface";

describe("DownloadService", () => {
  const config: DownloadConfigReqDto = {
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
  const downloadedAt = new Date();
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
    releaseDate: downloadedAt,
    title: "",
  };
  const songPagination: DataPaginationResDto<SongResDto> = {
    results: [song],
    total: 1,
  } as DataPaginationResDto<SongResDto>;
  const downloadSong: DownloadSongResDto = {
    downloadedAt,
    song,
  };
  // TODO: interface?
  const downloadElasticsearch = {
    body: {
      hits: {
        hits: [{ _source: { date: downloadedAt, song_id: 0, user_id: 0 } }],
      },
    },
  };
  const downloadSongPagination: DataPaginationResDto<DownloadSongResDto> = {
    results: [downloadSong],
    total: 1,
  } as DataPaginationResDto<DownloadSongResDto>;

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
  // TODO: interface ?
  const elasticsearchServiceMock = {
    search: (): any => Promise.resolve(downloadElasticsearch),
  };

  let service: DownloadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DownloadService,
        { provide: ElasticsearchService, useValue: elasticsearchServiceMock },
        { provide: SongService, useValue: songServiceMock },
      ],
    }).compile();
    service = module.get<DownloadService>(DownloadService);
  });

  it("downloadedSongs should return an array of songId and dates", async () => {
    const dto: DownloadSongReqDto = {
      config,
      dataConfigElasticSearch,
      dataConfigImage,
      filter: "",
      from: 0,
      orderBy: DownloadOrderByType.asc,
      size: 0,
      sub: 1,
    };
    expect(await service.downloadedSongs(dto)).toEqual(downloadSongPagination);
  });

  it("downloadedSongs should return an array of songId and dates 2", async () => {
    const dto: DownloadSongReqDto = {
      config,
      dataConfigElasticSearch,
      dataConfigImage,
      filter: undefined,
      from: 0,
      orderBy: DownloadOrderByType.asc,
      size: 0,
      sub: 1,
    };
    expect(await service.downloadedSongs(dto)).toEqual(downloadSongPagination);
  });
});
