import { HttpService } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { of } from "rxjs";
import { DataArtistService } from "./data.artist.service";
import { DataArtistType } from "./data.artist.type";
import config from "./data.config";
import { DataConfigService } from "./data.config.service";
import { DataConfigServiceInterface } from "./data.config.service.interface";
import { DataArtistResDto } from "./dto/res/data.artist.res.dto";
import { DataPaginationResDto } from "./dto/res/data.pagination.res.dto";

describe("DataArtistService", () => {
  const dataConfigServiceMock: DataConfigServiceInterface = {
    timeout: 0,
    url: ""
  };
  it("byId should return an artist", async () => {
    const data = {
      followersCount: 0,
      id: "",
      type: DataArtistType.prime
    };
    // TODO: interface ?
    const artistHttpServiceMock = {
      get: () => ({
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
        DataArtistService,
        { provide: DataConfigService, useValue: dataConfigServiceMock },
        { provide: HttpService, useValue: artistHttpServiceMock }
      ]
    }).compile();
    const service = module.get<DataArtistService>(DataArtistService);
    const httpService = module.get<HttpService>(HttpService);
    const req = {
      id: 0
    };
    const res = {
      followersCount: 0,
      id: "",
      type: DataArtistType.prime
    };
    jest
      .spyOn(httpService, "get")
      .mockImplementationOnce(() => of(artistHttpServiceMock.get()));
    expect(await service.byId(req)).toEqual(res);
  });

  it("byIds should return list of artists", async () => {
    const data = {
      results: [
        {
          followersCount: 0,
          id: "",
          type: DataArtistType.prime
        }
      ],
      total: 1
    };
    // TODO: interface ?
    const artistHttpServiceMock = {
      get: () => ({
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
        DataArtistService,
        { provide: DataConfigService, useValue: dataConfigServiceMock },
        { provide: HttpService, useValue: artistHttpServiceMock }
      ]
    }).compile();
    const service = module.get<DataArtistService>(DataArtistService);
    const httpService = module.get<HttpService>(HttpService);
    const req = {
      ids: []
    };
    const res = {
      results: [
        {
          followersCount: 0,
          id: "",
          type: DataArtistType.prime
        }
      ],
      total: 1
    } as DataPaginationResDto<DataArtistResDto>;
    jest
      .spyOn(httpService, "get")
      .mockImplementationOnce(() => of(artistHttpServiceMock.get()));
    expect(await service.byIds(req)).toEqual(res);
  });

  it("trending should return list of artists", async () => {
    const data = {
      results: [
        {
          followersCount: 0,
          id: "",
          type: DataArtistType.prime
        }
      ],
      total: 1
    };
    // TODO: interface ?
    const artistHttpServiceMock = {
      get: () => ({
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
        DataArtistService,
        { provide: DataConfigService, useValue: dataConfigServiceMock },
        { provide: HttpService, useValue: artistHttpServiceMock }
      ]
    }).compile();
    const service = module.get<DataArtistService>(DataArtistService);
    const httpService = module.get<HttpService>(HttpService);
    const res = {
      results: [
        {
          followersCount: 0,
          id: "",
          type: DataArtistType.prime
        }
      ],
      total: 1
    } as DataPaginationResDto<DataArtistResDto>;
    jest
      .spyOn(httpService, "get")
      .mockImplementationOnce(() => of(artistHttpServiceMock.get()));
    expect(await service.trending()).toEqual(res);
  });

  it("trendingGenre should return list of artists", async () => {
    const data = {
      results: [
        {
          followersCount: 0,
          id: "",
          type: DataArtistType.prime
        }
      ],
      total: 1
    };
    // TODO: interface ?
    const artistHttpServiceMock = {
      get: () => ({
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
        DataArtistService,
        { provide: DataConfigService, useValue: dataConfigServiceMock },
        { provide: HttpService, useValue: artistHttpServiceMock }
      ]
    }).compile();
    const service = module.get<DataArtistService>(DataArtistService);
    const httpService = module.get<HttpService>(HttpService);
    const req = {
      genre: ""
    };
    const res = {
      results: [
        {
          followersCount: 0,
          id: "",
          type: DataArtistType.prime
        }
      ],
      total: 1
    } as DataPaginationResDto<DataArtistResDto>;
    jest
      .spyOn(httpService, "get")
      .mockImplementationOnce(() => of(artistHttpServiceMock.get()));
    expect(await service.trendingGenre(req)).toEqual(res);
  });
});
