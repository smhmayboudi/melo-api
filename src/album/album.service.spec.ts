import { Test, TestingModule } from "@nestjs/testing";
import { AppMixArtistService } from "../app/app.mix-artist.service";
import { AppMixSongService } from "../app/app.mix-song.service";
import { DataAlbumService } from "../data/data.album.service";
import { DataModule } from "../data/data.module";
import { AlbumService } from "./album.service";

describe("AlbumService", () => {
  const releaseDate = new Date();
  const mixArtist = {
    followersCount: 0,
    id: "",
    type: "prime"
  };
  const mixSong = {
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
  const appMixArtistServiceMock = {
    mixArtist: () => [mixArtist]
  };
  const appMixSongServiceMock = {
    mixSong: () => [mixSong]
  };
  const album = {
    name: "",
    releaseDate,
    songs: {
      results: [mixSong],
      total: 1
    }
  };
  const dataAlbumServiceMock = {
    albums: () => ({
      results: [album],
      total: 1
    }),
    byId: () => album,
    latest: () => ({
      results: [album],
      total: 1
    })
  };
  const dataAlbumServiceMockArtistsUndefined = {
    ...dataAlbumServiceMock,
    albums: () => ({
      results: [
        {
          ...album,
          artists: undefined
        }
      ],
      total: 1
    })
  };
  const dataAlbumServiceMockSongsUndefined = {
    ...dataAlbumServiceMock,
    byId: () => ({
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
      const req = {
        artistId: "",
        from: 0,
        limit: 0
      };
      expect(await albumService.artistAlbums(req, 0, 0)).toEqual(
        dataAlbumServiceMock.albums()
      );
    });

    it("byId should return an artist", async () => {
      const req = {
        id: ""
      };
      expect(await albumService.byId(req, 0, 0)).toEqual(
        dataAlbumServiceMock.byId()
      );
    });

    it("latest should return list of albums", async () => {
      const req = {
        from: 0,
        language: "",
        limit: 0
      };
      expect(await albumService.latest(req)).toEqual(
        dataAlbumServiceMock.latest()
      );
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
      const req = {
        artistId: "",
        from: 0,
        limit: 0
      };
      expect(await albumService.artistAlbums(req, 0, 0)).toEqual(
        dataAlbumServiceMock.albums()
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
      const req = {
        id: ""
      };
      expect(await albumService.byId(req, 0, 0)).toEqual(
        dataAlbumServiceMock.byId()
      );
    });
  });
});
