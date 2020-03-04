import { Test, TestingModule } from "@nestjs/testing";
import { AppHashIdService } from "../app/app.hash-id.service";
import { AppMixArtistService } from "../app/app.mix-artist.service";
import { AppMixSongService } from "../app/app.mix-song.service";
import { DataAlbumService } from "../data/data.album.service";
import { DataArtistType } from "../data/data.artist.type";
import { DataAlbumResDto } from "../data/dto/res/data.album.res.dto";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { AlbumController } from "./album.controller";
import { AlbumService } from "./album.service";

describe("AlbumController", () => {
  const releaseDate = new Date();
  const appHashIdServiceMock = {
    decode: () => "",
    encode: () => ""
  };
  const mixArtist = {
    followersCount: 0,
    id: "",
    type: DataArtistType.prime
  };
  const mixSong = {
    artists: [mixArtist],
    audio: {},
    duration: 0,
    id: "",
    localized: false,
    releaseDate: new Date(),
    title: ""
  };
  const appMixArtistServiceMock = {
    mixArtist: () => {
      [mixArtist];
    }
  };
  const appMixSongServiceMock = {
    mixSong: () => {
      [mixSong];
    }
  };
  const album = {
    name: "",
    releaseDate
  };
  const dataAlbumServiceMock = {
    albums: () => ({
      results: [album],
      total: 1
    }),
    byId: () => album,
    latest: () => ({
      results: [album],
      total: 1
    })
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
    const res = {
      results: [
        {
          name: "",
          releaseDate
        }
      ],
      total: 1
    } as DataPaginationResDto<DataAlbumResDto>;
    jest
      .spyOn(service, "artistAlbums")
      .mockImplementation(() => Promise.resolve(res));
    expect(await controller.artistAlbums(req, 0, 0)).toEqual(res);
  });

  it("byId should return an album", async () => {
    const req = {
      id: ""
    };
    const res = {
      name: "",
      releaseDate
    };
    jest.spyOn(service, "byId").mockImplementation(() => Promise.resolve(res));
    expect(await controller.byId(req, 0, 0)).toEqual(res);
  });

  it("latest should return list of albums", async () => {
    const req = {
      from: 0,
      language: "",
      limit: 0
    };
    const res = {
      results: [
        {
          name: "",
          releaseDate
        }
      ],
      total: 1
    } as DataPaginationResDto<DataAlbumResDto>;
    jest
      .spyOn(service, "latest")
      .mockImplementation(() => Promise.resolve(res));
    expect(await controller.latest(req)).toEqual(res);
  });
});
