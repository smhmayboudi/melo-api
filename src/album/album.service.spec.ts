import { Test, TestingModule } from "@nestjs/testing";

import { AlbumArtistAlbumsReqDto } from "./dto/req/album.artist-albums.req.dto";
import { AlbumByIdReqDto } from "./dto/req/album.by-id.req.dto";
import { AlbumLatestReqDto } from "./dto/req/album.latest.req.dto";
import { AlbumService } from "./album.service";
import { AppCheckFollowService } from "../app/app.check-follow.service";
import { AppCheckFollowServiceInterface } from "../app/app.check-follow.service.interface";
import { DataAlbumResDto } from "../data/dto/res/data.album.res.dto";
import { DataAlbumService } from "../data/data.album.service";
import { DataAlbumServiceInterface } from "../data/data.album.service.interface";
import { DataArtistResDto } from "../data/dto/res/data.artist.res.dto";
import { DataArtistType } from "../data/data.artist.type";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataSongResDto } from "../data/dto/res/data.song.res.dto";

describe("AlbumService", () => {
  const releaseDate = new Date();
  const follow: DataArtistResDto = {
    followersCount: 0,
    id: "",
    type: DataArtistType.prime,
  };
  const like: DataSongResDto = {
    artists: [follow],
    audio: {
      high: {
        fingerprint: "",
        url: "",
      },
    },
    duration: 0,
    id: "",
    localized: false,
    releaseDate,
    title: "",
  };
  const likePagination: DataPaginationResDto<DataSongResDto> = {
    results: [like],
    total: 1,
  } as DataPaginationResDto<DataSongResDto>;
  const album: DataAlbumResDto = {
    artists: [follow],
    name: "",
    releaseDate,
    songs: likePagination,
  };
  const albumPagination: DataPaginationResDto<DataAlbumResDto> = {
    results: [album],
    total: 1,
  } as DataPaginationResDto<DataAlbumResDto>;

  const appMixArtistServiceMock: AppCheckFollowServiceInterface = {
    follow: (): Promise<DataArtistResDto[]> => Promise.resolve([follow]),
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
          { provide: AppCheckFollowService, useValue: appMixArtistServiceMock },
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
        artistId: "0",
        from: 0,
        limit: 0,
      };
      expect(await service.artistAlbums(dto, 0, 0)).toEqual(albumPagination);
    });

    it("byId should be equal to an artist", async () => {
      const dto: AlbumByIdReqDto = {
        id: "0",
      };
      expect(await service.byId(dto, 0)).toEqual(album);
    });

    it("latest should equal list of albums", async () => {
      const dto: AlbumLatestReqDto = {
        from: 0,
        language: "",
        limit: 0,
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
            provide: AppCheckFollowService,
            useValue: appMixArtistServiceMock,
          },
          {
            provide: DataAlbumService,
            useValue: dataAlbumServiceMockArtistsUndefined,
          },
        ],
      }).compile();
      service = module.get<AlbumService>(AlbumService);
    });

    it("artistAlbums should equal list of artists undefined", async () => {
      const dto: AlbumArtistAlbumsReqDto = {
        artistId: "0",
        from: 0,
        limit: 0,
      };
      expect(await service.artistAlbums(dto, 0, 0)).toEqual(albumPagination);
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
          { provide: AppCheckFollowService, useValue: appMixArtistServiceMock },
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
        id: "",
      };
      expect(await service.byId(dto, 0)).toEqual(albumSongsUndefined);
    });
  });
});
