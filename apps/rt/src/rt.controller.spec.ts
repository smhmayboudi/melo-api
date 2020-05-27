import {
  RtBlockByTokenReqDto,
  RtBlockReqDto,
  RtDeleteByTokenReqDto,
  RtDeleteReqDto,
  RtFindOneByTokenReqDto,
  RtFindOneReqDto,
  RtResDto,
  RtSaveReqDto,
  RtValidateByTokenReqDto,
  RtValidateReqDto,
} from "@melo/common";
import { Test, TestingModule } from "@nestjs/testing";

import { RtController } from "./rt.controller";
import { RtService } from "./rt.service";
import { RtServiceInterface } from "./rt.service.interface";

describe("RtController", () => {
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

  const atServiceMock: RtServiceInterface = {
    block: (): Promise<RtResDto> => Promise.resolve(rt),
    blockByToken: (): Promise<RtResDto> => Promise.resolve(rt),
    delete: (): Promise<RtResDto> => Promise.resolve(rt),
    deleteByToken: (): Promise<RtResDto> => Promise.resolve(rt),
    find: (): Promise<RtResDto[]> => Promise.resolve([rt]),
    findOne: (): Promise<RtResDto> => Promise.resolve(rt),
    findOneByToken: (): Promise<RtResDto> => Promise.resolve(rt),
    save: (): Promise<RtResDto> => Promise.resolve(rt),
    validate: (): Promise<RtResDto> => Promise.resolve(rt),
    validateByToken: (): Promise<RtResDto> => Promise.resolve(rt),
  };

  let controller: RtController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RtController],
      providers: [{ provide: RtService, useValue: atServiceMock }],
    }).compile();
    controller = module.get<RtController>(RtController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("block should be equal to a rt", async () => {
    const dto: RtBlockReqDto = {
      description: "",
      id: 0,
    };
    expect(await controller.block(dto)).toEqual(rt);
  });

  it("blockByToken should be equal to a rt", async () => {
    const dto: RtBlockByTokenReqDto = {
      description: "",
      token: "",
    };
    expect(await controller.blockByToken(dto)).toEqual(rt);
  });

  it("delete should be equal to a rt", async () => {
    const dto: RtDeleteReqDto = {
      id: 0,
    };
    expect(await controller.delete(dto)).toEqual(rt);
  });

  it("deleteByToken should be equal to a rt", async () => {
    const dto: RtDeleteByTokenReqDto = {
      token: "",
    };
    expect(await controller.deleteByToken(dto)).toEqual(rt);
  });

  it("find should be equal to an ...", async () => {
    expect(await controller.find()).toEqual([rt]);
  });

  it("findOne should be equal to a rt", async () => {
    const dto: RtFindOneReqDto = {
      id: 0,
    };
    expect(await controller.findOne(dto)).toEqual(rt);
  });

  it("findOneByToken should be equal to a rt", async () => {
    const dto: RtFindOneByTokenReqDto = {
      token: "",
    };
    expect(await controller.findOneByToken(dto)).toEqual(rt);
  });

  it("save should be equal to a rt", async () => {
    const dto: RtSaveReqDto = rt;
    expect(await controller.save(dto)).toEqual(rt);
  });

  it("validate should be equal to a rt", async () => {
    const dto: RtValidateReqDto = {
      sub: 1,
    };
    expect(await controller.validate(dto)).toEqual(rt);
  });

  it("validateByToken should be equal to a rt", async () => {
    const dto: RtValidateByTokenReqDto = {
      token: "",
    };
    expect(await controller.validateByToken(dto)).toEqual(rt);
  });
});
