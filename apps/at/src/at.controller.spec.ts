import {
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

import { AtController } from "./at.controller";
import { AtService } from "./at.service";
import { AtServiceInterface } from "./at.service.interface";
import { Test } from "@nestjs/testing";

describe("AtController", () => {
  const date = new Date();
  const at: AtResDto = {
    count: 0,
    created_at: date,
    expire_at: date,
    id: 0,
    token: "",
    user_id: 0,
  };

  const atServiceMock: AtServiceInterface = {
    delete: () => Promise.resolve(at),
    deleteByToken: () => Promise.resolve(at),
    find: () => Promise.resolve([at]),
    findOne: () => Promise.resolve(at),
    findOneByToken: () => Promise.resolve(at),
    save: () => Promise.resolve(at),
    update: () => Promise.resolve(at),
    validate: () => Promise.resolve(at),
    validateByToken: () => Promise.resolve(at),
  };

  let controller: AtController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AtController],
      providers: [{ provide: AtService, useValue: atServiceMock }],
    }).compile();
    controller = module.get<AtController>(AtController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("delete should be equal to an at", async () => {
    const dto: AtDeleteReqDto = { id: 0 };
    expect(await controller.delete(dto)).toEqual(at);
  });

  it("deleteByToken should be equal to an at", async () => {
    const dto: AtDeleteByTokenReqDto = { token: "0" };
    expect(await controller.deleteByToken(dto)).toEqual(at);
  });

  it("find should be equal to an ...", async () => {
    expect(await controller.find()).toEqual([at]);
  });

  it("findOne should be equal to an at", async () => {
    const dto: AtFindOneReqDto = { id: 0 };
    expect(await controller.findOne(dto)).toEqual(at);
  });

  it("findOneByToken should be equal to an at", async () => {
    const dto: AtFindOneByTokenReqDto = { token: "0" };
    expect(await controller.findOneByToken(dto)).toEqual(at);
  });

  it("save should be equal to an at", async () => {
    const dto: AtSaveReqDto = at;
    expect(await controller.save(dto)).toEqual(at);
  });

  it("update should be equal to an at", async () => {
    const dto: AtUpdateReqDto = at;
    expect(await controller.update(dto)).toEqual(at);
  });

  it("validate should be equal to an at", async () => {
    const dto: AtValidateReqDto = {
      sub: 1,
    };
    expect(await controller.validate(dto)).toEqual(at);
  });

  it("validateByToken should be equal to an at", async () => {
    const dto: AtValidateByTokenReqDto = { token: "0" };
    expect(await controller.validateByToken(dto)).toEqual(at);
  });
});
