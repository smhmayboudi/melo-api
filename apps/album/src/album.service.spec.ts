import {
  AlbumArtistsReqDto,
  AlbumGetReqDto,
  AlbumLatestReqDto,
  AlbumResDto,
  ArtistResDto,
  DATA_ALBUM_SERVICE_GET,
  DATA_SERVICE,
  DataArtistType,
  DataConfigElasticsearchReqDto,
  DataConfigImageReqDto,
  SongResDto,
} from "@melo/common";
import { Test, TestingModule } from "@nestjs/testing";

import { AlbumService } from "./album.service";
import { of } from "rxjs";

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
  // TODO: interface ?
  const dataClientProxyMock = {
    send: (token: string) =>
      token === DATA_ALBUM_SERVICE_GET ? of(album) : of([album]),
  };

  let service: AlbumService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AlbumService,
        { provide: DATA_SERVICE, useValue: dataClientProxyMock },
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

  it("get should be equal to an artist", async () => {
    const dto: AlbumGetReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      id: 0,
    };
    expect(await service.get(dto)).toEqual(album);
  });
});
