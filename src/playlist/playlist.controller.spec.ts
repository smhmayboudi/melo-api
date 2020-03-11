import { Test, TestingModule } from "@nestjs/testing";
import { AppHashIdService } from "../app/app.hash-id.service";
import { AppHashIdServiceInterface } from "../app/app.hash-id.service.interface";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataPlaylistResDto } from "../data/dto/res/data.playlist.res.dto";
import { PlaylistAddSongReqDto } from "./dto/req/playlist.add-song.req.dto";
import { PlaylistCreateReqDto } from "./dto/req/playlist.create.req.dto";
import { PlaylistDeleteReqDto } from "./dto/req/playlist.delete.req.dto";
import { PlaylistEditReqDto } from "./dto/req/playlist.edit.req.dto";
import { PlaylistGetReqDto } from "./dto/req/playlist.get.req.dto";
import { PlaylistMyReqDto } from "./dto/req/playlist.my.req.dto";
import { PlaylistSongReqDto } from "./dto/req/playlist.song.req.dto";
import { PlaylistTopReqDto } from "./dto/req/playlist.top.req.dto";
import { PlaylistController } from "./playlist.controller";
import { PlaylistService } from "./playlist.service";
import { PlaylistServiceInterface } from "./playlist.service.interface";

describe("PlaylistController", () => {
  const releaseDate = new Date();
  const playlist: DataPlaylistResDto = {
    followersCount: 0,
    id: "",
    image: {
      "": {
        url: ""
      }
    },
    isPublic: false,
    releaseDate,
    title: "",
    tracksCount: 0
  };
  const playlistPagination: DataPaginationResDto<DataPlaylistResDto> = {
    results: [playlist],
    total: 1
  } as DataPaginationResDto<DataPlaylistResDto>;

  const appHashIdServiceMock: AppHashIdServiceInterface = {
    decode: (): number => 0,
    encode: (): string => ""
  };
  const playlistServiceMock: PlaylistServiceInterface = {
    addSong: (): Promise<DataPlaylistResDto> => Promise.resolve(playlist),
    create: (): Promise<DataPlaylistResDto> => Promise.resolve(playlist),
    delete: (): Promise<DataPlaylistResDto> => Promise.resolve(playlist),
    edit: (): Promise<DataPlaylistResDto> => Promise.resolve(playlist),
    deleteSong: (): Promise<DataPlaylistResDto> => Promise.resolve(playlist),
    get: (): Promise<DataPlaylistResDto> => Promise.resolve(playlist),
    my: (): Promise<DataPaginationResDto<DataPlaylistResDto>> =>
      Promise.resolve(playlistPagination),
    top: (): Promise<DataPaginationResDto<DataPlaylistResDto>> =>
      Promise.resolve(playlistPagination)
  };

  let controller: PlaylistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlaylistController],
      providers: [
        { provide: AppHashIdService, useValue: appHashIdServiceMock },
        { provide: PlaylistService, useValue: playlistServiceMock }
      ]
    }).compile();
    controller = module.get<PlaylistController>(PlaylistController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("addSong should equal to a playlist", async () => {
    const dto: PlaylistAddSongReqDto = {
      playlistId: "000000000000",
      songId: "0"
    };
    expect(await controller.addSong(dto, 0)).toEqual(playlist);
  });

  it("create should equal to a playlist", async () => {
    const dto: PlaylistCreateReqDto = {
      title: ""
    };
    expect(await controller.create(dto, 0)).toEqual(playlist);
  });

  it("delete should equal to a playlist", async () => {
    const dto: PlaylistDeleteReqDto = {
      id: ""
    };
    expect(await controller.delete(dto, 0)).toEqual(playlist);
  });

  it("deleteSong should equal to a playlist", async () => {
    const dto: PlaylistSongReqDto = {
      playlistId: "000000000000",
      songId: "0"
    };
    expect(await controller.deleteSong(dto, 0)).toEqual(playlist);
  });

  it("edit should equal to a playlist", async () => {
    const dto: PlaylistEditReqDto = {
      id: ""
    };
    expect(await controller.edit(dto)).toEqual(playlist);
  });

  it("get should equal to a playlist", async () => {
    const dto: PlaylistGetReqDto = {
      id: ""
    };
    expect(await controller.get(dto)).toEqual(playlist);
  });

  it("my should equal to a list of  playlists", async () => {
    const dto: PlaylistMyReqDto = {
      from: 0,
      limit: 0
    };
    expect(await controller.my(dto, 0)).toEqual(playlistPagination);
  });

  it("top should equal to a list of  playlists", async () => {
    const dto: PlaylistTopReqDto = {
      from: 0,
      limit: 0
    };
    expect(await controller.top(dto)).toEqual(playlistPagination);
  });
});
