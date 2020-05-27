import {
  AlbumResDto,
  ArtistResDto,
  DataArtistType,
  DataConfigElasticSearchReqDto,
  DataConfigImageReqDto,
  DataElasticSearchArtistResDto,
  DataElasticSearchSearchResDto,
  DataImageResDto,
  SongResDto,
} from "@melo/common";
import { Test, TestingModule } from "@nestjs/testing";

import { DataConfigService } from "./data.config.service";
import { DataConfigServiceInterface } from "./data.config.service.interface";
import { DataImageService } from "./data.image.service";
import { DataImageServiceInterface } from "./data.image.service.interface";
import { DataTransformService } from "./data.transform.service";

describe("DataTransformService", () => {
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
  const image: DataImageResDto = {
    cover: {
      url:
        "3jr-WvcF601FGlXVSkFCJIJ7A4J2z4rtTcTK_UXHi58/rs:fill:1024:1024:1/dpr:1/",
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
  const artistElastic: DataElasticSearchArtistResDto = {
    available: false,
    dataConfigElasticSearch,
    dataConfigImage,
    followers_count: 0,
    full_name: "",
    has_cover: false,
    id: 0,
    popular: false,
    sum_downloads_count: 1,
    tags: [{ tag: "" }],
    type: DataArtistType.prime,
  };
  const searchElastic: DataElasticSearchSearchResDto = {
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
    dataConfigElasticSearch,
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
    tags: [{ tag: "" }],
    title: "",
    type: "",
    unique_name: "",
  };
  const song: SongResDto = {
    album,
    artists: [artist],
    audio: {
      medium: { fingerprint: "", url: "-0.mp3" },
    },
    copyrighted: false,
    downloadCount: 0,
    duration: 0,
    hasVideo: false,
    id: 0,
    image,
    localized: false,
    lyrics: "",
    releaseDate,
    tags: [""],
    title: "",
  };

  const dataConfigServiceMock: DataConfigServiceInterface = {
    elasticNode: "",
    imageBaseUrl: "",
    imageEncode: true,
    imageKey: "",
    imagePath: "",
    imagePathDefaultAlbum: "",
    imagePathDefaultArtist: "",
    imagePathDefaultSong: "",
    imageSalt: "",
    imageSignatureSize: 32,
    imageTypeSize: [{ height: 1024, name: "cover", width: 1024 }],
    indexName: "",
    maxSize: 0,
    mp3Endpoint: "",
    typeOrmDatabase: "",
    typeOrmHost: "",
    typeOrmLogging: true,
    typeOrmPassword: "",
    typeOrmPort: 0,
    typeOrmSynchronize: true,
    typeOrmUsername: "",
  };
  const dataImageServiceMock: DataImageServiceInterface = {
    generateUrl: (): Promise<DataImageResDto> => Promise.resolve(image),
  };

  let service: DataTransformService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: DataConfigService, useValue: dataConfigServiceMock },
        { provide: DataImageService, useValue: dataImageServiceMock },
        DataTransformService,
      ],
    }).compile();
    service = module.get<DataTransformService>(DataTransformService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("album should be equal to an album", async () => {
    expect(await service.album(searchElastic)).toEqual(album);
  });

  it("artist should be equal to an artist", async () => {
    expect(await service.artist(artistElastic)).toEqual(artist);
  });

  it("song should be equal to a song", async () => {
    expect(await service.song(searchElastic)).toEqual(song);
  });
});
