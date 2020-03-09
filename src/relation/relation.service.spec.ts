import { HttpService } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AxiosResponse } from "axios";
import { Observable, of } from "rxjs";
import { RelationGetReqDto } from "./dto/req/relation.get.req.dto";
import { RelationHasReqDto } from "./dto/req/relation.has.req.dto";
import { RelationMultiHasReqDto } from "./dto/req/relation.multi-has.req.dto";
import { RelationRemoveReqDto } from "./dto/req/relation.remove.req.dto";
import { RelationSetReqDto } from "./dto/req/relation.set.req.dto";
import { RelationEntityResDto } from "./dto/res/relation.entity.res.dto";
import { RelationMultiHasResDto } from "./dto/res/relation.multi-has.res.dto";
import { RelationPaginationResDto } from "./dto/res/relation.pagination.res.dto";
import { RelationConfigService } from "./relation.config.service";
import { RelationEntityType } from "./relation.entity.type";
import { RelationService } from "./relation.service";
import { RelationType } from "./relation.type";

describe("RelationService", () => {
  const date = new Date();
  const relationResult: RelationEntityResDto = {
    id: "",
    type: RelationEntityType.album
  };
  const relationPagination: RelationPaginationResDto<RelationEntityResDto> = {
    results: [relationResult],
    total: 1
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
        statusText: ""
      }),
    get: (): Observable<
      AxiosResponse<RelationPaginationResDto<RelationEntityResDto>>
    > =>
      of({
        config: {},
        data: relationPagination,
        headers: {},
        status: 200,
        statusText: ""
      }),
    post: (): Observable<
      AxiosResponse<RelationPaginationResDto<RelationEntityResDto>>
    > =>
      of({
        config: {},
        data: relationPagination,
        headers: {},
        status: 200,
        statusText: ""
      })
  };

  let service: RelationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: RelationConfigService,
          useValue: {}
        },
        RelationService,
        { provide: HttpService, useValue: httpServiceMock }
      ]
    }).compile();
    service = module.get<RelationService>(RelationService);
  });

  it("get should equal to a list of relation entities", async () => {
    const dto: RelationGetReqDto = {
      from: 0,
      fromEntityDto: {
        id: "",
        type: RelationEntityType.album
      },
      limit: 0,
      relationType: RelationType.follows
    };
    expect(await service.get(dto)).toEqual(relationPagination);
  });

  describe("get: true", () => {
    const httpServiceMockBoolean = {
      ...httpServiceMock,
      get: (): Observable<AxiosResponse<boolean>> =>
        of({
          config: {},
          data: true,
          headers: {},
          status: 200,
          statusText: ""
        })
    };

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: RelationConfigService,
            useValue: {}
          },
          RelationService,
          { provide: HttpService, useValue: httpServiceMockBoolean }
        ]
      }).compile();
      service = module.get<RelationService>(RelationService);
    });

    it("has should be defined", async () => {
      const dto: RelationHasReqDto = {
        from: { id: "0", type: RelationEntityType.album },
        to: { id: "0", type: RelationEntityType.album },
        relationType: RelationType.follows
      };
      expect(await service.has(dto)).toBeUndefined();
    });

    it("remove should be defined", async () => {
      const dto: RelationRemoveReqDto = {
        from: { id: "", type: RelationEntityType.album },
        to: { id: "", type: RelationEntityType.album },
        relationType: RelationType.follows
      };
      expect(await service.remove(dto)).toBeUndefined();
    });

    it("set should be defined", async () => {
      const dto: RelationSetReqDto = {
        createdAt: date,
        from: { id: "", type: RelationEntityType.album },
        to: { id: "", type: RelationEntityType.album },
        relationType: RelationType.follows
      };
      expect(await service.set(dto)).toBeUndefined();
    });
  });

  describe("get: false", () => {
    const httpServiceMockBoolean = {
      ...httpServiceMock,
      delete: (): Observable<AxiosResponse<boolean>> =>
        of({
          config: {},
          data: false,
          headers: {},
          status: 200,
          statusText: ""
        }),
      get: (): Observable<AxiosResponse<boolean>> =>
        of({
          config: {},
          data: false,
          headers: {},
          status: 200,
          statusText: ""
        }),
      post: (): Observable<AxiosResponse<boolean>> =>
        of({
          config: {},
          data: false,
          headers: {},
          status: 200,
          statusText: ""
        })
    };

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: RelationConfigService,
            useValue: {}
          },
          RelationService,
          { provide: HttpService, useValue: httpServiceMockBoolean }
        ]
      }).compile();
      service = module.get<RelationService>(RelationService);
    });

    it("has should throw an exception", async () => {
      const dto: RelationHasReqDto = {
        from: { id: "0", type: RelationEntityType.album },
        to: { id: "0", type: RelationEntityType.album },
        relationType: RelationType.follows
      };
      try {
        expect(await service.has(dto)).toThrowError();
      } catch (error) {
        console.log(error);
      }
    });

    it("remove should throw an exception", async () => {
      const dto: RelationRemoveReqDto = {
        from: { id: "", type: RelationEntityType.album },
        to: { id: "", type: RelationEntityType.album },
        relationType: RelationType.follows
      };
      try {
        expect(await service.remove(dto)).toThrowError();
      } catch (error) {
        console.log(error);
      }
    });

    it("set should throw an exception", async () => {
      const dto: RelationSetReqDto = {
        createdAt: date,
        from: { id: "", type: RelationEntityType.album },
        to: { id: "", type: RelationEntityType.album },
        relationType: RelationType.follows
      };
      try {
        expect(await service.set(dto)).toThrowError();
      } catch (error) {
        console.log(error);
      }
    });
  });

  describe("multiHas: RelationMultiHasResDto[]", () => {
    const relationMultiHas: RelationMultiHasResDto = {
      from: { id: "", type: RelationEntityType.album },
      relation: RelationType.follows,
      to: { id: "", type: RelationEntityType.album }
    };

    const httpServiceMockMultiHas = {
      ...httpServiceMock,
      get: (): Observable<AxiosResponse<RelationMultiHasResDto[]>> =>
        of({
          config: {},
          data: [relationMultiHas],
          headers: {},
          status: 200,
          statusText: ""
        })
    };

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: RelationConfigService,
            useValue: {}
          },
          RelationService,
          { provide: HttpService, useValue: httpServiceMockMultiHas }
        ]
      }).compile();
      service = module.get<RelationService>(RelationService);
    });

    it("multiHas should equal to an array of relation entities ", async () => {
      const dto: RelationMultiHasReqDto = {
        from: { id: "", type: RelationEntityType.album },
        relationType: RelationType.follows,
        tos: [{ id: "", type: RelationEntityType.album }]
      };
      expect(await service.multiHas(dto)).toEqual([relationMultiHas]);
    });
  });
});
