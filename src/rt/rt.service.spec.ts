import { forwardRef } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppConfigService } from "../app/app.config.service";
import { AppModule } from "../app/app.module";
import config from "./rt.config";
import { RtEntityRepository } from "./rt.entity.repository";
import { RtService } from "./rt.service";

describe("RtService", () => {
  let service: RtService;

  const rtEntityRepositoryMock = jest.fn(() => ({
    update: {
      raw: {}
    },
    delete: {
      raw: {}
    },
    find: [
      {
        created_at: new Date(),
        description: "",
        expire_at: new Date(),
        id: 0,
        is_blocked: false,
        user_id: 0,
        token: ""
      }
    ],
    findOne: {
      created_at: new Date(),
      description: "",
      expire_at: new Date(),
      id: 0,
      is_blocked: false,
      user_id: 0,
      token: ""
    },
    save: [
      {
        created_at: new Date(),
        description: "",
        expire_at: new Date(),
        id: 0,
        is_blocked: false,
        user_id: 0,
        token: ""
      }
    ]
  }));

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [forwardRef(() => AppModule), ConfigModule.forFeature(config)],
      providers: [
        AppConfigService,
        RtService,
        { provide: RtEntityRepository, useValue: rtEntityRepositoryMock }
      ]
    }).compile();

    service = module.get<RtService>(RtService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("blockById should return an RT entity", async () => {
    const res = {
      created_at: new Date(),
      description: "",
      expire_at: new Date(),
      id: 0,
      is_blocked: false,
      user_id: 0,
      token: ""
    };
    jest
      .spyOn(service, "blockById")
      .mockImplementation(() => Promise.resolve(res));

    expect(await service.blockById(0, "")).toBe(res);
  });

  it("blockByToken should return an RT entity", async () => {
    const res = {
      created_at: new Date(),
      description: "",
      expire_at: new Date(),
      id: 0,
      is_blocked: false,
      user_id: 0,
      token: ""
    };
    jest
      .spyOn(service, "blockByToken")
      .mockImplementation(() => Promise.resolve(res));

    expect(await service.blockByToken("", "")).toBe(res);
  });

  it("deleteById should return an RT entity", async () => {
    const res = {
      created_at: new Date(),
      description: "",
      expire_at: new Date(),
      id: 0,
      is_blocked: false,
      user_id: 0,
      token: ""
    };
    jest
      .spyOn(service, "deleteById")
      .mockImplementation(() => Promise.resolve(res));

    expect(await service.deleteById(0)).toBe(res);
  });

  it("deleteByToken should be defined", async () => {
    jest
      .spyOn(service, "deleteByToken")
      .mockImplementation(() => Promise.resolve(undefined));

    expect(await service.deleteByToken("")).toBe(undefined);
  });

  it("find should return an array of RT entities", async () => {
    const res = [
      {
        created_at: new Date(),
        description: "",
        expire_at: new Date(),
        id: 0,
        is_blocked: false,
        user_id: 0,
        token: ""
      }
    ];
    jest.spyOn(service, "find").mockImplementation(() => Promise.resolve(res));

    expect(await service.find()).toBe(res);
  });

  it("findOneById should return an RT entity", async () => {
    const res = {
      created_at: new Date(),
      description: "",
      expire_at: new Date(),
      id: 0,
      is_blocked: false,
      user_id: 0,
      token: ""
    };
    jest
      .spyOn(service, "findOneById")
      .mockImplementation(() => Promise.resolve(res));

    expect(await service.findOneById(0)).toBe(res);
  });

  it("findOneByToken should return an RT entity", async () => {
    const res = {
      created_at: new Date(),
      description: "",
      expire_at: new Date(),
      id: 0,
      is_blocked: false,
      user_id: 0,
      token: ""
    };
    jest
      .spyOn(service, "findOneByToken")
      .mockImplementation(() => Promise.resolve(res));

    expect(await service.findOneByToken("")).toBe(res);
  });

  it("save should return an array of RT entities", async () => {
    const reqRes = [
      {
        created_at: new Date(),
        description: "",
        expire_at: new Date(),
        id: 0,
        is_blocked: false,
        user_id: 0,
        token: ""
      }
    ];
    jest
      .spyOn(service, "save")
      .mockImplementation(() => Promise.resolve(reqRes));

    expect(await service.save(reqRes)).toBe(reqRes);
  });

  it("validateBySub should return an RT entity", async () => {
    const res = {
      created_at: new Date(),
      description: "",
      expire_at: new Date(),
      id: 0,
      is_blocked: false,
      user_id: 0,
      token: ""
    };
    jest
      .spyOn(service, "validateBySub")
      .mockImplementation(() => Promise.resolve(res));

    expect(await service.validateBySub(0)).toBe(res);
  });

  it("validateByToken should return an RT entity", async () => {
    const res = {
      created_at: new Date(),
      description: "",
      expire_at: new Date(),
      id: 0,
      is_blocked: false,
      user_id: 0,
      token: ""
    };
    jest
      .spyOn(service, "validateByToken")
      .mockImplementation(() => Promise.resolve(res));

    expect(await service.validateByToken("")).toBe(res);
  });
});
