import { DeleteResult, UpdateResult } from "typeorm";
import { Test, TestingModule } from "@nestjs/testing";

import { RtEntity } from "./rt.entity";
import { RtEntityRepository } from "./rt.entity.repository";
import { RtEntityRepositoryInterface } from "./rt.entity.repository.interface";
import { RtService } from "./rt.service";

describe("RtService", () => {
  const date = new Date();
  const rtEntity: RtEntity = {
    created_at: date,
    description: "",
    expire_at: date,
    id: 0,
    is_blocked: false,
    token: "",
    user_id: 0
  };
  const deleteResult: DeleteResult = {
    raw: ""
  };
  const updateResult: UpdateResult = {
    generatedMaps: [{}],
    raw: ""
  };

  const rtEntityRepositoryMock: RtEntityRepositoryInterface = {
    delete: (): Promise<DeleteResult> => Promise.resolve(deleteResult),
    find: (): Promise<RtEntity[]> => Promise.resolve([rtEntity]),
    findOne: (): Promise<RtEntity | undefined> => Promise.resolve(rtEntity),
    save: <RtEntity>(): Promise<RtEntity> =>
      (Promise.resolve(rtEntity) as unknown) as Promise<RtEntity>,
    update: (): Promise<UpdateResult> => Promise.resolve(updateResult)
  };

  let service: RtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: RtEntityRepository, useValue: rtEntityRepositoryMock },
        RtService
      ]
    }).compile();
    service = module.get<RtService>(RtService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("blockById should be equal to an RT entity", async () => {
    expect(await service.blockById(0, "")).toEqual(rtEntity);
  });

  it("blockByToken should be equal to an RT entity", async () => {
    expect(await service.blockByToken("", "")).toEqual(rtEntity);
  });

  it("deleteById should be equal to an RT entity", async () => {
    expect(await service.deleteById(0)).toEqual(rtEntity);
  });

  it("deleteByToken should be undefined", async () => {
    expect(await service.deleteByToken("")).toBeUndefined();
  });

  it("find should be equal to an array of RT entities", async () => {
    expect(await service.find()).toEqual([rtEntity]);
  });

  it("findOneById should be equal to an RT entity", async () => {
    expect(await service.findOneById(0)).toEqual(rtEntity);
  });

  it("findOneByToken should be equal to an RT entity", async () => {
    expect(await service.findOneByToken("")).toEqual(rtEntity);
  });

  it("save should be equal to an array of RT entities", async () => {
    expect(await service.save(rtEntity)).toEqual(rtEntity);
  });

  it("validateBySub should be equal to an RT entity", async () => {
    expect(await service.validateBySub(0)).toEqual(rtEntity);
  });

  it("validateByToken should be equal to an RT entity", async () => {
    expect(await service.validateByToken("")).toEqual(rtEntity);
  });
});
