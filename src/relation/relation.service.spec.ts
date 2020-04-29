import { Test, TestingModule } from "@nestjs/testing";

import { DgraphService } from "../dgraph/dgraph.service";
import { RelationConfigService } from "./relation.config.service";
import { RelationEntityResDto } from "./dto/res/relation.entity.res.dto";
import { RelationEntityType } from "./relation.entity.type";
import { RelationGetReqDto } from "./dto/req/relation.get.req.dto";
import { RelationHasReqDto } from "./dto/req/relation.has.req.dto";
import { RelationMultiHasReqDto } from "./dto/req/relation.multi-has.req.dto";
import { RelationMultiHasResDto } from "./dto/res/relation.multi-has.res.dto";
import { RelationPaginationResDto } from "./dto/res/relation.pagination.res.dto";
import { RelationRemoveReqDto } from "./dto/req/relation.remove.req.dto";
import { RelationService } from "./relation.service";
import { RelationSetReqDto } from "./dto/req/relation.set.req.dto";
import { RelationType } from "./relation.type";

describe("RelationService", () => {
  const date = new Date();
  const relationResult: RelationEntityResDto = {
    id: 0,
    type: RelationEntityType.album,
  };
  const relationPagination: RelationPaginationResDto<RelationEntityResDto> = {
    results: [relationResult],
    total: 1,
  } as RelationPaginationResDto<RelationEntityResDto>;

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

  it("get should throw an error with result undefined", async () => {
    const dto: RelationGetReqDto = {
      from: 0,
      fromEntityDto: {
        id: 0,
        type: RelationEntityType.album,
      },
      limit: 0,
      relationType: RelationType.follows,
    };
    return expect(service.get(dto)).rejects.toThrowError();
  });

  describe("get 2", () => {
    const dgraphServiceMockGet2 = {
      ...dgraphServiceMock,
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

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          { provide: DgraphService, useValue: dgraphServiceMockGet2 },
          RelationService,
        ],
      }).compile();
      service = module.get<RelationService>(RelationService);
    });

    it("get should be equal to an empty relation", async () => {
      const dto: RelationGetReqDto = {
        from: 0,
        fromEntityDto: {
          id: 0,
          type: RelationEntityType.album,
        },
        limit: 0,
        relationType: RelationType.follows,
      };
      expect(await service.get(dto)).toEqual({
        results: [],
        total: 0,
      });
    });
  });

  describe("get 3", () => {
    const dgraphServiceMockGet3 = {
      ...dgraphServiceMock,
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

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          { provide: DgraphService, useValue: dgraphServiceMockGet3 },
          RelationService,
        ],
      }).compile();
      service = module.get<RelationService>(RelationService);
    });

    it("get should be equal to an empty relation", async () => {
      const dto: RelationGetReqDto = {
        from: 0,
        fromEntityDto: {
          id: 0,
          type: RelationEntityType.album,
        },
        limit: 0,
        relationType: RelationType.follows,
      };
      return expect(service.get(dto)).resolves.toEqual({
        results: [],
        total: 0,
      });
    });
  });

  describe("get 4", () => {
    const dgraphServiceMockGet4 = {
      ...dgraphServiceMock,
      client: {
        newTxn: (): any => ({
          queryWithVars: (): any =>
            Promise.resolve({
              getJson: () => ({
                relates: [
                  {
                    count: 1,
                    follows: [
                      { id: `${relationResult.type}_${relationResult.id}` },
                    ],
                  },
                ],
              }),
            }),
        }),
      },
    };

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          { provide: DgraphService, useValue: dgraphServiceMockGet4 },
          RelationService,
        ],
      }).compile();
      service = module.get<RelationService>(RelationService);
    });

    it("get should be equal to an empty relation", async () => {
      const dto: RelationGetReqDto = {
        from: 0,
        fromEntityDto: {
          id: 0,
          type: RelationEntityType.album,
        },
        limit: 0,
        relationType: RelationType.follows,
      };
      expect(await service.get(dto)).toEqual(relationPagination);
    });
  });

  describe("has", () => {
    // TODO: interface ?
    const dgraphServiceMockHas = {
      ...dgraphServiceMock,
      client: {
        newTxn: (): any => ({
          queryWithVars: (): any =>
            Promise.resolve({
              getJson: () => ({
                hasRelate: [
                  {
                    count: 1,
                    follows: [
                      { id: `${relationResult.type}_${relationResult.id}` },
                    ],
                  },
                ],
              }),
            }),
        }),
      },
    };

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: RelationConfigService,
            useValue: {},
          },
          RelationService,
          { provide: DgraphService, useValue: dgraphServiceMockHas },
        ],
      }).compile();
      service = module.get<RelationService>(RelationService);
    });

    it("has should be equal to a value", async () => {
      const dto: RelationHasReqDto = {
        from: { id: 0, type: RelationEntityType.album },
        relationType: RelationType.follows,
        to: { id: 0, type: RelationEntityType.album },
      };
      expect(await service.has(dto)).toEqual(true);
    });
  });

  describe("multiHas", () => {
    // TODO: interface ?
    const dgraphServiceMockMultiHas = {
      ...dgraphServiceMock,
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

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: RelationConfigService,
            useValue: {},
          },
          RelationService,
          { provide: DgraphService, useValue: dgraphServiceMockMultiHas },
        ],
      }).compile();
      service = module.get<RelationService>(RelationService);
    });

    it("multiHas should be equal to a value", async () => {
      const dto: RelationMultiHasReqDto = {
        from: { id: 0, type: RelationEntityType.album },
        relationType: RelationType.follows,
        tos: [{ id: 0, type: RelationEntityType.album }],
      };
      expect(await service.multiHas(dto)).toEqual([]);
    });
  });

  describe("multiHas 2", () => {
    const relationMultiHas: RelationMultiHasResDto = {
      from: { id: 0, type: RelationEntityType.album },
      relation: RelationType.follows,
      to: { id: 0, type: RelationEntityType.album },
    };

    // TODO: interface ?
    const dgraphServiceMockMultiHas2 = {
      ...dgraphServiceMock,
      client: {
        newTxn: (): any => ({
          queryWithVars: (): any =>
            Promise.resolve({
              getJson: () => ({
                hasRelate: [
                  {
                    count: 1,
                    follows: [
                      { id: `${relationResult.type}_${relationResult.id}` },
                    ],
                  },
                ],
              }),
            }),
        }),
      },
    };

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: RelationConfigService,
            useValue: {},
          },
          RelationService,
          { provide: DgraphService, useValue: dgraphServiceMockMultiHas2 },
        ],
      }).compile();
      service = module.get<RelationService>(RelationService);
    });

    it("multiHas should be equal to a value", async () => {
      const dto: RelationMultiHasReqDto = {
        from: { id: 0, type: RelationEntityType.album },
        relationType: RelationType.follows,
        tos: [{ id: 0, type: RelationEntityType.album }],
      };
      expect(await service.multiHas(dto)).toEqual([relationMultiHas]);
    });
  });

  describe("remove", () => {
    // TODO: interface ?
    const dgraphServiceMockRemove = {
      ...dgraphServiceMock,
      client: {
        newTxn: (): any => ({
          doRequest: (): any => Promise.resolve(undefined),
        }),
      },
    };

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: RelationConfigService,
            useValue: {},
          },
          RelationService,
          { provide: DgraphService, useValue: dgraphServiceMockRemove },
        ],
      }).compile();
      service = module.get<RelationService>(RelationService);
    });

    it("remove should be equal to a value", async () => {
      const dto: RelationRemoveReqDto = {
        from: { id: 0, name: undefined, type: RelationEntityType.album },
        relationType: RelationType.follows,
        to: { id: 0, name: undefined, type: RelationEntityType.album },
      };
      expect(await service.remove(dto)).toEqual(true);
    });

    it("remove should be equal to a value 2", async () => {
      const dto: RelationRemoveReqDto = {
        from: { id: 0, name: "", type: RelationEntityType.album },
        relationType: RelationType.follows,
        to: { id: 0, name: "", type: RelationEntityType.album },
      };
      expect(await service.remove(dto)).toEqual(true);
    });

    it("set should be equal to a value", async () => {
      const dto: RelationSetReqDto = {
        createdAt: date,
        from: { id: 0, name: undefined, type: RelationEntityType.album },
        relationType: RelationType.follows,
        to: { id: 0, name: undefined, type: RelationEntityType.album },
      };
      expect(await service.set(dto)).toEqual(true);
    });

    it("set should be equal to a value 2", async () => {
      const dto: RelationSetReqDto = {
        createdAt: date,
        from: { id: 0, name: "", type: RelationEntityType.album },
        relationType: RelationType.follows,
        to: { id: 0, name: "", type: RelationEntityType.album },
      };
      expect(await service.set(dto)).toEqual(true);
    });
  });
});
