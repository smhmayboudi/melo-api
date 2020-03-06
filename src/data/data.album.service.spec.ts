import { HttpService } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { of } from "rxjs";
import { DataAlbumService } from "./data.album.service";
import config from "./data.config";
import { DataConfigService } from "./data.config.service";
import { DataConfigServiceInterface } from "./data.config.service.interface";
import { DataAlbumResDto } from "./dto/res/data.album.res.dto";
import { DataPaginationResDto } from "./dto/res/data.pagination.res.dto";

describe("DataAlbumService", () => {
  const releaseDate = new Date();
  const dataConfigServiceMock: DataConfigServiceInterface = {
    timeout: 0,
    url: ""
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
    // TODO: interface ?
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
    // TODO: interface ?
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
    // TODO: interface ?
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
