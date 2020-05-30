import {
  AlbumArtistsReqDto,
  AlbumGetReqDto,
  AlbumLatestReqDto,
  AlbumResDto,
  ArtistResDto,
  DataArtistType,
  DataConfigElasticsearchReqDto,
  DataConfigImageReqDto,
  SongResDto,
} from "@melo/common";
import { Test, TestingModule } from "@nestjs/testing";

import { DataAlbumService } from "./data.album.service";
import { DataConfigService } from "./data.config.service";
import { DataConfigServiceInterface } from "./data.config.service.interface";
import { DataSongService } from "./data.song.service";
import { DataSongServiceInterface } from "./data.song.service.interface";
import { DataTransformService } from "./data.transform.service";
import { DataTransformServiceInterface } from "./data.transform.interface";
import { ElasticsearchService } from "@nestjs/elasticsearch";

describe("DataAlbumService", () => {
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
  const album: AlbumResDto = {
    name: "",
    releaseDate,
    songs: [song],
  };
  const dataConfigServiceMock: DataConfigServiceInterface = {
    elasticsearchNode: "",
    imageBaseUrl: "",
    imageEncode: true,
    imageKey: "",
    imagePath: "",
    imagePathDefaultAlbum: "",
    imagePathDefaultArtist: "",
    imagePathDefaultSong: "",
    imageSalt: "",
    imageSignatureSize: 32,
    imageTypeSize: [
      {
        height: 1024,
        name: "cover",
        width: 1024,
      },
    ],
    indexName: "",
    maxSize: 0,
    mp3Endpoint: "",
    typeormDatabase: "",
    typeormHost: "",
    typeormLogging: true,
    typeormPassword: "",
    typeormPort: 0,
    typeormSynchronize: true,
    typeormUsername: "",
  };
  // TODO: interface ?
  const elasticSearchRes = {
    body: {
      hits: {
        hits: [
          {
            _source: {
              album: "",
              artist_followers_count: 0,
              artist_full_name: "",
              artist_id: 0,
              artists: [
                {
                  available: false,
                  followers_count: 0,
                  full_name: "",
                  has_cover: false,
                  id: 0,
                  popular: false,
                  sum_downloads_count: 0,
                  type: DataArtistType,
                },
              ],
              duration: 0,
              max_audio_rate: 0,
              release_date: releaseDate,
            },
          },
        ],
      },
    },
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
  const dataTransformServiceMock: DataTransformServiceInterface = {
    album: (): Promise<AlbumResDto> => Promise.resolve(album),
    artist: (): Promise<ArtistResDto> => Promise.resolve(artist),
    song: (): Promise<SongResDto> => Promise.resolve(song),
  };
  // TODO: interface ?
  const elasticsearchServiceMock = {
    get: (): Promise<any> => Promise.resolve(elasticSearchRes),
    search: (): Promise<any> => Promise.resolve(elasticSearchRes),
  };

  let service: DataAlbumService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DataAlbumService,
        { provide: DataConfigService, useValue: dataConfigServiceMock },
        { provide: DataSongService, useValue: dataSongServiceMock },
        { provide: DataTransformService, useValue: dataTransformServiceMock },
        { provide: ElasticsearchService, useValue: elasticsearchServiceMock },
      ],
    }).compile();
    service = module.get<DataAlbumService>(DataAlbumService);
  });

  it("get should be equal to an album", async () => {
    const dto: AlbumGetReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      id: 0,
    };
    expect(await service.get(dto)).toEqual(album);
  });

  it("albums should equal list of albums", async () => {
    const dto: AlbumArtistsReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      from: 0,
      id: 0,
      size: 0,
    };
    expect(await service.albums(dto)).toEqual([album]);
  });

  it("latest should equal list of albums", async () => {
    const dto: AlbumLatestReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      from: 0,
      language: "",
      size: 0,
    };
    expect(await service.latest(dto)).toEqual([album]);
  });
  it("latest should equal list of albums, language all", async () => {
    const dto: AlbumLatestReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      from: 0,
      language: "all",
      size: 0,
    };
    expect(await service.latest(dto)).toEqual([album]);
  });
});
