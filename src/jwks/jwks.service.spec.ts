import { forwardRef } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../app/app.module";
import config from "./jwks.config";
import { JwksEntity } from "./jwks.entity";
import { JwksEntityRepository } from "./jwks.entity.repository";
import { JwksService } from "./jwks.service";

describe("JwksService", () => {
  const jwks: JwksEntity = {
    id: "",
    public_key: "",
    private_key: ""
  };

  let service: JwksService;

  // TODO: iinterface ?
  const jwksEntityRepositoryMock = {
    findOne: () => jwks,
    getOne: () => jwks
  };

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

    expect(await service.findOneById("")).toEqual(res);
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

    expect(await service.getOneRandom()).toEqual(res);
  });
});
