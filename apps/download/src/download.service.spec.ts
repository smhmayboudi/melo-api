import {
  DataArtistType,
  DataConfigElasticsearchReqDto,
  DataConfigImageReqDto,
  DownloadConfigReqDto,
  DownloadOrderByType,
  DownloadSongParamReqDto,
  DownloadSongQueryReqDto,
  DownloadSongResDto,
  SONG_SERVICE,
  SongResDto,
} from "@melo/common";
import { Test, TestingModule } from "@nestjs/testing";

import { DownloadService } from "./download.service";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { of } from "rxjs";

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
  // TODO: interface ?
  const songClientProxyMock = {
    send: () => of(song),
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
        { provide: SONG_SERVICE, useValue: songClientProxyMock },
      ],
    }).compile();
    service = module.get<DownloadService>(DownloadService);
  });

  it("downloadedSongs should return an array of songId and dates", async () => {
    const paramDto: DownloadSongParamReqDto = {
      from: 0,
      orderBy: DownloadOrderByType.asc,
      size: 0,
    };
    const queryDto: DownloadSongQueryReqDto = {
      filter: "",
    };
    expect(
      await service.downloadedSongs({
        ...paramDto,
        ...queryDto,
        config,
        dataConfigElasticsearch,
        dataConfigImage,
        orderBy: DownloadOrderByType.asc,
        sub: 1,
      })
    ).toEqual([downloadSong]);
  });

  it("downloadedSongs should return an array of songId and dates 2", async () => {
    const paramDto: DownloadSongParamReqDto = {
      from: 0,
      orderBy: DownloadOrderByType.asc,
      size: 0,
    };
    const queryDto: DownloadSongQueryReqDto = {
      filter: undefined,
    };
    expect(
      await service.downloadedSongs({
        ...paramDto,
        ...queryDto,
        config,
        dataConfigElasticsearch,
        dataConfigImage,
        orderBy: DownloadOrderByType.asc,
        sub: 1,
      })
    ).toEqual([downloadSong]);
  });
});
