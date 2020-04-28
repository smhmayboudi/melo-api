import { Test, TestingModule } from "@nestjs/testing";

import { AlbumArtistAlbumsReqDto } from "./dto/req/album.artist-albums.req.dto";
import { AlbumByIdReqDto } from "./dto/req/album.by-id.req.dto";
import { AlbumController } from "./album.controller";
import { AlbumLatestReqDto } from "./dto/req/album.latest.req.dto";
import { AlbumService } from "./album.service";
import { AlbumServiceInterface } from "./album.service.interface";
import { AppArtistServceInterface } from "../app/app.artist.service.interface";
import { AppArtistService } from "../app/app.artist.service";
import { AppEncodingService } from "../app/app.encoding.service";
import { AppEncodingServiceInterface } from "../app/app.encoding.service.interface";
import { AppHashIdService } from "../app/app.hash-id.service";
import { AppHashIdServiceInterface } from "../app/app.hash-id.service.interface";
import { AppSongService } from "../app/app.song.service";
import { AppSongServiceInterface } from "../app/app.song.service.interface";
import { DataAlbumResDto } from "../data/dto/res/data.album.res.dto";
import { DataArtistResDto } from "../data/dto/res/data.artist.res.dto";
import { DataArtistType } from "../data/data.artist.type";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataPlaylistResDto } from "../data/dto/res/data.playlist.res.dto";
import { DataSearchResDto } from "../data/dto/res/data.search.res.dto";
import { DataSearchType } from "../data/data.search.type";
import { DataSongResDto } from "../data/dto/res/data.song.res.dto";

describe("AlbumController", () => {
  const releaseDate = new Date();
  const album: DataAlbumResDto = {
    name: "",
    releaseDate,
  };
  const artist: DataArtistResDto = {
    followersCount: 0,
    id: 0,
    type: DataArtistType.prime,
  };
  const albumPagination: DataPaginationResDto<DataAlbumResDto> = {
    results: [album],
    total: 1,
  } as DataPaginationResDto<DataAlbumResDto>;
  const song: DataSongResDto = {
    artists: [
      {
        followersCount: 0,
        id: 0,
        type: DataArtistType.feat,
      },
    ],
    audio: {},
    duration: 0,
    id: 0,
    localized: false,
    releaseDate,
    title: "",
  };
  const playlist: DataPlaylistResDto = {
    followersCount: 0,
    id: "",
    image: {
      "": {
        url: "",
      },
    },
    isPublic: false,
    releaseDate,
    title: "",
    tracksCount: 0,
  };

  const appSongMock: AppSongServiceInterface = {
    like: (): Promise<DataSongResDto[]> => Promise.resolve([song]),
    localize: (): DataSongResDto[] => [song],
  };
  const appArtistMock: AppArtistServceInterface = {
    follow: (): Promise<DataArtistResDto[]> => Promise.resolve([artist]),
  };
  const albumServiceMock: AlbumServiceInterface = {
    artistAlbums: (): Promise<DataPaginationResDto<DataAlbumResDto>> =>
      Promise.resolve(albumPagination),
    byId: (): Promise<DataAlbumResDto> => Promise.resolve(album),
    latest: (): Promise<DataPaginationResDto<DataAlbumResDto>> =>
      Promise.resolve(albumPagination),
  };
  const search: DataSearchResDto = {
    type: DataSearchType.album,
  };
  const appEncodingServiceMock: AppEncodingServiceInterface = {
    album: (): DataAlbumResDto[] => [album],
    artist: (): DataArtistResDto[] => [artist],
    playlist: (): DataPlaylistResDto[] => [playlist],
    search: (): DataSearchResDto[] => [search],
    song: (): DataSongResDto[] => [song],
  };
  const appHashIdServiceMock: AppHashIdServiceInterface = {
    decode: (): number => 0,
    encode: (): string => "",
  };

  let controller: AlbumController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlbumController],
      providers: [
        { provide: AlbumService, useValue: albumServiceMock },
        { provide: AppEncodingService, useValue: appEncodingServiceMock },
        { provide: AppHashIdService, useValue: appHashIdServiceMock },
        { provide: AppSongService, useValue: appSongMock },
        { provide: AppArtistService, useValue: appArtistMock },
      ],
    }).compile();
    controller = module.get<AlbumController>(AlbumController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("artistAlbums should equal list of albums", async () => {
    const dto: AlbumArtistAlbumsReqDto = {
      artistId: 0,
      from: 0,
      limit: 0,
    };
    expect(await controller.artistAlbums(dto)).toEqual(albumPagination);
  });

  it("byId should be equal to an album", async () => {
    const dto: AlbumByIdReqDto = {
      id: 0,
    };
    expect(await controller.byId(dto)).toEqual(album);
  });

  it("latest should equal list of albums", async () => {
    const dto: AlbumLatestReqDto = {
      from: 0,
      language: "",
      limit: 0,
    };
    expect(await controller.latest(dto)).toEqual(albumPagination);
  });
});
