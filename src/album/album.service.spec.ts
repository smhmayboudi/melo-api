import { Test, TestingModule } from "@nestjs/testing";
import { DataAlbumResDto } from "src/data/dto/res/data.album.res.dto";
import { DataPaginationResDto } from "src/data/dto/res/data.pagination.res.dto";
import { AppMixArtistService } from "../app/app.mix-artist.service";
import { AppMixSongService } from "../app/app.mix-song.service";
import { DataModule } from "../data/data.module";
import { AlbumService } from "./album.service";

describe("AlbumService", () => {
  const appMixSongServiceMock = jest.fn(() => ({
    mixSong: {
      return: [
        {
          artists: [
            {
              followersCount: 0,
              id: 0,
              type: "prime"
            }
          ],
          audio: {
            high: {
              fingerprint: "",
              url: ""
            }
          },
          duration: 0,
          id: "",
          localized: false,
          releaseDate: new Date(),
          title: ""
        }
      ]
    }
  }));

  const appMixArtistServiceMock = jest.fn(() => ({
    mixArtist: [
      {
        followersCount: 0,
        id: "",
        type: "prime"
      }
    ]
  }));

  const dataAlbumServiceMock = jest.fn(() => ({
    albums: {
      results: [],
      total: 0
    },
    byId: {
      name: "",
      releaseDate: new Date()
    },
    latest: {
      results: [],
      total: 0
    }
  }));
  let albumService: AlbumService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DataModule],
      providers: [
        AlbumService,
        { provide: AppMixSongService, useValue: appMixSongServiceMock },
        { provide: AppMixArtistService, useValue: appMixArtistServiceMock },
        { provide: dataAlbumServiceMock, useValue: dataAlbumServiceMock }
      ]
    }).compile();

    albumService = module.get<AlbumService>(AlbumService);
  });

  it("should be defined", () => {
    expect(albumService).toBeDefined();
  });

  it("artistAlbums should return list of artists", async () => {
    const req = {
      from: 0,
      artistId: "",
      limit: 0
    };
    const res = {
      results: [
        {
          name: "",
          releaseDate: new Date()
        }
      ],
      total: 1
    } as DataPaginationResDto<DataAlbumResDto>;

    jest
      .spyOn(albumService, "artistAlbums")
      .mockImplementation(() => Promise.resolve(res));

    expect(await albumService.artistAlbums(req, 0, 0)).toBe(res);
  });

  it("byId should return an artist", async () => {
    const req = {
      id: ""
    };
    const res = {
      name: "",
      releaseDate: new Date()
    };

    jest
      .spyOn(albumService, "byId")
      .mockImplementation(() => Promise.resolve(res));

    expect(await albumService.byId(req, 0, 0)).toBe(res);
  });

  it("latest should return list of albums", async () => {
    const req = {
      from: 0,
      language: "",
      limit: 0
    };
    const res = {
      results: [
        {
          name: "",
          releaseDate: new Date()
        }
      ],
      total: 1
    } as DataPaginationResDto<DataAlbumResDto>;

    jest
      .spyOn(albumService, "latest")
      .mockImplementation(() => Promise.resolve(res));

    expect(await albumService.latest(req)).toBe(res);
  });
});
