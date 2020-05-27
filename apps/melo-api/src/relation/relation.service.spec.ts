import {
  DataPaginationResDto,
  RelationEntityReqDto,
  RelationEntityType,
  RelationGetReqDto,
  RelationHasReqDto,
  RelationMultiHasReqDto,
  RelationMultiHasResDto,
  RelationRemoveReqDto,
  RelationSetReqDto,
  RelationType,
} from "@melo/common";
import { Test, TestingModule } from "@nestjs/testing";

import { DgraphService } from "@melo/dgraph";
import { RelationService } from "./relation.service";

describe("RelationService", () => {
  const date = new Date();
  const relation: RelationEntityReqDto = {
    id: 0,
    type: RelationEntityType.album,
  };
  const relationPagination: DataPaginationResDto<RelationEntityReqDto> = {
    results: [relation],
    total: 1,
  } as DataPaginationResDto<RelationEntityReqDto>;

  let service: RelationService;

  // TODO: interface ?
  const dgraphServiceMock = {
    client: {
      newTxn: (): any => ({
        queryWithVars: (): any =>
          Promise.resolve({
            getJson: () => undefined,
          }),
      }),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: DgraphService, useValue: dgraphServiceMock },
        RelationService,
      ],
    }).compile();
    service = module.get<RelationService>(RelationService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("get should throw an error with result undefined", async () => {
    const dto: RelationGetReqDto = {
      from: 0,
      fromEntityDto: {
        id: 0,
        type: RelationEntityType.album,
      },
      relationType: RelationType.follows,
      size: 0,
    };
    return expect(service.get(dto)).rejects.toThrowError();
  });

  it("get should be equal to an empty relation", async () => {
    // TODO: interface ?
    const dgraphServiceMock = {
      client: {
        newTxn: (): any => ({
          queryWithVars: (): any =>
            Promise.resolve({
              getJson: () => ({
                relates: [undefined],
              }),
            }),
        }),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: DgraphService, useValue: dgraphServiceMock },
        RelationService,
      ],
    }).compile();
    service = module.get<RelationService>(RelationService);

    const dto: RelationGetReqDto = {
      from: 0,
      fromEntityDto: {
        id: 0,
        type: RelationEntityType.album,
      },
      relationType: RelationType.follows,
      size: 0,
    };
    expect(await service.get(dto)).toEqual({
      results: [],
      total: 0,
    });
  });

  it("get should be equal to an empty relation 2", async () => {
    // TODO: interface ?
    const dgraphServiceMock = {
      client: {
        newTxn: (): any => ({
          queryWithVars: (): any =>
            Promise.resolve({
              getJson: () => ({
                relates: [
                  {
                    follows: undefined,
                  },
                ],
              }),
            }),
        }),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: DgraphService, useValue: dgraphServiceMock },
        RelationService,
      ],
    }).compile();
    service = module.get<RelationService>(RelationService);

    const dto: RelationGetReqDto = {
      from: 0,
      fromEntityDto: {
        id: 0,
        type: RelationEntityType.album,
      },
      relationType: RelationType.follows,
      size: 0,
    };
    return expect(await service.get(dto)).toEqual({
      results: [],
      total: 0,
    });
  });

  it("get should be equal to an empty relation 3", async () => {
    // TODO: interface ?
    const dgraphServiceMock = {
      client: {
        newTxn: (): any => ({
          queryWithVars: (): any =>
            Promise.resolve({
              getJson: () => ({
                relates: [
                  {
                    count: 1,
                    follows: [{ id: `${relation.type}_${relation.id}` }],
                  },
                ],
              }),
            }),
        }),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: DgraphService, useValue: dgraphServiceMock },
        RelationService,
      ],
    }).compile();
    service = module.get<RelationService>(RelationService);
    const dto: RelationGetReqDto = {
      from: 0,
      fromEntityDto: {
        id: 0,
        type: RelationEntityType.album,
      },
      relationType: RelationType.follows,
      size: 0,
    };
    expect(await service.get(dto)).toEqual(relationPagination);
  });

  it("has should be equal to a value", async () => {
    // TODO: interface ?
    const dgraphServiceMocK = {
      client: {
        newTxn: (): any => ({
          queryWithVars: (): any =>
            Promise.resolve({
              getJson: () => ({
                hasRelate: [
                  {
                    count: 1,
                    follows: [{ id: `${relation.type}_${relation.id}` }],
                  },
                ],
              }),
            }),
        }),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RelationService,
        { provide: DgraphService, useValue: dgraphServiceMocK },
      ],
    }).compile();
    service = module.get<RelationService>(RelationService);

    const dto: RelationHasReqDto = {
      from: { id: 0, type: RelationEntityType.album },
      relationType: RelationType.follows,
      to: { id: 0, type: RelationEntityType.album },
    };
    expect(await service.has(dto)).toEqual(true);
  });

  it("multiHas should be equal to a value 2", async () => {
    // TODO: interface ?
    const dgraphServiceMock = {
      client: {
        newTxn: (): any => ({
          queryWithVars: (): any =>
            Promise.resolve({
              getJson: () => ({
                hasRelate: [undefined],
              }),
            }),
        }),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RelationService,
        { provide: DgraphService, useValue: dgraphServiceMock },
      ],
    }).compile();
    service = module.get<RelationService>(RelationService);

    const dto: RelationMultiHasReqDto = {
      from: { id: 0, type: RelationEntityType.album },
      relationType: RelationType.follows,
      tos: [{ id: 0, type: RelationEntityType.album }],
    };
    expect(await service.multiHas(dto)).toEqual([]);
  });

  it("multiHas should be equal to a value", async () => {
    const relationMultiHas: RelationMultiHasResDto = {
      from: { id: 0, type: RelationEntityType.album },
      relation: RelationType.follows,
      to: { id: 0, type: RelationEntityType.album },
    };

    // TODO: interface ?
    const dgraphServiceMock = {
      client: {
        newTxn: (): any => ({
          queryWithVars: (): any =>
            Promise.resolve({
              getJson: () => ({
                hasRelate: [
                  {
                    count: 1,
                    follows: [{ id: `${relation.type}_${relation.id}` }],
                  },
                ],
              }),
            }),
        }),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RelationService,
        { provide: DgraphService, useValue: dgraphServiceMock },
      ],
    }).compile();
    service = module.get<RelationService>(RelationService);

    const dto: RelationMultiHasReqDto = {
      from: { id: 0, type: RelationEntityType.album },
      relationType: RelationType.follows,
      tos: [{ id: 0, type: RelationEntityType.album }],
    };
    expect(await service.multiHas(dto)).toEqual([relationMultiHas]);
  });

  it("remove should be equal to a value", async () => {
    // TODO: interface ?
    const dgraphServiceMock = {
      client: {
        newTxn: (): any => ({
          doRequest: (): any => Promise.resolve(undefined),
        }),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RelationService,
        { provide: DgraphService, useValue: dgraphServiceMock },
      ],
    }).compile();
    service = module.get<RelationService>(RelationService);

    const dto: RelationRemoveReqDto = {
      from: { id: 0, name: undefined, type: RelationEntityType.album },
      relationType: RelationType.follows,
      to: { id: 0, name: undefined, type: RelationEntityType.album },
    };
    expect(await service.remove(dto)).toEqual(true);
  });

  it("remove should be equal to a value 2", async () => {
    // TODO: interface ?
    const dgraphServiceMock = {
      client: {
        newTxn: (): any => ({
          doRequest: (): any => Promise.resolve(undefined),
        }),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RelationService,
        { provide: DgraphService, useValue: dgraphServiceMock },
      ],
    }).compile();

    service = module.get<RelationService>(RelationService);
    const dto: RelationRemoveReqDto = {
      from: { id: 0, name: "", type: RelationEntityType.album },
      relationType: RelationType.follows,
      to: { id: 0, name: "", type: RelationEntityType.album },
    };
    expect(await service.remove(dto)).toEqual(true);
  });

  it("set should be equal to a value", async () => {
    // TODO: interface ?
    const dgraphServiceMock = {
      client: {
        newTxn: (): any => ({
          doRequest: (): any => Promise.resolve(undefined),
        }),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RelationService,
        { provide: DgraphService, useValue: dgraphServiceMock },
      ],
    }).compile();
    service = module.get<RelationService>(RelationService);

    const dto: RelationSetReqDto = {
      createdAt: date,
      from: { id: 0, name: undefined, type: RelationEntityType.album },
      relationType: RelationType.follows,
      to: { id: 0, name: undefined, type: RelationEntityType.album },
    };
    expect(await service.set(dto)).toEqual(true);
  });

  it("set should be equal to a value 2", async () => {
    // TODO: interface ?
    const dgraphServiceMock = {
      client: {
        newTxn: (): any => ({
          doRequest: (): any => Promise.resolve(undefined),
        }),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RelationService,
        { provide: DgraphService, useValue: dgraphServiceMock },
      ],
    }).compile();
    service = module.get<RelationService>(RelationService);

    const dto: RelationSetReqDto = {
      createdAt: date,
      from: { id: 0, name: "", type: RelationEntityType.album },
      relationType: RelationType.follows,
      to: { id: 0, name: "", type: RelationEntityType.album },
    };
    expect(await service.set(dto)).toEqual(true);
  });
});
