import { HttpService } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { of } from "rxjs";
import { DataAlbumService } from "./data.album.service";
import { DataConfigService } from "./data.config.service";
import { DataConfigServiceInterface } from "./data.config.service.interface";
import { DataAlbumArtistsReqDto } from "./dto/req/data.album.artists.req.dto";
import { DataAlbumByIdReqDto } from "./dto/req/data.album.by-id.req.dto";
import { DataAlbumLatestReqDto } from "./dto/req/data.album.latest.req.dto";
import { DataAlbumResDto } from "./dto/res/data.album.res.dto";
import { DataPaginationResDto } from "./dto/res/data.pagination.res.dto";

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
  const observable = {
    status: 0,
    statusText: "",
    headers: "",
    config: {}
  };
  const dataPaginationObservable = {
    data: albumPagination,
    ...observable
  };
  const dataObservable = {
    data: album,
    ...observable
  };
  const dataConfigServiceMock: DataConfigServiceInterface = {
    timeout: 0,
    url: ""
  };

  it("albums should return list of albums", async () => {
    const albumHttpServiceMock = {
      get: (): any => dataPaginationObservable
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DataAlbumService,
        { provide: DataConfigService, useValue: dataConfigServiceMock },
        { provide: HttpService, useValue: albumHttpServiceMock }
      ]
    }).compile();
    const service = module.get<DataAlbumService>(DataAlbumService);
    const httpService = module.get<HttpService>(HttpService);
    const dto: DataAlbumArtistsReqDto = {
      from: 0,
      id: 0,
      limit: 0
    };
    jest
      .spyOn(httpService, "get")
      .mockImplementationOnce(() => of(dataPaginationObservable));
    expect(await service.albums(dto)).toEqual(albumPagination);
  });

  it("byId should return an album", async () => {
    const albumHttpServiceMock = {
      get: (): any => dataObservable
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DataAlbumService,
        { provide: DataConfigService, useValue: dataConfigServiceMock },
        { provide: HttpService, useValue: albumHttpServiceMock }
      ]
    }).compile();
    const service = module.get<DataAlbumService>(DataAlbumService);
    const httpService = module.get<HttpService>(HttpService);
    const dto: DataAlbumByIdReqDto = {
      id: 0
    };
    jest
      .spyOn(httpService, "get")
      .mockImplementationOnce(() => of(dataObservable));
    expect(await service.byId(dto)).toEqual(album);
  });

  it("latest should return list of albums", async () => {
    const albumHttpServiceMock = {
      get: (): any => dataPaginationObservable
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DataAlbumService,
        { provide: DataConfigService, useValue: dataConfigServiceMock },
        { provide: HttpService, useValue: albumHttpServiceMock }
      ]
    }).compile();
    const service = module.get<DataAlbumService>(DataAlbumService);
    const httpService = module.get<HttpService>(HttpService);
    const dto: DataAlbumLatestReqDto = {
      from: 0,
      language: "",
      limit: 0
    };
    jest
      .spyOn(httpService, "get")
      .mockImplementationOnce(() => of(dataPaginationObservable));
    expect(await service.latest(dto)).toEqual(albumPagination);
  });
});
