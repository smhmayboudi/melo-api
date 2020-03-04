import { HttpService } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { DataArtistService } from "./data.artist.service";
import { DataArtistType } from "./data.artist.type";
import config from "./data.config";
import { DataConfigService } from "./data.config.service";
import { DataArtistResDto } from "./dto/res/data.artist.res.dto";
import { DataPaginationResDto } from "./dto/res/data.pagination.res.dto";

describe("DataArtistService", () => {
  it("byId should return an artist", async () => {
    const data = {
      followersCount: 0,
      id: "",
      type: DataArtistType.prime
    };
    const artistHttpServiceMock = jest.fn(() => ({
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
        DataArtistService,
        { provide: HttpService, useValue: artistHttpServiceMock }
      ]
    }).compile();
    const service = module.get<DataArtistService>(DataArtistService);
    const req = {
      id: 0
    };
    const res = {
      followersCount: 0,
      id: "",
      type: DataArtistType.prime
    };
    jest.spyOn(service, "byId").mockImplementation(() => Promise.resolve(res));

    expect(await service.byId(req)).toBe(res);
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
    const artistHttpServiceMock = jest.fn(() => ({
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
        DataArtistService,
        { provide: HttpService, useValue: artistHttpServiceMock }
      ]
    }).compile();
    const service = module.get<DataArtistService>(DataArtistService);
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
    jest.spyOn(service, "byIds").mockImplementation(() => Promise.resolve(res));

    expect(await service.byIds(req)).toBe(res);
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
    const artistHttpServiceMock = jest.fn(() => ({
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
        DataArtistService,
        { provide: HttpService, useValue: artistHttpServiceMock }
      ]
    }).compile();
    const service = module.get<DataArtistService>(DataArtistService);
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
      .spyOn(service, "trending")
      .mockImplementation(() => Promise.resolve(res));

    expect(await service.trending()).toBe(res);
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
    const artistHttpServiceMock = jest.fn(() => ({
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
        DataArtistService,
        { provide: HttpService, useValue: artistHttpServiceMock }
      ]
    }).compile();
    const service = module.get<DataArtistService>(DataArtistService);
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
      .spyOn(service, "trendingGenre")
      .mockImplementation(() => Promise.resolve(res));

    expect(await service.trendingGenre(req)).toBe(res);
  });
});
