// import { forwardRef } from "@nestjs/common";
// import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppMixArtistService } from "../app/app.mix-artist.service";
import { AppMixSongService } from "../app/app.mix-song.service";
import { DataAlbumService } from "../data/data.album.service";
import { DataArtistType } from "../data/data.artist.type";
import { DataAlbumResDto } from "../data/dto/res/data.album.res.dto";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
// import config from "./album.config";
import { AlbumController } from "./album.controller";
import { AlbumService } from "./album.service";

describe("AlbumController", () => {
  let albumController: AlbumController;
  let service: AlbumService;

  const releaseDate = new Date();

  const appMixArtistServiceMock = {
    mixArtist: (): any => {
      [
        {
          followersCount: 0,
          id: "",
          type: DataArtistType.prime
        }
      ];
    }
  };
  const appMixSongServiceMock = {
    mixSong: (): any => {
      [
        {
          artists: [
            {
              followersCount: 0,
              id: "",
              type: DataArtistType.prime
            }
          ],
          audio: {},
          duration: 0,
          id: "",
          localized: false,
          releaseDate: new Date(),
          title: ""
        }
      ];
    }
  };
  const dataAlbumServiceMock = {
    albums: (): any => ({
      results: [
        {
          name: "",
          releaseDate
        }
      ],
      total: 1
    }),
    byId: (): any => ({
      name: "",
      releaseDate
    }),
    latest: (): any => ({
      results: [
        {
          name: "",
          releaseDate
        }
      ],
      total: 1
    })
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlbumController],
      // imports: [forwardRef(() => AppModule), ConfigModule.forFeature(config)],
      providers: [
        AlbumService,
        { provide: AppMixArtistService, useValue: appMixArtistServiceMock },
        { provide: AppMixSongService, useValue: appMixSongServiceMock },
        { provide: DataAlbumService, useValue: dataAlbumServiceMock }
      ]
    }).compile();
    albumController = module.get<AlbumController>(AlbumController);
    service = module.get<AlbumService>(AlbumService);
  });

  it("should be defined", () => {
    expect(albumController).toBeDefined();
  });

  it("artistAlbums should return list of albums", async () => {
    const req = {
      artistId: "",
      from: 0,
      limit: 0
    };
    const res = {
      results: [
        {
          name: "",
          releaseDate
        }
      ],
      total: 1
    } as DataPaginationResDto<DataAlbumResDto>;
    jest
      .spyOn(service, "artistAlbums")
      .mockImplementation(() => Promise.resolve(res));
    expect(await albumController.artistAlbums(req, 0, 0)).toEqual(res);
  });

  it("byId should return an album", async () => {
    const req = {
      id: ""
    };
    const res = {
      name: "",
      releaseDate
    };
    jest.spyOn(service, "byId").mockImplementation(() => Promise.resolve(res));
    expect(await albumController.byId(req, 0, 0)).toEqual(res);
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
          releaseDate
        }
      ],
      total: 1
    } as DataPaginationResDto<DataAlbumResDto>;
    jest
      .spyOn(service, "latest")
      .mockImplementation(() => Promise.resolve(res));
    expect(await albumController.latest(req)).toEqual(res);
  });
});
