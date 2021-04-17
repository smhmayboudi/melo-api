import {
  AlbumArtistsReqDto,
  AlbumGetReqDto,
  AlbumLatestReqDto,
  AlbumResDto,
  ArtistResDto,
  ArtistType,
  ConstImageResDto,
  SearchElasticsearchArtistResDto,
  SearchElasticsearchSearchResDto,
  SearchType,
} from "@melo/common";

import { AlbumConfigService } from "./album.config.service";
import { AlbumConfigServiceInterface } from "./album.config.service.interface";
import { AlbumController } from "./album.controller";
import { AlbumService } from "./album.service";
import { AlbumServiceInterface } from "./album.service.interface";
import { Test } from "@nestjs/testing";

describe("AlbumController", () => {
  const releaseDate = new Date();
  const image: ConstImageResDto = {
    cover: {
      url:
        "Cz6suIAYeF_rXp18UTsU4bHL-gaGsq2PpE2_dLMWj9s/rs:fill:1024:1024:1/dpr:1/plain/asset/pop.jpg",
    },
  };
  const artist: ArtistResDto = {
    followersCount: 0,
    fullName: "",
    id: 0,
    image,
    sumSongsDownloadsCount: 1,
    tags: [""],
    type: ArtistType.prime,
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
    servicePort: 0,
    serviceRetryAttempts: 0,
    serviceRetryDelay: 0,
    serviceUrl: "",
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
      from: 0,
      id: 0,
      size: 0,
    };
    expect(await controller.albums(dto)).toEqual([album]);
  });

  it("get should be equal to an album", async () => {
    const dto: AlbumGetReqDto = {
      id: 0,
    };
    expect(await controller.get(dto)).toEqual(album);
  });

  it("latest should equal list of albums", async () => {
    const dto: AlbumLatestReqDto = {
      from: 0,
      language: "",
      size: 0,
    };
    expect(await controller.latest(dto)).toEqual([album]);
  });

  it("transform should be equal to a AlbumResDto", async () => {
    const artistElastic: SearchElasticsearchArtistResDto = {
      available: false,
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
      type: ArtistType.prime,
    };
    const dto: SearchElasticsearchSearchResDto = {
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
      type: SearchType.album,
      unique_name: "",
    };
    expect(await controller.transform(dto)).toEqual(album);
  });
});
