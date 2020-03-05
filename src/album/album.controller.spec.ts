import { Test, TestingModule } from "@nestjs/testing";
import { AppHashIdService } from "../app/app.hash-id.service";
import { DataAlbumResDto } from "../data/dto/res/data.album.res.dto";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { AlbumController } from "./album.controller";
import { AlbumService } from "./album.service";

describe("AlbumController", () => {
  const releaseDate = new Date();
  const album: DataAlbumResDto = {
    name: "",
    releaseDate
  };
  const albumPagination: DataPaginationResDto<DataAlbumResDto> = {
    results: [album],
    total: 1
  } as DataPaginationResDto<DataAlbumResDto>;
  const albumServiceMock = {
    artistAlbums: () => albumPagination,
    byId: () => album,
    latest: () => albumPagination
  };
  const appHashIdServiceMock = {
    decode: (): number => 0,
    encode: (): string => ""
  };

  let controller: AlbumController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlbumController],
      providers: [
        { provide: AlbumService, useValue: albumServiceMock },
        { provide: AppHashIdService, useValue: appHashIdServiceMock }
      ]
    }).compile();
    controller = module.get<AlbumController>(AlbumController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("artistAlbums should return list of albums", async () => {
    const req = {
      artistId: "",
      from: 0,
      limit: 0
    };
    expect(await controller.artistAlbums(req, 0, 0)).toEqual(albumPagination);
  });

  it("byId should return an album", async () => {
    const req = {
      id: ""
    };
    expect(await controller.byId(req, 0, 0)).toEqual(album);
  });

  it("latest should return list of albums", async () => {
    const req = {
      from: 0,
      language: "",
      limit: 0
    };
    expect(await controller.latest(req)).toEqual(albumPagination);
  });
});
