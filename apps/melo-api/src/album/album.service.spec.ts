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
  SongAudioResDto,
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
  const audio: SongAudioResDto = {
    medium: {
      fingerprint: "",
      url: "-0.mp3",
    },
  };
  const song: SongResDto = {
    album,
    artists: [artist],
    audio,
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

  const appArtistServiceMock: AppArtistServiceInterface = {
    follow: (): Promise<ArtistResDto> => Promise.resolve(artist),
    follows: (): Promise<ArtistResDto[]> => Promise.resolve([artist]),
  };
  const dataAlbumServiceMock: DataAlbumServiceInterface = {
    albums: (): Promise<AlbumResDto[]> => Promise.resolve([album]),
    get: (): Promise<AlbumResDto> =>
      Promise.resolve({ ...album, songs: [song] }),
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
      expect(await service.get(dto)).toEqual({
        ...album,
        songs: [song],
      });
    });

    it("get should handle songs undefined", async () => {
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
      expect(await service.get(dto)).toEqual({
        ...album,
        songs: undefined,
      });
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

    it.todo("latest should equal list of albums 2");
  });
});
