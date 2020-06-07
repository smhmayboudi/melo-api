import {
  AT_SERVICE,
  AT_SERVICE_FIND,
  AtDeleteByTokenReqDto,
  AtDeleteReqDto,
  AtFindOneByTokenReqDto,
  AtFindOneReqDto,
  AtResDto,
  AtSaveReqDto,
  AtUpdateReqDto,
  AtValidateByTokenReqDto,
  AtValidateReqDto,
} from "@melo/common";

import { AtService } from "./at.service";
import { Test } from "@nestjs/testing";
import { of } from "rxjs";

describe("AtService", () => {
  const date = new Date();
  const at: AtResDto = {
    count: 0,
    created_at: date,
    expire_at: date,
    id: 0,
    token: "",
    user_id: 0,
  };

  // TODO: interface ?
  const atClientProxyMock = {
    send: (token: string) => (token === AT_SERVICE_FIND ? of([at]) : of(at)),
  };

  let service: AtService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AtService,
        { provide: AT_SERVICE, useValue: atClientProxyMock },
      ],
    }).compile();
    service = module.get<AtService>(AtService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("delete should be equal to delete result", async () => {
    const dto: AtDeleteReqDto = {
      id: 0,
    };
    expect(await service.delete(dto)).toEqual(at);
  });

  it("deleteByToken should be equal to delete result", async () => {
    const dto: AtDeleteByTokenReqDto = {
      token: "",
    };
    expect(await service.deleteByToken(dto)).toEqual(at);
  });

  it("find sholud equal to array of at", async () => {
    expect(await service.find()).toEqual([at]);
  });

  it("findOne should be equal to an at", async () => {
    const dto: AtFindOneReqDto = {
      id: 0,
    };
    expect(await service.findOne(dto)).toEqual(at);
  });

  it("findOneByToken should be equal to an at", async () => {
    const dto: AtFindOneByTokenReqDto = {
      token: "",
    };
    expect(await service.findOneByToken(dto)).toEqual(at);
  });

  it("save should be equal to an at", async () => {
    const dto: AtSaveReqDto = at;
    expect(await service.save(dto)).toEqual(at);
  });

  it("update should be equal to update result", async () => {
    const dto: AtUpdateReqDto = at;
    expect(await service.update(dto)).toEqual(at);
  });

  it("validateByToken should be equal to an at", async () => {
    const dto: AtValidateByTokenReqDto = {
      token: "",
    };
    expect(await service.validateByToken(dto)).toEqual(at);
  });

  it("validate should be equal to an at", async () => {
    const dto: AtValidateReqDto = {
      sub: 1,
    };
    expect(await service.validate(dto)).toEqual(at);
  });
});
