import { Test, TestingModule } from "@nestjs/testing";

import { AlbumArtistAlbumsReqDto } from "./dto/req/album.artist-albums.req.dto";
import { AlbumByIdReqDto } from "./dto/req/album.by-id.req.dto";
import { AlbumLatestReqDto } from "./dto/req/album.latest.req.dto";
import { AlbumService } from "./album.service";
import { AppArtistServceInterface } from "../app/app.artist.service.interface";
import { AppArtistService } from "../app/app.artist.service";
import { DataAlbumResDto } from "../data/dto/res/data.album.res.dto";
import { DataAlbumService } from "../data/data.album.service";
import { DataAlbumServiceInterface } from "../data/data.album.service.interface";
import { DataArtistResDto } from "../data/dto/res/data.artist.res.dto";
import { DataArtistType } from "../data/data.artist.type";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataSongResDto } from "../data/dto/res/data.song.res.dto";

describe("AlbumService", () => {
  const releaseDate = new Date();
  const artist: DataArtistResDto = {
    followersCount: 0,
    id: 0,
    type: DataArtistType.prime,
  };
  const like: DataSongResDto = {
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
  const likePagination: DataPaginationResDto<DataSongResDto> = {
    results: [like],
    total: 1,
  } as DataPaginationResDto<DataSongResDto>;
  const album: DataAlbumResDto = {
    artists: [artist],
    name: "",
    releaseDate,
    songs: likePagination,
  };
  const albumPagination: DataPaginationResDto<DataAlbumResDto> = {
    results: [album],
    total: 1,
  } as DataPaginationResDto<DataAlbumResDto>;
  const albumPaginationArtistsUndefined: DataPaginationResDto<DataAlbumResDto> = {
    results: [{ ...album, artists: undefined }],
    total: 1,
  } as DataPaginationResDto<DataAlbumResDto>;

  const appArtistMock: AppArtistServceInterface = {
    follow: (): Promise<DataArtistResDto> => Promise.resolve(artist),
    follows: (): Promise<DataArtistResDto[]> => Promise.resolve([artist]),
  };
  const dataAlbumServiceMock: DataAlbumServiceInterface = {
    albums: (): Promise<DataPaginationResDto<DataAlbumResDto>> =>
      Promise.resolve(albumPagination),
    byId: (): Promise<DataAlbumResDto> => Promise.resolve(album),
    latest: (): Promise<DataPaginationResDto<DataAlbumResDto>> =>
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

    it("artistAlbums should equal list of artists", async () => {
      const dto: AlbumArtistAlbumsReqDto = {
        artistId: 0,
        from: 0,
        size: 0,
      };
      expect(await service.artistAlbums(dto)).toEqual(albumPagination);
    });

    it("byId should be equal to an artist", async () => {
      const dto: AlbumByIdReqDto = {
        id: 0,
      };
      expect(await service.byId(dto)).toEqual(album);
    });

    it("latest should equal list of albums", async () => {
      const dto: AlbumLatestReqDto = {
        from: 0,
        language: "",
        size: 0,
      };
      expect(await service.latest(dto)).toEqual(albumPagination);
    });
  });

  describe("artists: undefined", () => {
    const dataAlbumServiceMockArtistsUndefined: DataAlbumServiceInterface = {
      ...dataAlbumServiceMock,
      albums: (): Promise<DataPaginationResDto<DataAlbumResDto>> =>
        Promise.resolve({
          results: [
            {
              ...album,
              artists: undefined,
            },
          ],
          total: 1,
        } as DataPaginationResDto<DataAlbumResDto>),
    };

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          AlbumService,
          {
            provide: AppArtistService,
            useValue: appArtistMock,
          },
          {
            provide: DataAlbumService,
            useValue: dataAlbumServiceMockArtistsUndefined,
          },
        ],
      }).compile();
      service = module.get<AlbumService>(AlbumService);
    });

    it("artistAlbums should equal list of albums artists undefined", async () => {
      const dto: AlbumArtistAlbumsReqDto = {
        artistId: 0,
        from: 0,
        size: 0,
      };
      expect(await service.artistAlbums(dto)).toEqual(
        albumPaginationArtistsUndefined
      );
    });
  });

  describe("songs: undefined", () => {
    const albumSongsUndefined: DataAlbumResDto = {
      ...album,
      songs: undefined,
    };
    const dataAlbumServiceMockSongsUndefined: DataAlbumServiceInterface = {
      ...dataAlbumServiceMock,
      byId: (): Promise<DataAlbumResDto> =>
        Promise.resolve({
          ...album,
          songs: undefined,
        }),
    };

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          AlbumService,
          { provide: AppArtistService, useValue: appArtistMock },
          {
            provide: DataAlbumService,
            useValue: dataAlbumServiceMockSongsUndefined,
          },
        ],
      }).compile();
      service = module.get<AlbumService>(AlbumService);
    });

    it("byId should handle songs undefnied", async () => {
      const dto: AlbumByIdReqDto = {
        id: 0,
      };
      expect(await service.byId(dto)).toEqual(albumSongsUndefined);
    });
  });
});
