import {
  AlbumArtistsReqDto,
  AlbumGetReqDto,
  AlbumLatestReqDto,
  AlbumResDto,
  ArtistResDto,
  DataArtistType,
  DataConfigElasticSearchReqDto,
  DataConfigImageReqDto,
  DataPaginationResDto,
  SongResDto,
} from "@melo/common";
import { Test, TestingModule } from "@nestjs/testing";

import { AlbumService } from "./album.service";
import { AppArtistService } from "../app/app.artist.service";
import { AppArtistServiceInterface } from "../app/app.artist.service.interface";
import { DataAlbumService } from "../data/data.album.service";
import { DataAlbumServiceInterface } from "../data/data.album.service.interface";

describe("AlbumService", () => {
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
  const artist: ArtistResDto = {
    followersCount: 0,
    id: 0,
    type: DataArtistType.prime,
  };
  const like: SongResDto = {
    artists: [artist],
    audio: {
      high: {
        fingerprint: "",
        url: "",
      },
    },
    duration: 0,
    id: 0,
    localized: false,
    releaseDate,
    title: "",
  };
  const likePagination: DataPaginationResDto<SongResDto> = {
    results: [like],
    total: 1,
  } as DataPaginationResDto<SongResDto>;
  const album: AlbumResDto = {
    artists: [artist],
    name: "",
    releaseDate,
    songs: likePagination,
  };
  const albumPagination: DataPaginationResDto<AlbumResDto> = {
    results: [album],
    total: 1,
  } as DataPaginationResDto<AlbumResDto>;
  const albumPaginationArtistsUndefined: DataPaginationResDto<AlbumResDto> = {
    results: [{ ...album, artists: undefined }],
    total: 1,
  } as DataPaginationResDto<AlbumResDto>;

  const appArtistMock: AppArtistServiceInterface = {
    follow: (): Promise<ArtistResDto> => Promise.resolve(artist),
    follows: (): Promise<ArtistResDto[]> => Promise.resolve([artist]),
  };
  const dataAlbumServiceMock: DataAlbumServiceInterface = {
    albums: (): Promise<DataPaginationResDto<AlbumResDto>> =>
      Promise.resolve(albumPagination),
    get: (): Promise<AlbumResDto> => Promise.resolve(album),
    latest: (): Promise<DataPaginationResDto<AlbumResDto>> =>
      Promise.resolve(albumPagination),
  };

  let service: AlbumService;

  describe("AlbumService", () => {
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          AlbumService,
          { provide: AppArtistService, useValue: appArtistMock },
          { provide: DataAlbumService, useValue: dataAlbumServiceMock },
        ],
      }).compile();
      service = module.get<AlbumService>(AlbumService);
    });

    it("should be defined", () => {
      expect(service).toBeDefined();
    });

    it("albums should equal list of artists", async () => {
      const dto: AlbumArtistsReqDto = {
        dataConfigElasticSearch,
        dataConfigImage,
        from: 0,
        id: 0,
        size: 0,
      };
      expect(await service.albums(dto)).toEqual(albumPagination);
    });

    it("get should be equal to an artist", async () => {
      const dto: AlbumGetReqDto = {
        dataConfigElasticSearch,
        dataConfigImage,
        id: 0,
      };
      expect(await service.get(dto)).toEqual(album);
    });

    it("latest should equal list of albums", async () => {
      const dto: AlbumLatestReqDto = {
        dataConfigElasticSearch,
        dataConfigImage,
        from: 0,
        language: "",
        size: 0,
      };
      expect(await service.latest(dto)).toEqual(albumPagination);
    });
  });

  it("albums should equal list of albums artists undefined", async () => {
    const dataAlbumServiceMockAlbums: DataAlbumServiceInterface = {
      ...dataAlbumServiceMock,
      albums: (): Promise<DataPaginationResDto<AlbumResDto>> =>
        Promise.resolve({
          results: [
            {
              ...album,
              artists: undefined,
            },
          ],
          total: 1,
        } as DataPaginationResDto<AlbumResDto>),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AlbumService,
        {
          provide: AppArtistService,
          useValue: appArtistMock,
        },
        {
          provide: DataAlbumService,
          useValue: dataAlbumServiceMockAlbums,
        },
      ],
    }).compile();
    service = module.get<AlbumService>(AlbumService);

    const dto: AlbumArtistsReqDto = {
      dataConfigElasticSearch,
      dataConfigImage,
      from: 0,
      id: 0,
      size: 0,
    };
    expect(await service.albums(dto)).toEqual(albumPaginationArtistsUndefined);
  });

  it("get should handle songs undefnied", async () => {
    const albumSongsUndefined: AlbumResDto = {
      ...album,
      songs: undefined,
    };
    const dataAlbumServiceMockGet: DataAlbumServiceInterface = {
      ...dataAlbumServiceMock,
      get: (): Promise<AlbumResDto> =>
        Promise.resolve({
          ...album,
          songs: undefined,
        }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AlbumService,
        { provide: AppArtistService, useValue: appArtistMock },
        {
          provide: DataAlbumService,
          useValue: dataAlbumServiceMockGet,
        },
      ],
    }).compile();
    service = module.get<AlbumService>(AlbumService);

    const dto: AlbumGetReqDto = {
      dataConfigElasticSearch,
      dataConfigImage,
      id: 0,
    };
    expect(await service.get(dto)).toEqual(albumSongsUndefined);
  });
});
