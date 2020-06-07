import { JWKS_SERVICE, JwksFindOneReqDto, JwksResDto } from "@melo/common";

import { JwksService } from "./jwks.service";
import { Test } from "@nestjs/testing";
import { of } from "rxjs";

describe("JwksService", () => {
  const jwks: JwksResDto = {
    id: "",
    private_key: "",
    public_key: "",
  };

  // TODO: interface ?
  const jwksClientProxyMock = {
    send: () => of(jwks),
  };

  let service: JwksService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        JwksService,
        { provide: JWKS_SERVICE, useValue: jwksClientProxyMock },
      ],
    }).compile();
    service = module.get<JwksService>(JwksService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("findOne should be equal to an jwksEntity", async () => {
    const dto: JwksFindOneReqDto = {
      id: "",
    };
    expect(await service.findOne(dto)).toEqual(jwks);
  });

  it("getOneRandom should be equal to an jwksEntity", async () => {
    expect(await service.getOneRandom()).toEqual(jwks);
  });
});
