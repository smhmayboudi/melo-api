import { HttpService } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { DataAlbumService } from "./data.album.service";
import config from "./data.config";
import { DataConfigService } from "./data.config.service";
import { DataAlbumResDto } from "./dto/res/data.album.res.dto";
import { DataPaginationResDto } from "./dto/res/data.pagination.res.dto";
import { of } from "rxjs";

describe("DataAlbumService", () => {
  const releaseDate = new Date();
  const dataConfigServiceMock = {
    url: (): any => ""
  };
  it("albums should return list of albums", async () => {
    const data = {
      results: [
        {
          name: "",
          releaseDate
        }
      ],
      total: 1
    };
    const albumsHttpServiceMock = {
      get: (): any => ({
        data,
        status: 0,
        statusText: "",
        headers: "",
        config: {}
      })
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(config)],
      providers: [
        DataAlbumService,
        { provide: DataConfigService, useValue: dataConfigServiceMock },
        { provide: HttpService, useValue: albumsHttpServiceMock }
      ]
    }).compile();
    const service = module.get<DataAlbumService>(DataAlbumService);
    const httpService = module.get<HttpService>(HttpService);
    const req = {
      from: 0,
      id: 0,
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
      .spyOn(httpService, "get")
      .mockImplementationOnce(() => of(albumsHttpServiceMock.get()));
    expect(await service.albums(req)).toEqual(res);
  });

  it("byId should return an album", async () => {
    const data = {
      name: "",
      releaseDate
    };
    const albumsHttpServiceMock = {
      get: (): any => ({
        data,
        status: 0,
        statusText: "",
        headers: "",
        config: {}
      })
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(config)],
      providers: [
        DataAlbumService,
        { provide: DataConfigService, useValue: dataConfigServiceMock },
        { provide: HttpService, useValue: albumsHttpServiceMock }
      ]
    }).compile();
    const service = module.get<DataAlbumService>(DataAlbumService);
    const httpService = module.get<HttpService>(HttpService);
    const req = {
      id: 0
    };
    const res = {
      name: "",
      releaseDate
    };
    jest
      .spyOn(httpService, "get")
      .mockImplementationOnce(() => of(albumsHttpServiceMock.get()));
    expect(await service.byId(req)).toEqual(res);
  });

  it("latest should return list of albums", async () => {
    const data = {
      results: [
        {
          name: "",
          releaseDate
        }
      ],
      total: 1
    };
    const albumsHttpServiceMock = {
      get: (): any => ({
        data,
        status: 0,
        statusText: "",
        headers: "",
        config: {}
      })
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(config)],
      providers: [
        DataAlbumService,
        { provide: DataConfigService, useValue: dataConfigServiceMock },
        { provide: HttpService, useValue: albumsHttpServiceMock }
      ]
    }).compile();
    const service = module.get<DataAlbumService>(DataAlbumService);
    const httpService = module.get<HttpService>(HttpService);
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
      .spyOn(httpService, "get")
      .mockImplementationOnce(() => of(albumsHttpServiceMock.get()));
    expect(await service.latest(req)).toEqual(res);
  });
});
