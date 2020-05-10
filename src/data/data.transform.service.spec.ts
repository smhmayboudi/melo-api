import { Test, TestingModule } from "@nestjs/testing";

import { AppImgProxyService } from "../app/app.img-proxy.service";
import { AppImgProxyServiceInterface } from "../app/app.img-proxy.service.interface";
import { DataAlbumResDto } from "./dto/res/data.album.res.dto";
import { DataArtistElasticResDto } from "./dto/res/data.artist.elastic.res.dto";
import { DataArtistResDto } from "./dto/res/data.artist.res.dto";
import { DataArtistType } from "./data.artist.type";
import { DataConfigService } from "./data.config.service";
import { DataConfigServiceInterface } from "./data.config.service.interface";
import { DataImageResDto } from "./dto/res/data.image.res.dto";
import { DataSearchElasticResDto } from "./dto/res/data.search.elastic.res.dto";
import { DataSongResDto } from "./dto/res/data.song.res.dto";
import { DataTransformService } from "./data.transform.service";

describe("DataTransformService", () => {
  const releaseDate = new Date();
  const artist: DataArtistResDto = {
    followersCount: 0,
    fullName: "",
    id: 0,
    image: { "": { url: "" } },
    sumSongsDownloadsCount: 1,
    tags: [""],
    type: DataArtistType.prime,
  };
  const elasticArtistRes: DataArtistElasticResDto = {
    available: false,
    followers_count: 0,
    full_name: "",
    has_cover: false,
    id: 0,
    popular: false,
    sum_downloads_count: 1,
    tags: [{ tag: "" }],
    type: DataArtistType.prime,
  };
  const elasticSearchRes: DataSearchElasticResDto = {
    album: "",
    album_downloads_count: 0,
    album_id: 0,
    album_tracks_count: 0,
    artist_followers_count: 0,
    artist_full_name: "",
    artist_id: 0,
    artist_sum_downloads_count: 1,
    artists: [elasticArtistRes],
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
    tags: [{ tag: "" }],
    title: "",
    type: "",
    unique_name: "",
  };
  const album: DataAlbumResDto = {
    artists: [artist],
    downloadCount: 0,
    id: 0,
    image: { "": { url: "" } },
    name: "",
    releaseDate,
    tags: [""],
    tracksCount: 0,
  };
  const song: DataSongResDto = {
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
    image: { "": { url: "" } },
    localized: false,
    lyrics: "",
    releaseDate,
    tags: [""],
    title: "",
  };

  const appImgProxyServiceMock: AppImgProxyServiceInterface = {
    generateUrl: (): DataImageResDto => ({
      "": {
        url: "",
      },
    }),
  };
  const dataConfigServiceMock: DataConfigServiceInterface = {
    defaultAlbumImagePath: "",
    defaultArtistImagePath: "",
    defaultSongImagePath: "",
    elasticNode: "",
    imagePath: () => "",
    index: "",
    mp3Endpoint: "",
    resultSize: 0,
    typeOrmDatabase: "",
    typeOrmHost: "",
    typeOrmLogging: true,
    typeOrmPassword: "",
    typeOrmPort: 0,
    typeOrmSynchronize: true,
    typeOrmUsername: "",
  };

  let service: DataTransformService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: AppImgProxyService, useValue: appImgProxyServiceMock },
        { provide: DataConfigService, useValue: dataConfigServiceMock },
        DataTransformService,
      ],
    }).compile();
    service = module.get<DataTransformService>(DataTransformService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("transformAlbum should be equal to an album", () => {
    expect(service.transformAlbum(elasticSearchRes)).toEqual(album);
  });

  it("transformArtist should be equal to an artist", () => {
    expect(service.transformArtist(elasticArtistRes)).toEqual(artist);
  });

  it("transformSong should be equal to a song", () => {
    expect(service.transformSong(elasticSearchRes)).toEqual(song);
  });
});
