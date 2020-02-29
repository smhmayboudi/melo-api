import { HttpService } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import config from "./relation.config";
import { RelationConfigService } from "./relation.config.service";
import { RelationEntityType } from "./relation.entity.type";
import { RelationService } from "./relation.service";
import { RelationType } from "./relation.type";
import { RelationEntityResDto } from "./dto/res/relation.entity.res.dto";
import { RelationPaginationResDto } from "./dto/res/relation.pagination.res.dto";

describe("RelationService", () => {
  it("get should return a list of relation entities", async () => {
    const data = {
      results: [
        {
          id: "",
          type: RelationEntityType.album
        }
      ],
      total: 1
    } as RelationPaginationResDto<RelationEntityResDto>;
    const relationHttpServiceMock = jest.fn(() => ({
      get: {
        data,
        status: 0,
        statusText: "",
        headers: "",
        config: {}
      }
    }));
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(config)],
      providers: [
        RelationConfigService,
        RelationService,
        { provide: HttpService, useValue: relationHttpServiceMock }
      ]
    }).compile();

    const service = module.get<RelationService>(RelationService);
    const req = {
      from: 0,
      fromEntityDto: {
        id: "",
        type: RelationEntityType.album
      },
      limit: 0,
      relationType: RelationType.follows
    };
    jest.spyOn(service, "get").mockImplementation(() => Promise.resolve(data));

    expect(await service.get(req)).toBe(data);
  });

  it("has should be defined", async () => {
    const data = false;
    const relationHttpServiceMock = jest.fn(() => ({
      get: {
        data,
        status: 0,
        statusText: "",
        headers: "",
        config: {}
      }
    }));
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(config)],
      providers: [
        RelationConfigService,
        RelationService,
        { provide: HttpService, useValue: relationHttpServiceMock }
      ]
    }).compile();

    const service = module.get<RelationService>(RelationService);
    const req = {
      from: { id: "", type: RelationEntityType.album },
      to: { id: "", type: RelationEntityType.album },
      relationType: RelationType.follows
    };
    jest
      .spyOn(service, "has")
      .mockImplementation(() => Promise.resolve(undefined));

    expect(await service.has(req)).toBe(undefined);
  });

  it("multiHas should return an array of relation entities ", async () => {
    const data = [
      {
        from: { id: "", type: RelationEntityType.album },
        to: { id: "", type: RelationEntityType.album },
        relation: RelationType.follows
      }
    ];
    const relationHttpServiceMock = jest.fn(() => ({
      get: {
        data,
        status: 0,
        statusText: "",
        headers: "",
        config: {}
      }
    }));
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(config)],
      providers: [
        RelationConfigService,
        RelationService,
        { provide: HttpService, useValue: relationHttpServiceMock }
      ]
    }).compile();

    const service = module.get<RelationService>(RelationService);
    const req = {
      from: { id: "", type: RelationEntityType.album },
      tos: [{ id: "", type: RelationEntityType.album }],
      relationType: RelationType.follows
    };
    jest
      .spyOn(service, "multiHas")
      .mockImplementation(() => Promise.resolve(data));

    expect(await service.multiHas(req)).toBe(data);
  });

  it("remove should be defined", async () => {
    const data = false;
    const relationHttpServiceMock = jest.fn(() => ({
      get: {
        data,
        status: 0,
        statusText: "",
        headers: "",
        config: {}
      }
    }));
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(config)],
      providers: [
        RelationConfigService,
        RelationService,
        { provide: HttpService, useValue: relationHttpServiceMock }
      ]
    }).compile();

    const service = module.get<RelationService>(RelationService);
    const req = {
      from: { id: "", type: RelationEntityType.album },
      to: { id: "", type: RelationEntityType.album },
      relationType: RelationType.follows
    };
    jest
      .spyOn(service, "remove")
      .mockImplementation(() => Promise.resolve(undefined));

    expect(await service.remove(req)).toBe(undefined);
  });

  it("set should be defined", async () => {
    const data = false;
    const relationHttpServiceMock = jest.fn(() => ({
      get: {
        data,
        status: 0,
        statusText: "",
        headers: "",
        config: {}
      }
    }));
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(config)],
      providers: [
        RelationConfigService,
        RelationService,
        { provide: HttpService, useValue: relationHttpServiceMock }
      ]
    }).compile();

    const service = module.get<RelationService>(RelationService);
    const req = {
      createdAt: new Date(),
      from: { id: "", type: RelationEntityType.album },
      to: { id: "", type: RelationEntityType.album },
      relationType: RelationType.follows
    };
    jest
      .spyOn(service, "set")
      .mockImplementation(() => Promise.resolve(undefined));

    expect(await service.set(req)).toBe(undefined);
  });
});
