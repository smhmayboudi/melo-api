import {
  RT_SERVICE,
  RT_SERVICE_FIND,
  RtBlockByTokenReqDto,
  RtBlockReqDto,
  RtDeleteReqDto,
  RtFindOneByTokenReqDto,
  RtFindOneReqDto,
  RtResDto,
  RtSaveReqDto,
  RtValidateByTokenReqDto,
  RtValidateReqDto,
} from "@melo/common";

import { RtService } from "./rt.service";
import { Test } from "@nestjs/testing";
import { of } from "rxjs";

describe("RtService", () => {
  const date = new Date();
  const rt: RtResDto = {
    created_at: date,
    description: "",
    expire_at: date,
    id: 0,
    is_blocked: false,
    token: "",
    user_id: 0,
  };

  // TODO: interface ?
  const rtClientProxyMock = {
    send: (token: string) => (token === RT_SERVICE_FIND ? of([rt]) : of(rt)),
  };

  let service: RtService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        RtService,
        { provide: RT_SERVICE, useValue: rtClientProxyMock },
      ],
    }).compile();
    service = module.get<RtService>(RtService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("block should be equal to an rt", async () => {
    const dto: RtBlockReqDto = {
      description: "",
      id: 0,
    };
    expect(await service.block(dto)).toEqual(rt);
  });

  it("blockByToken should be equal to an rt", async () => {
    const dto: RtBlockByTokenReqDto = {
      description: "",
      token: "",
    };
    expect(await service.blockByToken(dto)).toEqual(rt);
  });

  it("delete should be equal to an rt", async () => {
    const dto: RtDeleteReqDto = {
      id: 0,
    };
    expect(await service.delete(dto)).toEqual(rt);
  });

  it("find should be equal to an array of RT entities", async () => {
    expect(await service.find()).toEqual([rt]);
  });

  it("findOne should be equal to an rt", async () => {
    const dto: RtFindOneReqDto = {
      id: 0,
    };
    expect(await service.findOne(dto)).toEqual(rt);
  });

  it("findOneByToken should be equal to an rt", async () => {
    const dto: RtFindOneByTokenReqDto = {
      token: "",
    };
    expect(await service.findOneByToken(dto)).toEqual(rt);
  });

  it("save should be equal to an array of RT entities", async () => {
    const dto: RtSaveReqDto = rt;
    expect(await service.save(dto)).toEqual(rt);
  });

  it("validate should be equal to an rt", async () => {
    const dto: RtValidateReqDto = {
      sub: 1,
    };
    expect(await service.validate(dto)).toEqual(rt);
  });

  it("validateByToken should be equal to an rt", async () => {
    const dto: RtValidateByTokenReqDto = {
      token: "",
    };
    expect(await service.validateByToken(dto)).toEqual(rt);
  });
});
