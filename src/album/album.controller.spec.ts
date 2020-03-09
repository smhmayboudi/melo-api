import { Test, TestingModule } from "@nestjs/testing";
import { AppHashIdService } from "../app/app.hash-id.service";
import { AppHashIdServiceInterface } from "../app/app.hash-id.service.interface";
import { DataAlbumResDto } from "../data/dto/res/data.album.res.dto";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { AlbumController } from "./album.controller";
import { AlbumService } from "./album.service";
import { AlbumServiceInterface } from "./album.service.interface";
import { AlbumArtistAlbumsReqDto } from "./dto/req/album.artist-albums.req.dto";
import { AlbumByIdReqDto } from "./dto/req/album.by-id.req.dto";
import { AlbumLatestReqDto } from "./dto/req/album.latest.req.dto";

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

  const albumServiceMock: AlbumServiceInterface = {
    artistAlbums: (): Promise<DataPaginationResDto<DataAlbumResDto>> =>
      Promise.resolve(albumPagination),
    byId: (): Promise<DataAlbumResDto> => Promise.resolve(album),
    latest: (): Promise<DataPaginationResDto<DataAlbumResDto>> =>
      Promise.resolve(albumPagination)
  };
  const appHashIdServiceMock: AppHashIdServiceInterface = {
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

  it("artistAlbums should equal list of albums", async () => {
    const dto: AlbumArtistAlbumsReqDto = {
      artistId: "0",
      from: 0,
      limit: 0
    };
    expect(await controller.artistAlbums(dto, 0, 0)).toEqual(albumPagination);
  });

  it("byId should equal to an album", async () => {
    const dto: AlbumByIdReqDto = {
      id: "0"
    };
    expect(await controller.byId(dto, 0, 0)).toEqual(album);
  });

  it("latest should equal list of albums", async () => {
    const dto: AlbumLatestReqDto = {
      from: 0,
      language: "",
      limit: 0
    };
    expect(await controller.latest(dto)).toEqual(albumPagination);
  });
});
