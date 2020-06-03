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

import { DgraphService } from "@melo/dgraph";
import { RelationService } from "./relation.service";
import { Test } from "@nestjs/testing";

describe("RelationService", () => {
  const date = new Date();
  const from: RelationEntityReqDto = {
    id: 0,
    type: RelationEntityType.user,
  };
  const to: RelationEntityReqDto = {
    id: 0,
    type: RelationEntityType.album,
  };
  const relation: RelationResDto = {
    from,
    to,
    type: RelationEdgeType.follows,
  };
  const entity: RelationEntityReqDto = {
    id: 0,
    type: RelationEntityType.user,
  };

  let service: RelationService;

  // TODO: interface ?
  const dgraphServiceMock = {
    client: {
      newTxn: () => ({
        doRequest: () => Promise.resolve(undefined),
        queryWithVars: () =>
          Promise.resolve({
            getJson: () => undefined,
          }),
      }),
    },
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
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
      entity,
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
        newTxn: () => ({
          queryWithVars: () =>
            Promise.resolve({
              getJson: () => ({
                relates: [undefined],
              }),
            }),
        }),
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        RelationService,
        { provide: DgraphService, useValue: dgraphServiceMock },
      ],
    }).compile();
    service = module.get<RelationService>(RelationService);

    const dto: RelationGetReqDto = {
      entity,
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
        newTxn: () => ({
          queryWithVars: () =>
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

    const module = await Test.createTestingModule({
      providers: [
        RelationService,
        { provide: DgraphService, useValue: dgraphServiceMock },
      ],
    }).compile();
    service = module.get<RelationService>(RelationService);

    const dto: RelationGetReqDto = {
      entity,
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
        newTxn: () => ({
          queryWithVars: () =>
            Promise.resolve({
              getJson: () => ({
                relates: [
                  {
                    count: 1,
                    follows: [
                      {
                        id: `${to.type}_${to.id}`,
                      },
                    ],
                  },
                ],
              }),
            }),
        }),
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        RelationService,
        { provide: DgraphService, useValue: dgraphServiceMock },
      ],
    }).compile();
    service = module.get<RelationService>(RelationService);

    const dto: RelationGetReqDto = {
      entity,
      from: 0,
      size: 0,
      type: RelationEdgeType.follows,
    };
    expect(await service.get(dto)).toEqual([relation]);
  });

  it("has should be equal to a value", async () => {
    // TODO: interface ?
    const dgraphServiceMocK = {
      client: {
        newTxn: () => ({
          queryWithVars: () =>
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

    const module = await Test.createTestingModule({
      providers: [
        RelationService,
        { provide: DgraphService, useValue: dgraphServiceMocK },
      ],
    }).compile();
    service = module.get<RelationService>(RelationService);

    const dto: RelationHasReqDto = {
      from,
      to,
      type: RelationEdgeType.follows,
    };
    expect(await service.has(dto)).toEqual(dto);
  });

  it("has should be equal to a value undefined", async () => {
    // TODO: interface ?
    const dgraphServiceMocK = {
      client: {
        newTxn: () => ({
          queryWithVars: () =>
            Promise.resolve({
              getJson: () => ({
                hasRelate: [{}],
              }),
            }),
        }),
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        RelationService,
        { provide: DgraphService, useValue: dgraphServiceMocK },
      ],
    }).compile();
    service = module.get<RelationService>(RelationService);

    const dto: RelationHasReqDto = {
      from,
      to,
      type: RelationEdgeType.follows,
    };
    expect(await service.has(dto)).toBeUndefined();
  });

  it("multiHas should be equal to a value 2", async () => {
    // TODO: interface ?
    const dgraphServiceMock = {
      client: {
        newTxn: () => ({
          queryWithVars: () =>
            Promise.resolve({
              getJson: () => ({
                hasRelate: [undefined],
              }),
            }),
        }),
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        RelationService,
        { provide: DgraphService, useValue: dgraphServiceMock },
      ],
    }).compile();
    service = module.get<RelationService>(RelationService);

    const dto: RelationMultiHasReqDto = {
      from,
      tos: [entity],
      type: RelationEdgeType.follows,
    };
    expect(await service.multiHas(dto)).toEqual([]);
  });

  it("multiHas should be equal to a value", async () => {
    // TODO: interface ?
    const dgraphServiceMock = {
      client: {
        newTxn: () => ({
          queryWithVars: () =>
            Promise.resolve({
              getJson: () => ({
                hasRelate: [
                  {
                    count: 1,
                    follows: [
                      {
                        id: `${to.type}_${to.id}`,
                      },
                    ],
                  },
                ],
              }),
            }),
        }),
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        RelationService,
        { provide: DgraphService, useValue: dgraphServiceMock },
      ],
    }).compile();
    service = module.get<RelationService>(RelationService);

    const dto: RelationMultiHasReqDto = {
      from,
      tos: [entity],
      type: RelationEdgeType.follows,
    };
    expect(await service.multiHas(dto)).toEqual([relation]);
  });

  it("remove should be equal to a value", async () => {
    const dto: RelationRemoveReqDto = {
      from,
      to,
      type: RelationEdgeType.follows,
    };
    expect(await service.remove(dto)).toEqual(relation);
  });

  it("remove should be equal to a value 2", async () => {
    const dto: RelationRemoveReqDto = {
      from,
      to,
      type: RelationEdgeType.follows,
    };
    expect(await service.remove(dto)).toEqual(relation);
  });

  it("set should be equal to a value", async () => {
    const dto: RelationSetReqDto = {
      createdAt: date,
      from,
      to,
      type: RelationEdgeType.follows,
    };
    expect(await service.set(dto)).toEqual(relation);
  });

  it("set should be equal to a value 2", async () => {
    const dto: RelationSetReqDto = {
      createdAt: date,
      from: {
        ...from,
        name: "",
      },
      to: {
        ...to,
        name: "",
      },
      type: RelationEdgeType.follows,
    };
    expect(await service.set(dto)).toEqual({
      from: {
        ...from,
        name: "",
      },
      to: {
        ...to,
        name: "",
      },
      type: RelationEdgeType.follows,
    });
  });
});
