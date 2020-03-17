import { Observable, of } from "rxjs";
import { Test, TestingModule } from "@nestjs/testing";

import { AxiosResponse } from "axios";
import { DataAlbumArtistsReqDto } from "./dto/req/data.album.artists.req.dto";
import { DataAlbumByIdReqDto } from "./dto/req/data.album.by-id.req.dto";
import { DataAlbumLatestReqDto } from "./dto/req/data.album.latest.req.dto";
import { DataAlbumResDto } from "./dto/res/data.album.res.dto";
import { DataAlbumService } from "./data.album.service";
import { DataConfigService } from "./data.config.service";
import { DataConfigServiceInterface } from "./data.config.service.interface";
import { DataPaginationResDto } from "./dto/res/data.pagination.res.dto";
import { HttpService } from "@nestjs/common";

describe("DataAlbumService", () => {
  const releaseDate = new Date();
  const album: DataAlbumResDto = {
    name: "",
    releaseDate
  };
  const albumPagination: DataPaginationResDto<DataAlbumResDto> = {
    results: [album],
    total: 1
  } as DataPaginationResDto<DataAlbumResDto>;

  const dataConfigServiceMock: DataConfigServiceInterface = {
    timeout: 0,
    url: ""
  };
  // TODO: interface ?
  const httpServiceMock = {
    get: (): Observable<AxiosResponse<DataPaginationResDto<DataAlbumResDto>>> =>
      of({
        config: {},
        data: albumPagination,
        headers: {},
        status: 200,
        statusText: ""
      })
  };

  let service: DataAlbumService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DataAlbumService,
        { provide: DataConfigService, useValue: dataConfigServiceMock },
        { provide: HttpService, useValue: httpServiceMock }
      ]
    }).compile();
    service = module.get<DataAlbumService>(DataAlbumService);
  });

  it("albums should equal list of albums", async () => {
    const dto: DataAlbumArtistsReqDto = {
      from: 0,
      id: 0,
      limit: 0
    };
    expect(await service.albums(dto)).toEqual(albumPagination);
  });

  it("latest should equal list of albums", async () => {
    const dto: DataAlbumLatestReqDto = {
      from: 0,
      language: "",
      limit: 0
    };
    expect(await service.latest(dto)).toEqual(albumPagination);
  });

  describe("single: album", () => {
    // TODO: interface ?
    const httpServiceMockSingleAlbum = {
      ...httpServiceMock,
      get: (): Observable<AxiosResponse<DataAlbumResDto>> =>
        of({
          config: {},
          data: album,
          headers: {},
          status: 200,
          statusText: ""
        })
    };

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          DataAlbumService,
          { provide: DataConfigService, useValue: dataConfigServiceMock },
          { provide: HttpService, useValue: httpServiceMockSingleAlbum }
        ]
      }).compile();
      service = module.get<DataAlbumService>(DataAlbumService);
    });

    it("byId should be equal to an album", async () => {
      const dto: DataAlbumByIdReqDto = {
        id: 0
      };
      expect(await service.byId(dto)).toEqual(album);
    });
  });
});
