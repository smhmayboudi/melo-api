import { forwardRef } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../app/app.module";
import config from "./at.config";
import { AtEntityRepository } from "./at.entity.repository";
import { AtService } from "./at.service";

describe("AtService", () => {
  let service: AtService;

  const atEntityRepositoryMock = jest.fn(() => ({
    delete: {
      raw: ""
    },
    find: [
      {
        count: 0,
        created_at: new Date(),
        expire_at: new Date(),
        id: 0,
        user_id: 0,
        token: ""
      }
    ],
    findOne: {
      count: 0,
      created_at: new Date(),
      expire_at: new Date(),
      id: 0,
      user_id: 0,
      token: ""
    },
    save: {
      count: 0,
      created_at: new Date(),
      expire_at: new Date(),
      id: 0,
      user_id: 0,
      token: ""
    },
    update: {
      raw: "",
      generatedMaps: [
        {
          "": ""
        }
      ]
    }
  }));

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        forwardRef(() => AppModule),
        ConfigModule.forFeature(config)
        // TypeOrmModule.forFeature([AtEntityRepository])
      ],
      providers: [
        AtService,
        { provide: AtEntityRepository, useValue: atEntityRepositoryMock }
      ]
    }).compile();

    service = module.get<AtService>(AtService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("deleteById should be defined", async () => {
    const res = {
      raw: ""
    };
    jest
      .spyOn(service, "deleteById")
      .mockImplementation(() => Promise.resolve(res));

    expect(await service.deleteById(0)).toBe(res);
  });

  it("deleteByToken should be defined", async () => {
    const res = {
      raw: ""
    };
    jest
      .spyOn(service, "deleteByToken")
      .mockImplementation(() => Promise.resolve(res));

    expect(await service.deleteByToken("")).toBe(res);
  });

  it("find shoud be defined", async () => {
    const res = [
      {
        count: 0,
        created_at: new Date(),
        expire_at: new Date(),
        id: 0,
        user_id: 0,
        token: ""
      }
    ];
    jest.spyOn(service, "find").mockImplementation(() => Promise.resolve(res));

    expect(await service.find()).toBe(res);
  });

  it("findOneById should be defined", async () => {
    const res = {
      count: 0,
      created_at: new Date(),
      expire_at: new Date(),
      id: 0,
      user_id: 0,
      token: ""
    };
    jest
      .spyOn(service, "findOneById")
      .mockImplementation(() => Promise.resolve(res));

    expect(await service.findOneById(0)).toBe(res);
  });

  it("findOneByToken should be defined", async () => {
    const res = {
      count: 0,
      created_at: new Date(),
      expire_at: new Date(),
      id: 0,
      user_id: 0,
      token: ""
    };
    jest
      .spyOn(service, "findOneByToken")
      .mockImplementation(() => Promise.resolve(res));

    expect(await service.findOneByToken("")).toBe(res);
  });

  it("save should be defined", async () => {
    const reqRes = {
      count: 0,
      created_at: new Date(),
      expire_at: new Date(),
      id: 0,
      user_id: 0,
      token: ""
    };
    jest
      .spyOn(service, "save")
      .mockImplementation(() => Promise.resolve(reqRes));

    expect(await service.save(reqRes)).toBe(reqRes);
  });

  it("update should be defined", async () => {
    const req = {
      count: 0,
      created_at: new Date(),
      expire_at: new Date(),
      id: 0,
      user_id: 0,
      token: ""
    };
    const res = {
      raw: "",
      generatedMaps: [
        {
          "": ""
        }
      ]
    };
    jest
      .spyOn(service, "update")
      .mockImplementation(() => Promise.resolve(res));

    expect(await service.update(req)).toBe(res);
  });

  it("validateBySub should be defined", async () => {
    const res = {
      count: 0,
      created_at: new Date(),
      expire_at: new Date(),
      id: 0,
      user_id: 0,
      token: ""
    };
    jest
      .spyOn(service, "validateBySub")
      .mockImplementation(() => Promise.resolve(res));

    expect(await service.validateBySub(0)).toBe(res);
  });

  it("validateByToken should be defined", async () => {
    const res = {
      count: 0,
      created_at: new Date(),
      expire_at: new Date(),
      id: 0,
      user_id: 0,
      token: ""
    };
    jest
      .spyOn(service, "validateByToken")
      .mockImplementation(() => Promise.resolve(res));

    expect(await service.validateByToken("")).toBe(res);
  });
});
