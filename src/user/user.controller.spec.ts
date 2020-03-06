import { CacheModule, forwardRef } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../app/app.module";
import { UserCacheOptionsFactory } from "./user.cache.options.factory";
import config from "./user.config";
import { UserConfigService } from "./user.config.service";
import { UserController } from "./user.controller";
import { UserEntityRepository } from "./user.entity.repository";
import { UserModule } from "./user.module";
import { UserService } from "./user.service";

describe("UserController", () => {
  let controller: UserController;
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
      imports: [
        forwardRef(() => AppModule),
        CacheModule.registerAsync({
          imports: [UserModule],
          useClass: UserCacheOptionsFactory
        }),
        ConfigModule.forFeature(config)
      ],
      controllers: [UserController],
      providers: [
        UserConfigService,
        UserService,
        { provide: UserEntityRepository, useValue: userEntityRepositoryMock }
      ]
    }).compile();
    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("fins hould return an array of users", async () => {
    const res = [
      {
        id: 0
      }
    ];
    jest.spyOn(service, "find").mockImplementation(() => Promise.resolve(res));

    expect(await controller.find()).toEqual(res);
  });

  it("get hould return a users", async () => {
    const res = {
      id: 0
    };
    jest.spyOn(service, "get").mockImplementation(() => Promise.resolve(res));

    expect(await controller.get(0)).toEqual(res);
  });

  it("put hould return a users", async () => {
    const req = {};
    const res = {
      id: 0
    };
    jest.spyOn(service, "put").mockImplementation(() => Promise.resolve(res));

    expect(await controller.edit(req, 0)).toEqual(res);
  });
});
