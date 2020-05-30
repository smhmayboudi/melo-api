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

import { AlbumService } from "./album.service";
import { AppArtistService } from "../app/app.artist.service";
import { AppArtistServiceInterface } from "../app/app.artist.service.interface";
import { DataAlbumService } from "../data/data.album.service";
import { DataAlbumServiceInterface } from "../data/data.album.service.interface";

describe("AlbumService", () => {
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
  const album: AlbumResDto = {
    artists: [artist],
    name: "",
    releaseDate,
    songs: [song],
  };
  const albumsArtistsUndefined: AlbumResDto[] = [
    {
      ...album,
      artists: undefined,
    },
  ];

  const appArtistServiceMock: AppArtistServiceInterface = {
    follow: (): Promise<ArtistResDto> => Promise.resolve(artist),
    follows: (): Promise<ArtistResDto[]> => Promise.resolve([artist]),
  };
  const dataAlbumServiceMock: DataAlbumServiceInterface = {
    albums: (): Promise<AlbumResDto[]> => Promise.resolve([album]),
    get: (): Promise<AlbumResDto> => Promise.resolve(album),
    latest: (): Promise<AlbumResDto[]> => Promise.resolve([album]),
  };

  let service: AlbumService;

  describe("AlbumService", () => {
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          AlbumService,
          { provide: AppArtistService, useValue: appArtistServiceMock },
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
        dataConfigElasticsearch,
        dataConfigImage,
        from: 0,
        id: 0,
        size: 0,
      };
      expect(await service.albums(dto)).toEqual([album]);
    });

    it("get should be equal to an artist", async () => {
      const dto: AlbumGetReqDto = {
        dataConfigElasticsearch,
        dataConfigImage,
        id: 0,
      };
      expect(await service.get(dto)).toEqual(album);
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
  });

  it("albums should equal list of albums artists undefined", async () => {
    const dataAlbumServiceMockAlbums: DataAlbumServiceInterface = {
      ...dataAlbumServiceMock,
      albums: (): Promise<AlbumResDto[]> =>
        Promise.resolve([
          {
            ...album,
            artists: undefined,
          },
        ]),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AlbumService,
        {
          provide: AppArtistService,
          useValue: appArtistServiceMock,
        },
        {
          provide: DataAlbumService,
          useValue: dataAlbumServiceMockAlbums,
        },
      ],
    }).compile();
    service = module.get<AlbumService>(AlbumService);

    const dto: AlbumArtistsReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      from: 0,
      id: 0,
      size: 0,
    };
    expect(await service.albums(dto)).toEqual(albumsArtistsUndefined);
  });

  it("get should handle [song] undefnied", async () => {
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
        { provide: AppArtistService, useValue: appArtistServiceMock },
        {
          provide: DataAlbumService,
          useValue: dataAlbumServiceMockGet,
        },
      ],
    }).compile();
    service = module.get<AlbumService>(AlbumService);

    const dto: AlbumGetReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      id: 0,
    };
    expect(await service.get(dto)).toEqual(albumSongsUndefined);
  });
});
