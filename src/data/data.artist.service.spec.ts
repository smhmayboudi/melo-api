import { HttpService } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AxiosResponse } from "axios";
import { Observable, of } from "rxjs";
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
  const artist: DataArtistResDto = {
    followersCount: 0,
    id: "",
    type: DataArtistType.prime
  };
  const artistPagination: DataPaginationResDto<DataArtistResDto> = {
    results: [artist],
    total: 1
  } as DataPaginationResDto<DataArtistResDto>;

  const dataConfigServiceMock: DataConfigServiceInterface = {
    timeout: 0,
    url: ""
  };
  // TODO: interface ?
  const httpServiceMock = {
    get: (): Observable<
      AxiosResponse<DataPaginationResDto<DataArtistResDto>>
    > =>
      of({
        config: {},
        data: artistPagination,
        headers: {},
        status: 200,
        statusText: ""
      })
  };

  let service: DataArtistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DataArtistService,
        { provide: DataConfigService, useValue: dataConfigServiceMock },
        { provide: HttpService, useValue: httpServiceMock }
      ]
    }).compile();
    service = module.get<DataArtistService>(DataArtistService);
  });

  it("byIds should equal list of artists", async () => {
    const dto: DataArtistByIdsReqDto = {
      ids: []
    };
    expect(await service.byIds(dto)).toEqual(artistPagination);
  });

  it("trending should equal list of artists", async () => {
    expect(await service.trending()).toEqual(artistPagination);
  });

  it("trendingGenre should equal list of artists", async () => {
    const dto: DataTrendingGenreReqDto = {
      genre: ""
    };
    expect(await service.trendingGenre(dto)).toEqual(artistPagination);
  });

  describe("single: artist", () => {
    // TODO: interface ?
    const httpServiceMockSingleArtist = {
      ...httpServiceMock,
      get: (): Observable<AxiosResponse<DataArtistResDto>> =>
        of({
          config: {},
          data: artist,
          headers: {},
          status: 200,
          statusText: ""
        })
    };

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          DataArtistService,
          { provide: DataConfigService, useValue: dataConfigServiceMock },
          { provide: HttpService, useValue: httpServiceMockSingleArtist }
        ]
      }).compile();
      service = module.get<DataArtistService>(DataArtistService);
    });

    it("byId should equal to an artist", async () => {
      const dto: DataArtistByIdReqDto = {
        id: 0
      };
      expect(await service.byId(dto)).toEqual(artist);
    });
  });
});
