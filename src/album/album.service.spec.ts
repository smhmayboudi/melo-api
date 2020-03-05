import { Test, TestingModule } from "@nestjs/testing";
import { AppMixArtistService } from "../app/app.mix-artist.service";
import { AppMixSongService } from "../app/app.mix-song.service";
import { DataAlbumService } from "../data/data.album.service";
import { DataArtistType } from "../data/data.artist.type";
import { DataModule } from "../data/data.module";
import { DataAlbumResDto } from "../data/dto/res/data.album.res.dto";
import { DataArtistResDto } from "../data/dto/res/data.artist.res.dto";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataSongResDto } from "../data/dto/res/data.song.res.dto";
import { AlbumService } from "./album.service";
import { AlbumArtistAlbumsReqDto } from "./dto/req/album.artist-albums.req.dto";
import { AlbumByIdReqDto } from "./dto/req/album.by-id.req.dto";
import { AlbumLatestReqDto } from "./dto/req/album.latest.req.dto";

describe("AlbumService", () => {
  const releaseDate = new Date();
  const mixArtist: DataArtistResDto = {
    followersCount: 0,
    id: "",
    type: DataArtistType.prime
  };
  const mixSong: DataSongResDto = {
    artists: [mixArtist],
    audio: {
      high: {
        fingerprint: "",
        url: ""
      }
    },
    duration: 0,
    id: "",
    localized: false,
    releaseDate,
    title: ""
  };
  const mixSongPagination: DataPaginationResDto<DataSongResDto> = {
    results: [mixSong],
    total: 1
  } as DataPaginationResDto<DataSongResDto>;
  const album: DataAlbumResDto = {
    name: "",
    releaseDate,
    songs: mixSongPagination
  };
  const albumPagination: DataPaginationResDto<DataAlbumResDto> = {
    results: [album],
    total: 1
  } as DataPaginationResDto<DataAlbumResDto>;

  const appMixArtistServiceMock = {
    mixArtist: (): DataArtistResDto[] => [mixArtist]
  };
  const appMixSongServiceMock = {
    mixSong: (): DataSongResDto[] => [mixSong]
  };
  const dataAlbumServiceMock = {
    albums: (): DataPaginationResDto<DataAlbumResDto> => albumPagination,
    byId: (): DataAlbumResDto => album,
    latest: (): DataPaginationResDto<DataAlbumResDto> => albumPagination
  };
  const dataAlbumServiceMockArtistsUndefined = {
    ...dataAlbumServiceMock,
    albums: (): DataPaginationResDto<DataAlbumResDto> =>
      ({
        results: [
          {
            ...album,
            artists: undefined
          }
        ],
        total: 1
      } as DataPaginationResDto<DataAlbumResDto>)
  };
  const dataAlbumServiceMockSongsUndefined = {
    ...dataAlbumServiceMock,
    byId: (): DataAlbumResDto => ({
      ...album,
      songs: undefined
    })
  };

  let albumService: AlbumService;

  describe("AlbumService", () => {
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        imports: [DataModule],
        providers: [
          AlbumService,
          { provide: AppMixArtistService, useValue: appMixArtistServiceMock },
          { provide: AppMixSongService, useValue: appMixSongServiceMock },
          { provide: DataAlbumService, useValue: dataAlbumServiceMock }
        ]
      }).compile();
      albumService = module.get<AlbumService>(AlbumService);
    });

    it("should be defined", () => {
      expect(albumService).toBeDefined();
    });

    it("artistAlbums should return list of artists", async () => {
      const dto: AlbumArtistAlbumsReqDto = {
        artistId: "0",
        from: 0,
        limit: 0
      };
      expect(await albumService.artistAlbums(dto, 0, 0)).toEqual(
        albumPagination
      );
    });

    it("byId should return an artist", async () => {
      const dto: AlbumByIdReqDto = {
        id: "0"
      };
      expect(await albumService.byId(dto, 0, 0)).toEqual(album);
    });

    it("latest should return list of albums", async () => {
      const dto: AlbumLatestReqDto = {
        from: 0,
        language: "",
        limit: 0
      };
      expect(await albumService.latest(dto)).toEqual(albumPagination);
    });
  });

  describe("AlbumService Artists Undefined", () => {
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        imports: [DataModule],
        providers: [
          AlbumService,
          { provide: AppMixArtistService, useValue: appMixArtistServiceMock },
          { provide: AppMixSongService, useValue: appMixSongServiceMock },
          {
            provide: DataAlbumService,
            useValue: dataAlbumServiceMockArtistsUndefined
          }
        ]
      }).compile();
      albumService = module.get<AlbumService>(AlbumService);
    });

    it("artistAlbums should handle artists undefined", async () => {
      const dto: AlbumArtistAlbumsReqDto = {
        artistId: "",
        from: 0,
        limit: 0
      };
      expect(await albumService.artistAlbums(dto, 0, 0)).toEqual(
        albumPagination
      );
    });
  });

  describe("AlbumService Songs Undefined", () => {
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        imports: [DataModule],
        providers: [
          AlbumService,
          { provide: AppMixArtistService, useValue: appMixArtistServiceMock },
          { provide: AppMixSongService, useValue: appMixSongServiceMock },
          {
            provide: DataAlbumService,
            useValue: dataAlbumServiceMockSongsUndefined
          }
        ]
      }).compile();
      albumService = module.get<AlbumService>(AlbumService);
    });

    it("byId should handle songs undefnied", async () => {
      const dto: AlbumByIdReqDto = {
        id: ""
      };
      expect(await albumService.byId(dto, 0, 0)).toEqual(album);
    });
  });
});
