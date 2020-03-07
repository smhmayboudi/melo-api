import { HttpService } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { of } from "rxjs";
import { DataArtistService } from "./data.artist.service";
import { DataArtistType } from "./data.artist.type";
import { DataConfigService } from "./data.config.service";
import { DataConfigServiceInterface } from "./data.config.service.interface";
import { DataArtistByIdReqDto } from "./dto/req/data.artist.by-id.req.dto";
import { DataArtistByIdsReqDto } from "./dto/req/data.artist.by.ids.req.dto";
import { DataTrendingGenreReqDto } from "./dto/req/data.trending-genre.req.dto";
import { DataArtistResDto } from "./dto/res/data.artist.res.dto";
import { DataPaginationResDto } from "./dto/res/data.pagination.res.dto";

describe("DataArtistService", () => {
  describe("paginated artists", () => {
    const artist: DataArtistResDto = {
      followersCount: 0,
      id: "",
      type: DataArtistType.prime
    };
    const artistPagination: DataPaginationResDto<DataArtistResDto> = {
      results: [artist],
      total: 1
    } as DataPaginationResDto<DataArtistResDto>;
    const observable = {
      status: 0,
      statusText: "",
      headers: "",
      config: {}
    };
    const dataPaginationObservable = {
      data: artistPagination,
      ...observable
    };
    const dataConfigServiceMock: DataConfigServiceInterface = {
      timeout: 0,
      url: ""
    };
    beforeEach(async () => {
      const artistHttpServiceMock = {
        get: (): any => dataPaginationObservable
      };

      const module: TestingModule = await Test.createTestingModule({
        providers: [
          DataArtistService,
          { provide: DataConfigService, useValue: dataConfigServiceMock },
          { provide: HttpService, useValue: artistHttpServiceMock }
        ]
      }).compile();
      const service = module.get<DataArtistService>(DataArtistService);
      const httpService = module.get<HttpService>(HttpService);

      it("byIds should return list of artists", async () => {
        const req: DataArtistByIdsReqDto = {
          ids: []
        };
        jest
          .spyOn(httpService, "get")
          .mockImplementationOnce(() => of(dataPaginationObservable));
        expect(await service.byIds(req)).toEqual(artistPagination);
      });

      it("trending should return list of artists", async () => {
        jest
          .spyOn(httpService, "get")
          .mockImplementationOnce(() => of(dataPaginationObservable));
        expect(await service.trending()).toEqual(artistPagination);
      });

      it("trendingGenre should return list of artists", async () => {
        const dto: DataTrendingGenreReqDto = {
          genre: ""
        };
        jest
          .spyOn(httpService, "get")
          .mockImplementationOnce(() => of(dataPaginationObservable));
        expect(await service.trendingGenre(dto)).toEqual(artistPagination);
      });
    });
  });

  describe("single artists", () => {
    const artist: DataArtistResDto = {
      followersCount: 0,
      id: "",
      type: DataArtistType.prime
    };
    const observable = {
      status: 0,
      statusText: "",
      headers: "",
      config: {}
    };
    const dataObservable = {
      data: artist,
      ...observable
    };
    const dataConfigServiceMock: DataConfigServiceInterface = {
      timeout: 0,
      url: ""
    };
    beforeEach(async () => {
      const artistHttpServiceMock = {
        get: (): any => dataObservable
      };

      const module: TestingModule = await Test.createTestingModule({
        providers: [
          DataArtistService,
          { provide: DataConfigService, useValue: dataConfigServiceMock },
          { provide: HttpService, useValue: artistHttpServiceMock }
        ]
      }).compile();
      const service = module.get<DataArtistService>(DataArtistService);
      const httpService = module.get<HttpService>(HttpService);
      it("byId should return an artist", async () => {
        const dto: DataArtistByIdReqDto = {
          id: 0
        };
        jest
          .spyOn(httpService, "get")
          .mockImplementationOnce(() => of(dataObservable));
        expect(await service.byId(dto)).toEqual(artist);
      });
    });
  });
});
