import {
  DataArtistType,
  DataConfigElasticsearchReqDto,
  DataConfigImageReqDto,
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
  const downloadSong: DownloadSongResDto = {
    downloadedAt,
    song,
  };
  // TODO: interface?
  const downloadElasticsearch = {
    body: {
      hits: {
        hits: [
          {
            _source: {
              date: downloadedAt,
              song_id: 0,
              user_id: 0,
            },
          },
        ],
      },
    },
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
      dataConfigElasticsearch,
      dataConfigImage,
      filter: "",
      from: 0,
      orderBy: DownloadOrderByType.asc,
      size: 0,
      sub: 1,
    };
    expect(await service.downloadedSongs(dto)).toEqual([downloadSong]);
  });

  it("downloadedSongs should return an array of songId and dates 2", async () => {
    const dto: DownloadSongReqDto = {
      config,
      dataConfigElasticsearch,
      dataConfigImage,
      filter: undefined,
      from: 0,
      orderBy: DownloadOrderByType.asc,
      size: 0,
      sub: 1,
    };
    expect(await service.downloadedSongs(dto)).toEqual([downloadSong]);
  });
});
