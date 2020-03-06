import { forwardRef } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../app/app.module";
import config from "./user.config";
import { UserConfigService } from "./user.config.service";
import { UserEntityRepository } from "./user.entity.repository";
import { UserService } from "./user.service";

describe("UserService", () => {
  let service: UserService;

  // TODO: interface ?
  const userEntityRepositoryMock = {
    find: [
      {
        id: 0
      }
    ],
    findOne: {
      id: 0
    },
    save: {
      id: 0
    }
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [forwardRef(() => AppModule), ConfigModule.forFeature(config)],
      providers: [
        UserConfigService,
        UserService,
        { provide: UserEntityRepository, useValue: userEntityRepositoryMock }
      ]
    }).compile();
    service = module.get<UserService>(UserService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("find should return an array of users", async () => {
    const res = [{ id: 0 }];
    jest.spyOn(service, "find").mockImplementation(() => Promise.resolve(res));

    expect(await service.find()).toBe(res);
  });

  it("findOneById should return a users", async () => {
    const res = { id: 0 };
    jest
      .spyOn(service, "findOneById")
      .mockImplementation(() => Promise.resolve(res));

    expect(await service.findOneById(0)).toBe(res);
  });

  it("findOneByTelegramId should return a users", async () => {
    const res = { id: 0 };
    jest
      .spyOn(service, "findOneByTelegramId")
      .mockImplementation(() => Promise.resolve(res));

    expect(await service.findOneByTelegramId(0)).toBe(res);
  });

  it("get should return a users", async () => {
    const res = { id: 0 };
    jest.spyOn(service, "get").mockImplementation(() => Promise.resolve(res));

    expect(await service.get(0)).toBe(res);
  });

  it("put should return a users", async () => {
    const req = {};
    const res = { id: 0 };
    jest.spyOn(service, "put").mockImplementation(() => Promise.resolve(res));

    expect(await service.put(req, {})).toBe(res);
  });

  it("save should return a users", async () => {
    const reqRes = { id: 0 };
    jest
      .spyOn(service, "save")
      .mockImplementation(() => Promise.resolve(reqRes));

    expect(await service.save(reqRes)).toBe(reqRes);
  });
});
