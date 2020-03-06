import { Test, TestingModule } from "@nestjs/testing";
import { AtEntityRepository } from "./at.entity.repository";
import { AtService } from "./at.service";

describe("AtService", () => {
  let service: AtService;

  const created_at = new Date();
  const expire_at = new Date();
  // TODO: interface ?
  const atEntityRepositoryMock = {
    delete: (): any => ({
      raw: ""
    }),
    find: (): any => [
      {
        count: 0,
        created_at,
        expire_at,
        id: 0,
        user_id: 0,
        token: ""
      }
    ],
    findOne: (): any => ({
      count: 0,
      created_at,
      expire_at,
      id: 0,
      user_id: 0,
      token: ""
    }),
    save: (): any => ({
      count: 0,
      created_at,
      expire_at,
      id: 0,
      user_id: 0,
      token: ""
    }),
    update: (): any => ({
      raw: "",
      generatedMaps: [
        {
          "": ""
        }
      ]
    })
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AtService,
        { provide: AtEntityRepository, useValue: atEntityRepositoryMock }
      ]
    }).compile();
    service = module.get<AtService>(AtService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("deleteById should be defined", async () => {
    expect(await service.deleteById(0)).toEqual(
      atEntityRepositoryMock.delete()
    );
  });

  it("deleteByToken should be defined", async () => {
    expect(await service.deleteByToken("")).toEqual(
      atEntityRepositoryMock.delete()
    );
  });

  it("find shoud be defined", async () => {
    expect(await service.find()).toEqual(atEntityRepositoryMock.find());
  });

  it("findOneById should be defined", async () => {
    expect(await service.findOneById(0)).toEqual(
      atEntityRepositoryMock.find()[0]
    );
  });

  it("findOneByToken should be defined", async () => {
    expect(await service.findOneByToken("")).toEqual(
      atEntityRepositoryMock.find()[0]
    );
  });

  it("save should be defined", async () => {
    const req = {
      count: 0,
      created_at,
      expire_at,
      id: 0,
      user_id: 0,
      token: ""
    };
    expect(await service.save(req)).toEqual(atEntityRepositoryMock.save());
  });

  it("update should be defined", async () => {
    const req = {
      count: 0,
      created_at,
      expire_at,
      id: 0,
      user_id: 0,
      token: ""
    };
    expect(await service.update(req)).toEqual(atEntityRepositoryMock.update());
  });

  it("validateBySub should be defined", async () => {
    const res = {
      count: 0,
      created_at,
      expire_at,
      id: 0,
      user_id: 0,
      token: ""
    };
    expect(await service.validateBySub(0)).toEqual(res);
  });

  it("validateByToken should be defined", async () => {
    const res = {
      count: 0,
      created_at,
      expire_at,
      id: 0,
      user_id: 0,
      token: ""
    };
    expect(await service.validateByToken("")).toEqual(res);
  });
});
