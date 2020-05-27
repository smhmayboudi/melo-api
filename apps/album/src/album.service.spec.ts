import {
  AlbumArtistsReqDto,
  AlbumGetReqDto,
  AlbumLatestReqDto,
  AlbumResDto,
  ArtistResDto,
  DATA_SERVICE,
  DataArtistType,
  DataConfigElasticSearchReqDto,
  DataConfigImageReqDto,
  DataPaginationResDto,
  SongResDto,
} from "@melo/common";
import { Observable, of } from "rxjs";
import { Test, TestingModule } from "@nestjs/testing";

import { AlbumService } from "./album.service";

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

  // TODO: interface ?
  const clientProxyMock = {
    send: (): Observable<DataPaginationResDto<AlbumResDto>> =>
      of(albumPagination),
  };

  let service: AlbumService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AlbumService,
        { provide: DATA_SERVICE, useValue: clientProxyMock },
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

  it("get should be equal to an artist", async () => {
    // TODO: interface ?
    const clientProxyMock = {
      send: (): Observable<AlbumResDto> => of(album),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AlbumService,
        { provide: DATA_SERVICE, useValue: clientProxyMock },
      ],
    }).compile();
    service = module.get<AlbumService>(AlbumService);

    const dto: AlbumGetReqDto = {
      dataConfigElasticSearch,
      dataConfigImage,
      id: 0,
    };
    expect(await service.get(dto)).toEqual(album);
  });
});
