import { JwksFindOneReqDto, JwksResDto } from "@melo/common";
import { Test, TestingModule } from "@nestjs/testing";

import { JwksController } from "./jwks.controller";
import { JwksEntity } from "./jwks.entity";
import { JwksService } from "./jwks.service";
import { JwksServiceInterface } from "./jwks.service.interface";

describe("JwksController", () => {
  const jwksEntity: JwksEntity = {
    id: "",
    private_key: "",
    public_key: "",
  };

  const jwksServiceMock: JwksServiceInterface = {
    findOne: (): Promise<JwksResDto | undefined> => Promise.resolve(jwksEntity),
    getOneRandom: (): Promise<JwksResDto | undefined> =>
      Promise.resolve(jwksEntity),
  };

  let controller: JwksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JwksController],
      providers: [
        {
          provide: JwksService,
          useValue: jwksServiceMock,
        },
      ],
    }).compile();
    controller = module.get<JwksController>(JwksController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("findOne should be equal to an jwksEntity", async () => {
    const dto: JwksFindOneReqDto = {
      id: "",
    };
    expect(await controller.findOne(dto)).toEqual(jwksEntity);
  });

  it("getOneRandom should be equal to an jwksEntity", async () => {
    expect(await controller.getOneRandom()).toEqual(jwksEntity);
  });
});
