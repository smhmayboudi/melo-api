import { Test, TestingModule } from "@nestjs/testing";
import { AppHashIdService } from "../app/app.hash-id.service";
import { AppMixArtistService } from "../app/app.mix-artist.service";
import { AppMixSongService } from "../app/app.mix-song.service";
import { DataAlbumService } from "../data/data.album.service";
import { DataArtistType } from "../data/data.artist.type";
import { DataAlbumResDto } from "../data/dto/res/data.album.res.dto";
import { DataArtistResDto } from "../data/dto/res/data.artist.res.dto";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataSongResDto } from "../data/dto/res/data.song.res.dto";
import { AlbumController } from "./album.controller";
import { AlbumService } from "./album.service";

describe("AlbumController", () => {
  const releaseDate = new Date();
  const appHashIdServiceMock = {
    decode: (): string => "",
    encode: (): string => ""
  };
  const mixArtist: DataArtistResDto = {
    followersCount: 0,
    id: "",
    type: DataArtistType.prime
  };
  const mixSong: DataSongResDto = {
    artists: [mixArtist],
    audio: {},
    duration: 0,
    id: "",
    localized: false,
    releaseDate: new Date(),
    title: ""
  };
  const appMixArtistServiceMock = {
    mixArtist: (): DataArtistResDto[] => [mixArtist]
  };
  const appMixSongServiceMock = {
    mixSong: (): DataSongResDto[] => [mixSong]
  };
  const album: DataAlbumResDto = {
    name: "",
    releaseDate
  };
  const albumPagination: DataPaginationResDto<DataAlbumResDto> = {
    results: [album],
    total: 1
  } as DataPaginationResDto<DataAlbumResDto>;
  const dataAlbumServiceMock = {
    albums: (): DataPaginationResDto<DataAlbumResDto> => albumPagination,
    byId: (): DataAlbumResDto => album,
    latest: (): DataPaginationResDto<DataAlbumResDto> => albumPagination
  };

  let controller: AlbumController;
  let service: AlbumService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlbumController],
      providers: [
        AlbumService,
        { provide: AppHashIdService, useValue: appHashIdServiceMock },
        { provide: AppMixArtistService, useValue: appMixArtistServiceMock },
        { provide: AppMixSongService, useValue: appMixSongServiceMock },
        { provide: DataAlbumService, useValue: dataAlbumServiceMock }
      ]
    }).compile();
    controller = module.get<AlbumController>(AlbumController);
    service = module.get<AlbumService>(AlbumService);
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
    jest
      .spyOn(service, "artistAlbums")
      .mockImplementation(() => Promise.resolve(albumPagination));
    expect(await controller.artistAlbums(req, 0, 0)).toEqual(albumPagination);
  });

  it("byId should return an album", async () => {
    const req = {
      id: ""
    };
    jest
      .spyOn(service, "byId")
      .mockImplementation(() => Promise.resolve(album));
    expect(await controller.byId(req, 0, 0)).toEqual(album);
  });

  it("latest should return list of albums", async () => {
    const req = {
      from: 0,
      language: "",
      limit: 0
    };
    jest
      .spyOn(service, "latest")
      .mockImplementation(() => Promise.resolve(albumPagination));
    expect(await controller.latest(req)).toEqual(albumPagination);
  });
});
