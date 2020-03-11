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

  it("deleteById should equal to delete result", async () => {
    expect(await service.deleteById(0)).toEqual(deleteResult);
  });

  it("deleteByToken should equal to delete result", async () => {
    expect(await service.deleteByToken("")).toEqual(deleteResult);
  });

  it("find sholud equal to array of at", async () => {
    expect(await service.find()).toEqual([atEntity]);
  });

  it("findOneById should equal to an at", async () => {
    expect(await service.findOneById(0)).toEqual(atEntity);
  });

  it("findOneByToken should equal to an at", async () => {
    expect(await service.findOneByToken("")).toEqual(atEntity);
  });

  it("save should equal to an at", async () => {
    expect(await service.save(atEntity)).toEqual(atEntity);
  });

  it("update should equal to update result", async () => {
    expect(await service.update(atEntity)).toEqual(updateResult);
  });

  it("validateBySub should equal to an at", async () => {
    expect(await service.validateBySub(0)).toEqual(atEntity);
  });

  it("validateByToken should equal to an at", async () => {
    expect(await service.validateByToken("")).toEqual(atEntity);
  });
});
