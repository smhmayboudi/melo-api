import { Test, TestingModule } from "@nestjs/testing";
import { JwksEntity } from "./jwks.entity";
import { JwksEntityRepository } from "./jwks.entity.repository";
import { JwksEntityRepositoryInterface } from "./jwks.entity.repository.interface";
import { JwksService } from "./jwks.service";

describe("JwksService", () => {
  const jwksEntity: JwksEntity = {
    id: "",
    public_key: "",
    private_key: ""
  };

  const jwksEntityRepositoryMock: JwksEntityRepositoryInterface = {
    findOne: (): Promise<JwksEntity | undefined> => Promise.resolve(jwksEntity),
    getOneRandom: (): Promise<JwksEntity | undefined> =>
      Promise.resolve(jwksEntity)
  };

  let service: JwksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

  it("findOneById should be equal to an jwksEntity", async () => {
    expect(await service.findOneById("")).toEqual(jwksEntity);
  });

  it("getOneRandom should be equal to an jwksEntity", async () => {
    expect(await service.getOneRandom()).toEqual(jwksEntity);
  });
});
