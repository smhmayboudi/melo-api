import {
  RelationEdgeType,
  RelationEntityReqDto,
  RelationEntityType,
  RelationGetReqDto,
  RelationHasReqDto,
  RelationMultiHasReqDto,
  RelationRemoveReqDto,
  RelationResDto,
  RelationSetReqDto,
} from "@melo/common";
import { Test, TestingModule } from "@nestjs/testing";

import { DgraphService } from "@melo/dgraph";
import { RelationService } from "./relation.service";

describe("RelationService", () => {
  const date = new Date();
  const from: RelationEntityReqDto = {
    id: 0,
    type: RelationEntityType.user,
  };
  const relationMultiHas: RelationResDto = {
    from,
    to: {
      id: 0,
      type: RelationEntityType.user,
    },
    type: RelationEdgeType.follows,
  };

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
        RelationService,
        { provide: DgraphService, useValue: dgraphServiceMock },
      ],
    }).compile();
    service = module.get<RelationService>(RelationService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("get should throw an error with result undefined", async () => {
    const dto: RelationGetReqDto = {
      entity: {
        id: 0,
        type: RelationEntityType.user,
      },
      from: 0,
      size: 0,
      type: RelationEdgeType.follows,
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
        RelationService,
        { provide: DgraphService, useValue: dgraphServiceMock },
      ],
    }).compile();
    service = module.get<RelationService>(RelationService);

    const dto: RelationGetReqDto = {
      entity: {
        id: 0,
        type: RelationEntityType.user,
      },
      from: 0,
      size: 0,
      type: RelationEdgeType.follows,
    };
    expect(await service.get(dto)).toEqual([]);
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
        RelationService,
        { provide: DgraphService, useValue: dgraphServiceMock },
      ],
    }).compile();
    service = module.get<RelationService>(RelationService);

    const dto: RelationGetReqDto = {
      entity: {
        id: 0,
        type: RelationEntityType.user,
      },
      from: 0,
      size: 0,
      type: RelationEdgeType.follows,
    };
    return expect(await service.get(dto)).toEqual([]);
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
                    follows: [
                      {
                        id: `${from.type}_${from.id}`,
                      },
                    ],
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

    const dto: RelationGetReqDto = {
      entity: {
        id: 0,
        type: RelationEntityType.user,
      },
      from: 0,
      size: 0,
      type: RelationEdgeType.follows,
    };
    expect(await service.get(dto)).toEqual([relationMultiHas]);
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
                    follows: [
                      {
                        id: `${from.type}_${from.id}`,
                      },
                    ],
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
      from: {
        id: 0,
        type: RelationEntityType.user,
      },
      to: {
        id: 0,
        type: RelationEntityType.user,
      },
      type: RelationEdgeType.follows,
    };
    expect(await service.has(dto)).toEqual(dto);
  });

  it("has should be equal to a value undefined", async () => {
    // TODO: interface ?
    const dgraphServiceMocK = {
      client: {
        newTxn: (): any => ({
          queryWithVars: (): any =>
            Promise.resolve({
              getJson: () => ({
                hasRelate: [{}],
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
      from: {
        id: 0,
        type: RelationEntityType.user,
      },
      to: {
        id: 0,
        type: RelationEntityType.user,
      },
      type: RelationEdgeType.follows,
    };
    expect(await service.has(dto)).toBeUndefined();
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
      from: {
        id: 0,
        type: RelationEntityType.user,
      },
      tos: [
        {
          id: 0,
          type: RelationEntityType.user,
        },
      ],
      type: RelationEdgeType.follows,
    };
    expect(await service.multiHas(dto)).toEqual([]);
  });

  it("multiHas should be equal to a value", async () => {
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
                    follows: [
                      {
                        id: `${from.type}_${from.id}`,
                      },
                    ],
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
      from: {
        id: 0,
        type: RelationEntityType.user,
      },
      tos: [
        {
          id: 0,
          type: RelationEntityType.user,
        },
      ],
      type: RelationEdgeType.follows,
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
      from: {
        id: 0,
        type: RelationEntityType.user,
      },
      to: {
        id: 0,
        type: RelationEntityType.user,
      },
      type: RelationEdgeType.follows,
    };
    expect(await service.remove(dto)).toEqual({
      from: dto.from,
      to: dto.to,
      type: dto.type,
    });
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
      from: {
        id: 0,
        name: "",
        type: RelationEntityType.album,
      },
      to: {
        id: 0,
        name: "",
        type: RelationEntityType.album,
      },
      type: RelationEdgeType.follows,
    };
    expect(await service.remove(dto)).toEqual({
      from: dto.from,
      to: dto.to,
      type: dto.type,
    });
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
      from: {
        id: 0,
        type: RelationEntityType.user,
      },
      to: {
        id: 0,
        type: RelationEntityType.user,
      },
      type: RelationEdgeType.follows,
    };
    expect(await service.set(dto)).toEqual({
      from: dto.from,
      to: dto.to,
      type: dto.type,
    });
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
      from: {
        id: 0,
        name: "",
        type: RelationEntityType.album,
      },
      to: {
        id: 0,
        name: "",
        type: RelationEntityType.album,
      },
      type: RelationEdgeType.follows,
    };
    expect(await service.set(dto)).toEqual({
      from: dto.from,
      to: dto.to,
      type: dto.type,
    });
  });
});
