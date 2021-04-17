import {
  AtDeleteByTokenReqDto,
  AtDeleteReqDto,
  AtFindOneByTokenReqDto,
  AtFindOneReqDto,
  AtSaveReqDto,
  AtUpdateReqDto,
  AtValidateByTokenReqDto,
  AtValidateReqDto,
} from "@melo/common";
import { DeleteResult, UpdateResult } from "typeorm";

import { AtEntity } from "./at.entity";
import { AtEntityRepository } from "./at.entity.repository";
import { AtEntityRepositoryInterface } from "./at.entity.repository.interface";
import { AtService } from "./at.service";
import { Test } from "@nestjs/testing";

describe("AtService", () => {
  const date = new Date();
  const atEntity: AtEntity = {
    count: 0,
    created_at: date,
    expire_at: date,
    id: 0,
    token: "",
    user_id: 0,
  };
  const deleteResult: DeleteResult = {
    raw: "",
  };
  const updateResult: UpdateResult = {
    generatedMaps: [{}],
    raw: "",
  };

  const atEntityRepositoryMock: AtEntityRepositoryInterface = {
    delete: () => Promise.resolve(deleteResult),
    find: () => Promise.resolve([atEntity]),
    findOne: () => Promise.resolve(atEntity),
    save: <AtEntity>(): Promise<AtEntity> =>
      (Promise.resolve(atEntity) as unknown) as Promise<AtEntity>,
    update: () => Promise.resolve(updateResult),
  };

  let service: AtService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AtService,
        { provide: AtEntityRepository, useValue: atEntityRepositoryMock },
      ],
    }).compile();
    service = module.get<AtService>(AtService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("delete should be equal to an at", async () => {
    const dto: AtDeleteReqDto = { id: 0 };
    expect(await service.delete(dto)).toEqual(atEntity);
  });

  it("deleteByToken should be equal to an at", async () => {
    const dto: AtDeleteByTokenReqDto = { token: "0" };
    expect(await service.deleteByToken(dto)).toEqual(atEntity);
  });

  it("find should be equal to an ...", async () => {
    expect(await service.find()).toEqual([atEntity]);
  });

  it("findOne should be equal to an at", async () => {
    const dto: AtFindOneReqDto = { id: 0 };
    expect(await service.findOne(dto)).toEqual(atEntity);
  });

  it("findOneByToken should be equal to an at", async () => {
    const dto: AtFindOneByTokenReqDto = { token: "0" };
    expect(await service.findOneByToken(dto)).toEqual(atEntity);
  });

  it("save should be equal to an at", async () => {
    const dto: AtSaveReqDto = atEntity;
    expect(await service.save(dto)).toEqual(atEntity);
  });

  it("update should be equal to an at", async () => {
    const dto: AtUpdateReqDto = atEntity;
    expect(await service.update(dto)).toEqual(atEntity);
  });

  it("validate should be equal to an at", async () => {
    const dto: AtValidateReqDto = {
      sub: 1,
    };
    expect(await service.validate(dto)).toEqual(atEntity);
  });

  it("validateByToken should be equal to an at", async () => {
    const dto: AtValidateByTokenReqDto = { token: "0" };
    expect(await service.validateByToken(dto)).toEqual(atEntity);
  });
});
