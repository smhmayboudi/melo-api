import { DeleteResult, UpdateResult } from "typeorm";
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

import { RtEntity } from "./rt.entity";
import { RtEntityRepository } from "./rt.entity.repository";
import { RtEntityRepositoryInterface } from "./rt.entity.repository.interface";
import { RtService } from "./rt.service";

describe("RtService", () => {
  const date = new Date();
  const rtEntity: RtResDto = {
    created_at: date,
    description: "",
    expire_at: date,
    id: 0,
    is_blocked: false,
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

  const rtEntityRepositoryMock: RtEntityRepositoryInterface = {
    delete: (): Promise<DeleteResult> => Promise.resolve(deleteResult),
    find: (): Promise<RtEntity[]> => Promise.resolve([rtEntity]),
    findOne: (): Promise<RtEntity | undefined> => Promise.resolve(rtEntity),
    save: <RtEntity>(): Promise<RtEntity> =>
      (Promise.resolve(rtEntity) as unknown) as Promise<RtEntity>,
    update: (): Promise<UpdateResult> => Promise.resolve(updateResult),
  };

  let service: RtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RtService,
        { provide: RtEntityRepository, useValue: rtEntityRepositoryMock },
      ],
    }).compile();
    service = module.get<RtService>(RtService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("block should be equal to a rt", async () => {
    const dto: RtBlockReqDto = {
      description: "",
      id: 0,
    };
    expect(await service.block(dto)).toEqual({
      ...rtEntity,
      is_blocked: false,
    });
  });

  it("blockByToken should be equal to a rt", async () => {
    const dto: RtBlockByTokenReqDto = {
      description: "",
      token: "",
    };
    expect(await service.blockByToken(dto)).toEqual({
      ...rtEntity,
      is_blocked: false,
    });
  });

  it("delete should be equal to a rt", async () => {
    const dto: RtDeleteReqDto = {
      id: 0,
    };
    expect(await service.delete(dto)).toEqual(rtEntity);
  });

  it("deleteByToken should be equal to a rt", async () => {
    const dto: RtDeleteByTokenReqDto = {
      token: "",
    };
    expect(await service.deleteByToken(dto)).toEqual(rtEntity);
  });

  it("find should be equal to an ...", async () => {
    expect(await service.find()).toEqual([rtEntity]);
  });

  it("findOne should be equal to a rt", async () => {
    const dto: RtFindOneReqDto = {
      id: 0,
    };
    expect(await service.findOne(dto)).toEqual(rtEntity);
  });

  it("findOneByToken should be equal to a rt", async () => {
    const dto: RtFindOneByTokenReqDto = {
      token: "",
    };
    expect(await service.findOneByToken(dto)).toEqual(rtEntity);
  });

  it("save should be equal to a rt", async () => {
    const dto: RtSaveReqDto = rtEntity;
    expect(await service.save(dto)).toEqual(rtEntity);
  });

  it("validate should be equal to a rt", async () => {
    const dto: RtValidateReqDto = {
      sub: 1,
    };
    expect(await service.validate(dto)).toEqual(rtEntity);
  });

  it("validateByToken should be equal to a rt", async () => {
    const dto: RtValidateByTokenReqDto = {
      token: "",
    };
    expect(await service.validateByToken(dto)).toEqual(rtEntity);
  });
});
