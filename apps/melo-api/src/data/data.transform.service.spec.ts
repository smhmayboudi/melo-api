import {
  AlbumResDto,
  ArtistResDto,
  DataArtistType,
  DataConfigElasticsearchReqDto,
  DataConfigImageReqDto,
  DataElasticsearchArtistResDto,
  DataElasticsearchSearchResDto,
  DataImageResDto,
  DataSearchType,
  SongResDto,
} from "@melo/common";
import { Test, TestingModule } from "@nestjs/testing";

import { DataImageService } from "./data.image.service";
import { DataImageServiceInterface } from "./data.image.service.interface";
import { DataTransformService } from "./data.transform.service";

describe("DataTransformService", () => {
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
  const image: DataImageResDto = {
    "": {
      url: "",
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
  const searchElastic: DataElasticsearchSearchResDto = {
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
    suggested: 0,
    tags: [
      {
        tag: "",
      },
    ],
    title: "",
    type: DataSearchType.album,
    unique_name: "",
  };
  const song: SongResDto = {
    album,
    artists: [artist],
    audio: {
      medium: {
        fingerprint: "",
        url: "-0.mp3",
      },
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

  const dataImageServiceMock: DataImageServiceInterface = {
    generateUrl: (): Promise<DataImageResDto> =>
      Promise.resolve({
        "": {
          url: "",
        },
      }),
  };

  let service: DataTransformService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
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

  it("album should be equal to an album 2", async () => {
    expect(
      await service.album({
        ...searchElastic,
        tags: undefined,
        unique_name: undefined,
      })
    ).toEqual({
      ...album,
      tags: undefined,
    });
  });

  it("artist should be equal to an artist", async () => {
    expect(await service.artist(artistElastic)).toEqual(artist);
  });

  it("artist should be equal to an artist 2", async () => {
    expect(
      await service.artist({
        ...artistElastic,
        has_cover: true,
        sum_downloads_count: 0,
        tags: undefined,
      })
    ).toEqual({
      ...artist,
      sumSongsDownloadsCount: undefined,
      tags: undefined,
    });
  });

  it("song should be equal to a song", async () => {
    expect(await service.song(searchElastic)).toEqual(song);
  });

  it("song should be equal to a song 2", async () => {
    expect(
      await service.song({
        ...searchElastic,
        localize: undefined,
        tags: undefined,
        title: undefined,
      })
    ).toEqual({
      ...song,
      album: { ...album, tags: undefined },
      tags: undefined,
    });
  });

  it("song should be equal to a song 3", async () => {
    expect(
      await service.song({
        ...searchElastic,
        has_cover: true,
        localize: true,
      })
    ).toEqual({
      ...song,
      localized: true,
    });
  });
});
