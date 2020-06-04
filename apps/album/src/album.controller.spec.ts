import {
  AlbumArtistsReqDto,
  AlbumGetReqDto,
  AlbumLatestReqDto,
  AlbumResDto,
  ArtistResDto,
  ConstImageResDto,
  DataArtistType,
  DataConfigElasticsearchReqDto,
  DataConfigImageReqDto,
  DataElasticsearchArtistResDto,
  DataElasticsearchSearchResDto,
  DataSearchType,
} from "@melo/common";

import { AlbumConfigService } from "./album.config.service";
import { AlbumConfigServiceInterface } from "./album.config.service.interface";
import { AlbumController } from "./album.controller";
import { AlbumService } from "./album.service";
import { AlbumServiceInterface } from "./album.service.interface";
import { Test } from "@nestjs/testing";

describe("AlbumController", () => {
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
    imageSignatureSize: 32,
    imageTypeSize: [
      {
        height: 1024,
        name: "cover",
        width: 1024,
      },
    ],
  };
  const releaseDate = new Date();
  const image: ConstImageResDto = {
    cover: {
      url:
        "Hc_ZS0sdjGuezepA_VM2iPDk4f2duSiHE42FzLqiIJM/rs:fill:1024:1024:1/dpr:1/L2Fzc2V0L3BvcC5qcGc",
    },
  };
  const artist: ArtistResDto = {
    followersCount: 0,
    fullName: "",
    id: 0,
    image,
    sumSongsDownloadsCount: 1,
    tags: [""],
    type: DataArtistType.prime,
  };
  const album: AlbumResDto = {
    artists: [artist],
    downloadCount: 0,
    id: 0,
    image,
    name: "",
    releaseDate,
    tags: [""],
    tracksCount: 0,
  };

  const albumConfigServiceMock: AlbumConfigServiceInterface = {
    elasticsearchNode: "",
    imagePath: "",
    imagePathDefaultAlbum: "",
    indexName: "",
    maxSize: 0,
  };
  const albumServiceMock: AlbumServiceInterface = {
    albums: () => Promise.resolve([album]),
    get: () => Promise.resolve(album),
    latest: () => Promise.resolve([album]),
    transform: () => Promise.resolve(album),
  };

  let controller: AlbumController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AlbumController],
      providers: [
        { provide: AlbumConfigService, useValue: albumConfigServiceMock },
        { provide: AlbumService, useValue: albumServiceMock },
      ],
    }).compile();
    controller = module.get<AlbumController>(AlbumController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("albums should equal list of albums", async () => {
    const dto: AlbumArtistsReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      from: 0,
      id: 0,
      size: 0,
    };
    expect(await controller.albums(dto)).toEqual([album]);
  });

  it("get should be equal to an album", async () => {
    const dto: AlbumGetReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      id: 0,
    };
    expect(await controller.get(dto)).toEqual(album);
  });

  it("latest should equal list of albums", async () => {
    const dto: AlbumLatestReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      from: 0,
      language: "",
      size: 0,
    };
    expect(await controller.latest(dto)).toEqual([album]);
  });

  it("transform should be equal to a DataAlbumResDto", async () => {
    const artistElastic: DataElasticsearchArtistResDto = {
      available: false,
      dataConfigElasticsearch,
      dataConfigImage,
      followers_count: 0,
      full_name: "",
      has_cover: false,
      id: 0,
      popular: false,
      sum_downloads_count: 1,
      tags: [
        {
          tag: "",
        },
      ],
      type: DataArtistType.prime,
    };
    const dto: DataElasticsearchSearchResDto = {
      album: "",
      album_downloads_count: 0,
      album_id: 0,
      album_tracks_count: 0,
      artist_followers_count: 0,
      artist_full_name: "",
      artist_id: 0,
      artist_sum_downloads_count: 1,
      artists: [artistElastic],
      copyright: false,
      dataConfigElasticsearch,
      dataConfigImage,
      downloads_count: 0,
      duration: 0,
      has_cover: false,
      has_video: false,
      id: 0,
      localize: false,
      lyrics: "",
      max_audio_rate: 0,
      release_date: releaseDate,
      tags: [
        {
          tag: "",
        },
      ],
      title: "",
      type: DataSearchType.album,
      unique_name: "",
    };
    expect(await controller.transform(dto)).toEqual(album);
  });
});
