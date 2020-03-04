import { forwardRef } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../app/app.module";
import config from "./jwks.config";
import { JwksEntityRepository } from "./jwks.entity.repository";
import { JwksService } from "./jwks.service";

describe("JwksService", () => {
  let service: JwksService;

  const jwksEntityRepositoryMock = jest.fn(() => ({
    findOne: {
      id: "",
      public_key: "",
      private_key: ""
    },
    getOne: {
      id: "",
      public_key: "",
      private_key: ""
    }
  }));

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [forwardRef(() => AppModule), ConfigModule.forFeature(config)],
      providers: [
        JwksService,
        { provide: JwksEntityRepository, useValue: jwksEntityRepositoryMock }
      ]
    }).compile();
    service = module.get<JwksService>(JwksService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("findOneById should return an jwksEntity", async () => {
    const res = {
      id: "",
      public_key: "",
      private_key: ""
    };
    jest
      .spyOn(service, "findOneById")
      .mockImplementation(() => Promise.resolve(res));

    expect(await service.findOneById("")).toBe(res);
  });

  it("getOneRandom should return an jwksEntity", async () => {
    const res = {
      id: "",
      public_key: "",
      private_key: ""
    };
    jest
      .spyOn(service, "getOneRandom")
      .mockImplementation(() => Promise.resolve(res));

    expect(await service.getOneRandom()).toBe(res);
  });
});
