import { forwardRef } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../app/app.module";
import { DataAlbumService } from "../data/data.album.service";
import { DataAlbumResDto } from "../data/dto/res/data.album.res.dto";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import config from "./album.config";
import { AlbumController } from "./album.controller";
import { AlbumService } from "./album.service";

describe("AlbumController", () => {
  let albumController: AlbumController;
  let albumService: AlbumService;

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

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlbumController],
      imports: [forwardRef(() => AppModule), ConfigModule.forFeature(config)],
      providers: [
        AlbumService,
        { provide: DataAlbumService, useValue: dataAlbumServiceMock }
      ]
    }).compile();

    albumService = module.get<AlbumService>(AlbumService);
    albumController = module.get<AlbumController>(AlbumController);
  });

  it("should be defined", () => {
    expect(albumController).toBeDefined();
  });

  it("artistAlbums should return list of albums", async () => {
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

    expect(await albumController.artistAlbums(req, 0, 0)).toBe(res);
  });

  it("byId should return an album", async () => {
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

    expect(await albumController.byId(req, 0, 0)).toBe(res);
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

    expect(await albumController.latest(req)).toBe(res);
  });
});
