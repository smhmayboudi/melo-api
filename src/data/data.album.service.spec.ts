import { Test, TestingModule } from "@nestjs/testing";

import { DataAlbumArtistsReqDto } from "./dto/req/data.album.artists.req.dto";
import { DataAlbumByIdReqDto } from "./dto/req/data.album.by-id.req.dto";
import { DataAlbumLatestReqDto } from "./dto/req/data.album.latest.req.dto";
import { DataAlbumResDto } from "./dto/res/data.album.res.dto";
import { DataAlbumService } from "./data.album.service";
import { DataArtistResDto } from "./dto/res/data.artist.res.dto";
import { DataArtistType } from "./data.artist.type";
import { DataConfigService } from "./data.config.service";
import { DataConfigServiceInterface } from "./data.config.service.interface";
import { DataPaginationResDto } from "./dto/res/data.pagination.res.dto";
import { DataSongResDto } from "./dto/res/data.song.res.dto";
import { DataSongService } from "./data.song.service";
import { DataSongServiceInterface } from "./data.song.service.interface";
import { DataTransformService } from "./data.transform.service";
import { DataTransformServiceInterface } from "./data.transform.interface";
import { ElasticsearchService } from "@nestjs/elasticsearch";

describe("DataAlbumService", () => {
  const releaseDate = new Date();
  const artist: DataArtistResDto = {
    followersCount: 0,
    id: 0,
    type: DataArtistType.prime,
  };
  const song: DataSongResDto = {
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
  const songPagination: DataPaginationResDto<DataSongResDto> = {
    results: [song],
    total: 1,
  } as DataPaginationResDto<DataSongResDto>;
  const album: DataAlbumResDto = {
    downloadCount: 0,
    name: "",
    releaseDate,
    songs: songPagination,
  };
  const albumPagination: DataPaginationResDto<DataAlbumResDto> = {
    results: [album],
    total: 1,
  } as DataPaginationResDto<DataAlbumResDto>;

  const dataConfigServiceMock: DataConfigServiceInterface = {
    defaultAlbumImagePath: "",
    defaultArtistImagePath: "",
    defaultSongImagePath: "",
    elasticNode: "",
    imagePath: () => "",
    index: "",
    mp3Endpoint: "",
    requestLimit: 0,
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
    albumSongs: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    artistSongs: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    artistSongsTop: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    byId: (): Promise<DataSongResDto> => Promise.resolve(song),
    byIds: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    genre: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    language: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    mood: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    newPodcast: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    newSong: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    podcast: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    similar: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    slider: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    topDay: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    topWeek: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
  };
  const dataTransformServiceMock: DataTransformServiceInterface = {
    transformAlbum: (): DataAlbumResDto => album,
    transformArtist: (): DataArtistResDto => artist,
    transformSong: (): DataSongResDto => song,
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

  it("albums should equal list of albums", async () => {
    const dto: DataAlbumArtistsReqDto = {
      from: 0,
      id: 0,
      limit: 0,
    };
    expect(await service.albums(dto)).toEqual(albumPagination);
  });

  it("latest should equal list of albums", async () => {
    const dto: DataAlbumLatestReqDto = {
      from: 0,
      language: "",
      limit: 0,
    };
    expect(await service.latest(dto)).toEqual(albumPagination);
  });
  it("latest should equal list of albums, language all", async () => {
    const dto: DataAlbumLatestReqDto = {
      from: 0,
      language: "all",
      limit: 0,
    };
    expect(await service.latest(dto)).toEqual(albumPagination);
  });

  it("byId should be equal to an album", async () => {
    const dto: DataAlbumByIdReqDto = {
      id: 0,
    };
    expect(await service.byId(dto)).toEqual(album);
  });
});
