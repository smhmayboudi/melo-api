import { HttpService } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { DataAlbumService } from "./data.album.service";
import config from "./data.config";
import { DataConfigService } from "./data.config.service";
import { DataAlbumResDto } from "./dto/res/data.album.res.dto";
import { DataPaginationResDto } from "./dto/res/data.pagination.res.dto";

describe("DataAlbumService", () => {
  it("albums should return list of albums", async () => {
    const data = {
      results: {
        name: "",
        releaseDate: new Date()
      },
      total: 1
    };
    const albumsHttpServiceMock = jest.fn(() => ({
      get: jest.fn(() => ({
        data,
        status: 0,
        statusText: "",
        headers: "",
        config: {}
      }))
    }));

    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(config)],
      providers: [
        DataConfigService,
        DataAlbumService,
        { provide: HttpService, useValue: albumsHttpServiceMock }
      ]
    }).compile();
    const service = module.get<DataAlbumService>(DataAlbumService);
    const req = {
      from: 0,
      id: 0,
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
      .spyOn(service, "albums")
      .mockImplementation(() => Promise.resolve(res));

    expect(await service.albums(req)).toBe(res);
  });

  it("byId should return an album", async () => {
    const data = {
      name: "",
      releaseDate: new Date()
    };
    const albumsHttpServiceMock = jest.fn(() => ({
      get: jest.fn(() => ({
        data,
        status: 0,
        statusText: "",
        headers: "",
        config: {}
      }))
    }));

    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(config)],
      providers: [
        DataConfigService,
        DataAlbumService,
        { provide: HttpService, useValue: albumsHttpServiceMock }
      ]
    }).compile();
    const service = module.get<DataAlbumService>(DataAlbumService);
    const req = {
      id: 0
    };
    const res = {
      name: "",
      releaseDate: new Date()
    };
    jest.spyOn(service, "byId").mockImplementation(() => Promise.resolve(res));

    expect(await service.byId(req)).toBe(res);
  });

  it("latest should return list of albums", async () => {
    const data = {
      results: {
        name: "",
        releaseDate: new Date()
      },
      total: 1
    };
    const albumsHttpServiceMock = jest.fn(() => ({
      get: jest.fn(() => ({
        data,
        status: 0,
        statusText: "",
        headers: "",
        config: {}
      }))
    }));

    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(config)],
      providers: [
        DataConfigService,
        DataAlbumService,
        { provide: HttpService, useValue: albumsHttpServiceMock }
      ]
    }).compile();
    const service = module.get<DataAlbumService>(DataAlbumService);
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
      .spyOn(service, "latest")
      .mockImplementation(() => Promise.resolve(res));

    expect(await service.latest(req)).toBe(res);
  });
});
