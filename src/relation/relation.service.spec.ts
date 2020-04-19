import { Observable, of } from "rxjs";
import { Test, TestingModule } from "@nestjs/testing";

import { AxiosResponse } from "axios";
import { HttpService } from "@nestjs/common";
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

  // TODO: interface ?
  const httpServiceMock = {
    delete: (): Observable<
      AxiosResponse<RelationPaginationResDto<RelationEntityResDto>>
    > =>
      of({
        config: {},
        data: relationPagination,
        headers: {},
        status: 200,
        statusText: "",
      }),
    get: (): Observable<
      AxiosResponse<RelationPaginationResDto<RelationEntityResDto>>
    > =>
      of({
        config: {},
        data: relationPagination,
        headers: {},
        status: 200,
        statusText: "",
      }),
    post: (): Observable<
      AxiosResponse<RelationPaginationResDto<RelationEntityResDto>>
    > =>
      of({
        config: {},
        data: relationPagination,
        headers: {},
        status: 200,
        statusText: "",
      }),
  };

  let service: RelationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: RelationConfigService,
          useValue: {},
        },
        RelationService,
        { provide: HttpService, useValue: httpServiceMock },
      ],
    }).compile();
    service = module.get<RelationService>(RelationService);
  });

  it("get should be equal to a list of relation entities", async () => {
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

  describe("get: true", () => {
    // TODO: interface ?
    const httpServiceMockBoolean = {
      ...httpServiceMock,
      get: (): Observable<AxiosResponse<boolean>> =>
        of({
          config: {},
          data: true,
          headers: {},
          status: 200,
          statusText: "",
        }),
    };

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: RelationConfigService,
            useValue: {},
          },
          RelationService,
          { provide: HttpService, useValue: httpServiceMockBoolean },
        ],
      }).compile();
      service = module.get<RelationService>(RelationService);
    });

    it("has should be undefined", async () => {
      const dto: RelationHasReqDto = {
        from: { id: 0, type: RelationEntityType.album },
        relationType: RelationType.follows,
        to: { id: 0, type: RelationEntityType.album },
      };
      expect(await service.has(dto)).toBeUndefined();
    });

    it("remove should be undefined", async () => {
      const dto: RelationRemoveReqDto = {
        from: { id: 0, type: RelationEntityType.album },
        relationType: RelationType.follows,
        to: { id: 0, type: RelationEntityType.album },
      };
      expect(await service.remove(dto)).toBeUndefined();
    });

    it("set should be undefined", async () => {
      const dto: RelationSetReqDto = {
        createdAt: date,
        from: { id: 0, type: RelationEntityType.album },
        relationType: RelationType.follows,
        to: { id: 0, type: RelationEntityType.album },
      };
      expect(await service.set(dto)).toBeUndefined();
    });
  });

  describe("get: false", () => {
    // TODO: interface ?
    const httpServiceMockBoolean = {
      ...httpServiceMock,
      delete: (): Observable<AxiosResponse<boolean>> =>
        of({
          config: {},
          data: false,
          headers: {},
          status: 200,
          statusText: "",
        }),
      get: (): Observable<AxiosResponse<boolean>> =>
        of({
          config: {},
          data: false,
          headers: {},
          status: 200,
          statusText: "",
        }),
      post: (): Observable<AxiosResponse<boolean>> =>
        of({
          config: {},
          data: false,
          headers: {},
          status: 200,
          statusText: "",
        }),
    };

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: RelationConfigService,
            useValue: {},
          },
          RelationService,
          { provide: HttpService, useValue: httpServiceMockBoolean },
        ],
      }).compile();
      service = module.get<RelationService>(RelationService);
    });

    it("has should throw an exception", async () => {
      const dto: RelationHasReqDto = {
        from: { id: 0, type: RelationEntityType.album },
        relationType: RelationType.follows,
        to: { id: 0, type: RelationEntityType.album },
      };
      return expect(service.has(dto)).rejects.toThrowError();
    });

    it("remove should throw an exception", async () => {
      const dto: RelationRemoveReqDto = {
        from: { id: 0, type: RelationEntityType.album },
        relationType: RelationType.follows,
        to: { id: 0, type: RelationEntityType.album },
      };
      return expect(service.remove(dto)).rejects.toThrowError();
    });

    it("set should throw an exception", async () => {
      const dto: RelationSetReqDto = {
        createdAt: date,
        from: { id: 0, type: RelationEntityType.album },
        relationType: RelationType.follows,
        to: { id: 0, type: RelationEntityType.album },
      };
      return expect(service.set(dto)).rejects.toThrowError();
    });
  });

  describe("multiHas: RelationMultiHasResDto[]", () => {
    const relationMultiHas: RelationMultiHasResDto = {
      from: { id: 0, type: RelationEntityType.album },
      relation: RelationType.follows,
      to: { id: 0, type: RelationEntityType.album },
    };
    // TODO: interface ?
    const httpServiceMockMultiHas = {
      ...httpServiceMock,
      get: (): Observable<AxiosResponse<RelationMultiHasResDto[]>> =>
        of({
          config: {},
          data: [relationMultiHas],
          headers: {},
          status: 200,
          statusText: "",
        }),
    };

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: RelationConfigService,
            useValue: {},
          },
          RelationService,
          { provide: HttpService, useValue: httpServiceMockMultiHas },
        ],
      }).compile();
      service = module.get<RelationService>(RelationService);
    });

    it("multiHas should be equal to an array of relation entities ", async () => {
      const dto: RelationMultiHasReqDto = {
        from: { id: 0, type: RelationEntityType.album },
        relationType: RelationType.follows,
        tos: [{ id: 0, type: RelationEntityType.album }],
      };
      expect(await service.multiHas(dto)).toEqual([relationMultiHas]);
    });
  });
});
