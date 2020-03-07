import { HttpService } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { of } from "rxjs";
import { RelationGetReqDto } from "./dto/req/relation.get.req.dto";
import { RelationHasReqDto } from "./dto/req/relation.has.req.dto";
import { RelationMultiHasReqDto } from "./dto/req/relation.multi-has.req.dto";
import { RelationRemoveReqDto } from "./dto/req/relation.remove.req.dto";
import { RelationSetReqDto } from "./dto/req/relation.set.req.dto";
import { RelationEntityResDto } from "./dto/res/relation.entity.res.dto";
import { RelationMultiHasResDto } from "./dto/res/relation.multi-has.res.dto";
import { RelationPaginationResDto } from "./dto/res/relation.pagination.res.dto";
import { RelationConfigService } from "./relation.config.service";
import { RelationConfigServiceInterface } from "./relation.config.service.interface";
import { RelationEntityType } from "./relation.entity.type";
import { RelationService } from "./relation.service";
import { RelationType } from "./relation.type";

describe("RelationService", () => {
  const createdAt = new Date();
  describe("get: relation paginated", () => {
    const relationResult: RelationEntityResDto = {
      id: "",
      type: RelationEntityType.album
    };
    const relationPagination: RelationPaginationResDto<RelationEntityResDto> = {
      results: [relationResult],
      total: 1
    } as RelationPaginationResDto<RelationEntityResDto>;
    const observable = {
      status: 0,
      statusText: "",
      headers: "",
      config: {}
    };
    const dataPaginationObservable = {
      data: relationPagination,
      ...observable
    };
    const dataObservable = {
      data: relationResult,
      ...observable
    };
    const relationHttpServiceMock = {
      get: (): any => dataObservable
    };
    const relationConfigServiceMock: RelationConfigServiceInterface = {
      timeout: 0,
      url: ""
    };

    let service: RelationService;
    let httpService: HttpService;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: RelationConfigService,
            useValue: relationConfigServiceMock
          },
          RelationService,
          { provide: HttpService, useValue: relationHttpServiceMock }
        ]
      }).compile();
      service = module.get<RelationService>(RelationService);
      httpService = module.get<HttpService>(HttpService);
    });
    it("get should return a list of relation entities", async () => {
      const dto: RelationGetReqDto = {
        from: 0,
        fromEntityDto: {
          id: "",
          type: RelationEntityType.album
        },
        limit: 0,
        relationType: RelationType.follows
      };
      jest
        .spyOn(httpService, "get")
        .mockImplementationOnce(() => of(dataPaginationObservable));
      expect(await service.get(dto)).toEqual(relationPagination);
    });
  });

  describe("get: boolean", () => {
    const observable = {
      status: 0,
      statusText: "",
      headers: "",
      config: {}
    };
    const dataObservable = {
      data: true,
      ...observable
    };
    const relationHttpServiceMock = {
      get: (): any => dataObservable,
      delete: (): any => dataObservable,
      post: (): any => dataObservable
    };
    const relationConfigServiceMock: RelationConfigServiceInterface = {
      timeout: 0,
      url: ""
    };

    let service: RelationService;
    let httpService: HttpService;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: RelationConfigService,
            useValue: relationConfigServiceMock
          },
          RelationService,
          { provide: HttpService, useValue: relationHttpServiceMock }
        ]
      }).compile();
      service = module.get<RelationService>(RelationService);
      httpService = module.get<HttpService>(HttpService);
    });

    it("has should be defined", async () => {
      const dto: RelationHasReqDto = {
        from: { id: "0", type: RelationEntityType.album },
        to: { id: "0", type: RelationEntityType.album },
        relationType: RelationType.follows
      };
      jest
        .spyOn(httpService, "get")
        .mockImplementation(() => of(dataObservable));
      expect(await service.has(dto)).toBe(undefined);
    });

    it("remove should be defined", async () => {
      const dto: RelationRemoveReqDto = {
        from: { id: "", type: RelationEntityType.album },
        to: { id: "", type: RelationEntityType.album },
        relationType: RelationType.follows
      };
      jest
        .spyOn(httpService, "delete")
        .mockImplementation(() => of(dataObservable));
      expect(await service.remove(dto)).toBe(undefined);
    });

    it("set should be defined", async () => {
      const dto: RelationSetReqDto = {
        createdAt,
        from: { id: "", type: RelationEntityType.album },
        to: { id: "", type: RelationEntityType.album },
        relationType: RelationType.follows
      };
      jest
        .spyOn(httpService, "post")
        .mockImplementation(() => of(dataObservable));
      expect(await service.set(dto)).toBe(undefined);
    });
  });

  describe("multihas", () => {
    const relationMultiHas: RelationMultiHasResDto = {
      from: { id: "", type: RelationEntityType.album },
      to: { id: "", type: RelationEntityType.album },
      relation: RelationType.follows
    };
    const observable = {
      status: 0,
      statusText: "",
      headers: "",
      config: {}
    };
    const dataObservable = {
      data: [relationMultiHas],
      ...observable
    };
    const relationHttpServiceMock = {
      get: (): any => dataObservable
    };
    const relationConfigServiceMock: RelationConfigServiceInterface = {
      timeout: 0,
      url: ""
    };

    let service: RelationService;
    let httpService: HttpService;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: RelationConfigService,
            useValue: relationConfigServiceMock
          },
          RelationService,
          { provide: HttpService, useValue: relationHttpServiceMock }
        ]
      }).compile();
      service = module.get<RelationService>(RelationService);
      httpService = module.get<HttpService>(HttpService);
    });

    it("multiHas should return an array of relation entities ", async () => {
      const dto: RelationMultiHasReqDto = {
        from: { id: "", type: RelationEntityType.album },
        tos: [{ id: "", type: RelationEntityType.album }],
        relationType: RelationType.follows
      };
      jest
        .spyOn(httpService, "get")
        .mockImplementation(() => of(dataObservable));

      expect(await service.multiHas(dto)).toEqual([relationMultiHas]);
    });
  });
});
