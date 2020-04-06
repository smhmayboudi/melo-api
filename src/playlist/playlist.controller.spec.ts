import { Test, TestingModule } from "@nestjs/testing";

import { AppHashIdService } from "../app/app.hash-id.service";
import { AppHashIdServiceInterface } from "../app/app.hash-id.service.interface";
import { AppMixSongService } from "../app/app.mix-song.service";
import { AppMixSongServiceInterface } from "../app/app.mix-song.service.interface";
import { DataArtistType } from "../data/data.artist.type";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataPlaylistResDto } from "../data/dto/res/data.playlist.res.dto";
import { DataSongResDto } from "../data/dto/res/data.song.res.dto";
import { PlaylistAddSongReqDto } from "./dto/req/playlist.add-song.req.dto";
import { PlaylistController } from "./playlist.controller";
import { PlaylistCreateReqDto } from "./dto/req/playlist.create.req.dto";
import { PlaylistDeleteReqDto } from "./dto/req/playlist.delete.req.dto";
import { PlaylistEditReqDto } from "./dto/req/playlist.edit.req.dto";
import { PlaylistGetReqDto } from "./dto/req/playlist.get.req.dto";
import { PlaylistMyReqDto } from "./dto/req/playlist.my.req.dto";
import { PlaylistService } from "./playlist.service";
import { PlaylistServiceInterface } from "./playlist.service.interface";
import { PlaylistSongReqDto } from "./dto/req/playlist.song.req.dto";
import { PlaylistTopReqDto } from "./dto/req/playlist.top.req.dto";

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
  const song: DataSongResDto = {
    artists: [
      {
        followersCount: 0,
        id: "",
        type: DataArtistType.feat
      }
    ],
    audio: {},
    duration: 0,
    id: "",
    localized: false,
    releaseDate,
    title: ""
  };

  const appHashIdServiceMock: AppHashIdServiceInterface = {
    decode: (): number => 0,
    encode: (): string => ""
  };
  const appMixSongServiceMock: AppMixSongServiceInterface = {
    mixSong: (): Promise<DataSongResDto[]> => Promise.resolve([song])
  };
  const playlistServiceMock: PlaylistServiceInterface = {
    addSong: (): Promise<DataPlaylistResDto> => Promise.resolve(playlist),
    create: (): Promise<DataPlaylistResDto> => Promise.resolve(playlist),
    delete: (): Promise<DataPlaylistResDto> => Promise.resolve(playlist),
    deleteSong: (): Promise<DataPlaylistResDto> => Promise.resolve(playlist),
    edit: (): Promise<DataPlaylistResDto> => Promise.resolve(playlist),
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
        { provide: PlaylistService, useValue: playlistServiceMock },
        { provide: AppMixSongService, useValue: appMixSongServiceMock }
      ]
    }).compile();
    controller = module.get<PlaylistController>(PlaylistController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("addSong should be equal to a playlist", async () => {
    const dto: PlaylistAddSongReqDto = {
      playlistId: "000000000000",
      songId: "0"
    };
    expect(await controller.addSong(dto, 0)).toEqual(playlist);
  });

  it("create should be equal to a playlist", async () => {
    const dto: PlaylistCreateReqDto = {
      title: ""
    };
    expect(await controller.create(dto, 0)).toEqual(playlist);
  });

  it("delete should be equal to a playlist", async () => {
    const dto: PlaylistDeleteReqDto = {
      id: ""
    };
    expect(await controller.delete(dto, 0)).toEqual(playlist);
  });

  it("deleteSong should be equal to a playlist", async () => {
    const dto: PlaylistSongReqDto = {
      playlistId: "000000000000",
      songId: "0"
    };
    expect(await controller.deleteSong(dto, 0)).toEqual(playlist);
  });

  it("edit should be equal to a playlist", async () => {
    const dto: PlaylistEditReqDto = {
      id: ""
    };
    expect(await controller.edit(dto)).toEqual(playlist);
  });

  it("get should be equal to a playlist", async () => {
    const dto: PlaylistGetReqDto = {
      id: ""
    };
    expect(await controller.get(dto)).toEqual(playlist);
  });

  it("my should be equal to a list of  playlists", async () => {
    const dto: PlaylistMyReqDto = {
      from: 0,
      limit: 0
    };
    expect(await controller.my(dto, 0)).toEqual(playlistPagination);
  });

  it("top should be equal to a list of  playlists", async () => {
    const dto: PlaylistTopReqDto = {
      from: 0,
      limit: 0
    };
    expect(await controller.top(dto)).toEqual(playlistPagination);
  });
});
