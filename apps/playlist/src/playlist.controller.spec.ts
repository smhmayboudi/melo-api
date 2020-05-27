import {
  DataConfigElasticSearchReqDto,
  DataConfigImageReqDto,
  DataPaginationResDto,
  PlaylistAddSongReqDto,
  PlaylistConfigReqDto,
  PlaylistCreateReqDto,
  PlaylistDeleteReqDto,
  PlaylistEditReqDto,
  PlaylistGetReqDto,
  PlaylistMyReqDto,
  PlaylistRemoveSongReqDto,
  PlaylistResDto,
  PlaylistTopReqDto,
} from "@melo/common";
import { Test, TestingModule } from "@nestjs/testing";

import { PlaylistController } from "./playlist.controller";
import { PlaylistService } from "./playlist.service";
import { PlaylistServiceInterface } from "./playlist.service.interface";

describe("PlaylistController", () => {
  const config: PlaylistConfigReqDto = {
    imagePath: "",
    imagePathDefaultPlaylist: "",
  };
  const dataConfigElasticSearch: DataConfigElasticSearchReqDto = {
    imagePath: "",
    imagePathDefaultAlbum: "",
    imagePathDefaultArtist: "",
    imagePathDefaultSong: "",
    indexName: "",
    maxSize: 0,
    mp3Endpoint: "",
  };
  const dataConfigImage: DataConfigImageReqDto = {
    imageBaseUrl: "",
    imageEncode: true,
    imageKey: "",
    imageSalt: "",
    imageSignatureSize: 1,
    imageTypeSize: [
      {
        height: 0,
        name: "",
        width: 0,
      },
    ],
  };
  const releaseDate = new Date();
  const playlist: PlaylistResDto = {
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
  const playlistPagination: DataPaginationResDto<PlaylistResDto> = {
    results: [playlist],
    total: 1,
  } as DataPaginationResDto<PlaylistResDto>;

  const playlistServiceMock: PlaylistServiceInterface = {
    addSong: (): Promise<PlaylistResDto> => Promise.resolve(playlist),
    create: (): Promise<PlaylistResDto> => Promise.resolve(playlist),
    delete: (): Promise<PlaylistResDto> => Promise.resolve(playlist),
    edit: (): Promise<PlaylistResDto> => Promise.resolve(playlist),
    get: (): Promise<PlaylistResDto> => Promise.resolve(playlist),
    my: (): Promise<DataPaginationResDto<PlaylistResDto>> =>
      Promise.resolve(playlistPagination),
    removeSong: (): Promise<PlaylistResDto> => Promise.resolve(playlist),
    top: (): Promise<DataPaginationResDto<PlaylistResDto>> =>
      Promise.resolve(playlistPagination),
  };

  let controller: PlaylistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
      config,
      dataConfigElasticSearch,
      dataConfigImage,
      playlistId: "000000000000",
      songId: 0,
    };
    expect(await controller.addSong(dto)).toEqual(playlist);
  });

  it("create should be equal to a playlist", async () => {
    const dto: PlaylistCreateReqDto = {
      config,
      dataConfigElasticSearch,
      dataConfigImage,
      sub: 1,
      title: "",
    };
    expect(await controller.create(dto)).toEqual(playlist);
  });

  it("delete should be equal to a playlist", async () => {
    const dto: PlaylistDeleteReqDto = {
      config,
      dataConfigElasticSearch,
      dataConfigImage,
      id: "",
      sub: 1,
    };
    expect(await controller.delete(dto)).toEqual(playlist);
  });

  it("edit should be equal to a playlist", async () => {
    const dto: PlaylistEditReqDto = {
      config,
      dataConfigElasticSearch,
      dataConfigImage,
      id: "",
    };
    expect(await controller.edit(dto)).toEqual(playlist);
  });

  it("get should be equal to a playlist", async () => {
    const dto: PlaylistGetReqDto = {
      config,
      dataConfigElasticSearch,
      dataConfigImage,
      id: "",
    };
    expect(await controller.get(dto)).toEqual(playlist);
  });

  it("my should be equal to a list of playlists", async () => {
    const dto: PlaylistMyReqDto = {
      config,
      dataConfigElasticSearch,
      dataConfigImage,
      from: 0,
      size: 0,
      sub: 1,
    };
    expect(await controller.my(dto)).toEqual(playlistPagination);
  });

  it("removeSong should be equal to a playlist", async () => {
    const dto: PlaylistRemoveSongReqDto = {
      config,
      dataConfigElasticSearch,
      dataConfigImage,
      playlistId: "000000000000",
      songId: 0,
    };
    expect(await controller.removeSong(dto)).toEqual(playlist);
  });

  it("top should be equal to a list of playlists", async () => {
    const dto: PlaylistTopReqDto = {
      config,
      dataConfigElasticSearch,
      dataConfigImage,
      from: 0,
      size: 0,
    };
    expect(await controller.top(dto)).toEqual(playlistPagination);
  });
});
