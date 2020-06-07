import {
  PlaylistAddSongReqDto,
  PlaylistCreateReqDto,
  PlaylistDeleteReqDto,
  PlaylistEditReqDto,
  PlaylistGetReqDto,
  PlaylistMyReqDto,
  PlaylistRemoveSongReqDto,
  PlaylistResDto,
  PlaylistTopReqDto,
} from "@melo/common";

import { PlaylistController } from "./playlist.controller";
import { PlaylistService } from "./playlist.service";
import { PlaylistServiceInterface } from "./playlist.service.interface";
import { Test } from "@nestjs/testing";

describe("PlaylistController", () => {
  const releaseDate = new Date();
  const playlist: PlaylistResDto = {
    followersCount: 0,
    id: "000000000000000000000000",
    image: {
      cover: {
        url:
          "Cz6suIAYeF_rXp18UTsU4bHL-gaGsq2PpE2_dLMWj9s/rs:fill:1024:1024:1/dpr:1/plain/asset/pop.jpg",
      },
    },
    isPublic: false,
    releaseDate,
    title: "",
    tracksCount: 0,
  };
  const playlistServiceMock: PlaylistServiceInterface = {
    addSong: () => Promise.resolve(playlist),
    create: () => Promise.resolve(playlist),
    delete: () => Promise.resolve(playlist),
    edit: () => Promise.resolve(playlist),
    get: () => Promise.resolve(playlist),
    my: () => Promise.resolve([playlist]),
    removeSong: () => Promise.resolve(playlist),
    top: () => Promise.resolve([playlist]),
  };

  let controller: PlaylistController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [PlaylistController],
      providers: [{ provide: PlaylistService, useValue: playlistServiceMock }],
    }).compile();
    controller = module.get<PlaylistController>(PlaylistController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("addSong should be equal to a playlist", async () => {
    const dto: PlaylistAddSongReqDto = {
      playlistId: "000000000000",
      songId: 0,
    };
    expect(await controller.addSong(dto)).toEqual(playlist);
  });

  it("create should be equal to a playlist", async () => {
    const dto: PlaylistCreateReqDto = {
      sub: 1,
      title: "",
    };
    expect(await controller.create(dto)).toEqual(playlist);
  });

  it("delete should be equal to a playlist", async () => {
    const dto: PlaylistDeleteReqDto = {
      id: "",
      sub: 1,
    };
    expect(await controller.delete(dto)).toEqual(playlist);
  });

  it("edit should be equal to a playlist", async () => {
    const dto: PlaylistEditReqDto = {
      id: "",
    };
    expect(await controller.edit(dto)).toEqual(playlist);
  });

  it("get should be equal to a playlist", async () => {
    const dto: PlaylistGetReqDto = {
      id: "",
    };
    expect(await controller.get(dto)).toEqual(playlist);
  });

  it("my should be equal to a list of playlists", async () => {
    const dto: PlaylistMyReqDto = {
      from: 0,
      size: 0,
      sub: 1,
    };
    expect(await controller.my(dto)).toEqual([playlist]);
  });

  it("removeSong should be equal to a playlist", async () => {
    const dto: PlaylistRemoveSongReqDto = {
      playlistId: "000000000000",
      songId: 0,
    };
    expect(await controller.removeSong(dto)).toEqual(playlist);
  });

  it("top should be equal to a list of playlists", async () => {
    const dto: PlaylistTopReqDto = {
      from: 0,
      size: 0,
    };
    expect(await controller.top(dto)).toEqual([playlist]);
  });
});
