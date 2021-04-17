import { JwksFindOneReqDto, JwksResDto } from "@melo/common";

import { JwksController } from "./jwks.controller";
import { JwksService } from "./jwks.service";
import { JwksServiceInterface } from "./jwks.service.interface";
import { Test } from "@nestjs/testing";

describe("JwksController", () => {
  const jwks: JwksResDto = {
    id: "",
    private_key: "",
    public_key: "",
  };

  const jwksServiceMock: JwksServiceInterface = {
    findOne: () => Promise.resolve(jwks),
    getOneRandom: () => Promise.resolve(jwks),
  };

  let controller: JwksController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
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
    expect(await controller.findOne(dto)).toEqual(jwks);
  });

  it("getOneRandom should be equal to an jwksEntity", async () => {
    expect(await controller.getOneRandom()).toEqual(jwks);
  });
});
