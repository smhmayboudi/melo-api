import { Test, TestingModule } from "@nestjs/testing";
import { DeleteResult, UpdateResult } from "typeorm";
import { AtEntity } from "./at.entity";
import { AtEntityRepository } from "./at.entity.repository";
import { AtEntityRepositoryInterface } from "./at.entity.repository.interface";
import { AtService } from "./at.service";

describe("AtService", () => {
  const date = new Date();
  const atEntity: AtEntity = {
    count: 0,
    created_at: date,
    expire_at: date,
    id: 0,
    user_id: 0,
    token: ""
  };
  const deleteResult: DeleteResult = {
    raw: ""
  };
  const updateResult: UpdateResult = {
    generatedMaps: [{}],
    raw: ""
  };

  const atEntityRepositoryMock: AtEntityRepositoryInterface = {
    delete: (): Promise<DeleteResult> => Promise.resolve(deleteResult),
    find: (): Promise<AtEntity[]> => Promise.resolve([atEntity]),
    findOne: (): Promise<AtEntity | undefined> => Promise.resolve(atEntity),
    save: <AtEntity>(): Promise<AtEntity> =>
      (Promise.resolve(atEntity) as unknown) as Promise<AtEntity>,
    update: (): Promise<UpdateResult> => Promise.resolve(updateResult)
  };

  let service: AtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: AtEntityRepository, useValue: atEntityRepositoryMock },
        AtService
      ]
    }).compile();
    service = module.get<AtService>(AtService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("deleteById should be defined", async () => {
    expect(await service.deleteById(0)).toEqual(deleteResult);
  });

  it("deleteByToken should be defined", async () => {
    expect(await service.deleteByToken("")).toEqual(deleteResult);
  });

  it("find shoud be defined", async () => {
    expect(await service.find()).toEqual([atEntity]);
  });

  it("findOneById should be defined", async () => {
    expect(await service.findOneById(0)).toEqual(atEntity);
  });

  it("findOneByToken should be defined", async () => {
    expect(await service.findOneByToken("")).toEqual(atEntity);
  });

  it("save should be defined", async () => {
    expect(await service.save(atEntity)).toEqual(atEntity);
  });

  it("update should be defined", async () => {
    expect(await service.update(atEntity)).toEqual(updateResult);
  });

  it("validateBySub should be defined", async () => {
    expect(await service.validateBySub(0)).toEqual(atEntity);
  });

  it("validateByToken should be defined", async () => {
    expect(await service.validateByToken("")).toEqual(atEntity);
  });
});
