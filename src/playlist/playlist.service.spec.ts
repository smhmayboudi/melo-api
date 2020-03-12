import { getModelToken } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { AppImgProxyService } from "../app/app.img-proxy.service";
import { AppImgProxyServiceInterface } from "../app/app.img-proxy.service.interface";
import { DataArtistType } from "../data/data.artist.type";
import { DataSongService } from "../data/data.song.service";
import { DataSongServiceInterface } from "../data/data.song.service.interface";
import { DataImageResDto } from "../data/dto/res/data.image.res.dto";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataPlaylistResDto } from "../data/dto/res/data.playlist.res.dto";
import { DataSongResDto } from "../data/dto/res/data.song.res.dto";
import { PlaylistAddSongReqDto } from "./dto/req/playlist.add-song.req.dto";
import { PlaylistCreateReqDto } from "./dto/req/playlist.create.req.dto";
import { PlaylistDeleteReqDto } from "./dto/req/playlist.delete.req.dto";
import { PlaylistEditReqDto } from "./dto/req/playlist.edit.req.dto";
import { PlaylistGetReqDto } from "./dto/req/playlist.get.req.dto";
import { PlaylistMyReqDto } from "./dto/req/playlist.my.req.dto";
import { PlaylistSongReqDto } from "./dto/req/playlist.song.req.dto";
import { PlaylistTopReqDto } from "./dto/req/playlist.top.req.dto";
import { PlaylistConfigService } from "./playlist.config.service";
import { PlaylistConfigServiceInterface } from "./playlist.config.service.interface";
import { PlaylistService } from "./playlist.service";

describe("PlaylistService", () => {
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
  const songPagination: DataPaginationResDto<DataSongResDto> = {
    results: [song],
    total: 1
  } as DataPaginationResDto<DataSongResDto>;

  const appImgProxyServiceMock: AppImgProxyServiceInterface = {
    generateUrl: (): DataImageResDto => ({
      "": {
        url: ""
      }
    })
  };
  const dataSongServiceMock: DataSongServiceInterface = {
    artistSongs: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    artistSongsTop: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    byId: (): Promise<DataSongResDto> => Promise.resolve(song),
    byIds: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    genre: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    language: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    mood: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    newPodcast: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    newSong: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    podcast: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    searchMood: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    similar: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    slider: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    topDay: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination),
    topWeek: (): Promise<DataPaginationResDto<DataSongResDto>> =>
      Promise.resolve(songPagination)
  };
  const playlistConfigServiceMock: PlaylistConfigServiceInterface = {
    cacheHost: "",
    cacheMax: 0,
    cachePort: 0,
    cacheStore: "",
    cacheTTL: 0,
    defaultImagePath: "",
    imagePath: () => ""
  };
  // TODO: interface ?
  const playlistModelMock = {
    save: () => playlist,
    findById: () => playlist,
    findOne: () => playlist
  };

  let service: PlaylistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: AppImgProxyService, useValue: appImgProxyServiceMock },
        { provide: DataSongService, useValue: dataSongServiceMock },
        { provide: PlaylistConfigService, useValue: playlistConfigServiceMock },
        PlaylistService,
        { provide: getModelToken("Playlist"), useValue: playlistModelMock }
      ]
    }).compile();
    service = module.get<PlaylistService>(PlaylistService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("addSong should be equal to a playlist", async () => {
    const dto: PlaylistAddSongReqDto = {
      playlistId: "000000000000",
      songId: "0"
    };
    expect(await service.addSong(dto, 0)).toEqual(playlist);
  });

  it("create shoud return a playlist", async () => {
    const dto: PlaylistCreateReqDto = {
      title: ""
    };
    expect(await service.create(dto, 0)).toEqual(playlist);
  });

  it("delete should be equal to a playlist", async () => {
    const dto: PlaylistDeleteReqDto = {
      id: ""
    };
    expect(await service.delete(dto, 0)).toEqual(playlist);
  });

  it("edit should be equal to a playlist", async () => {
    const dto: PlaylistEditReqDto = {
      id: ""
    };
    expect(await service.edit(dto)).toEqual(playlist);
  });

  it("deleteSong should be equal to a playlist", async () => {
    const dto: PlaylistSongReqDto = {
      playlistId: "000000000000",
      songId: "0"
    };
    expect(await service.deleteSong(dto, 0)).toEqual(playlist);
  });

  it("get should be equal to a playlist", async () => {
    const dto: PlaylistGetReqDto = {
      id: ""
    };
    expect(await service.get(dto)).toEqual(playlist);
  });

  it("my should be equal to a list playlists", async () => {
    const dto: PlaylistMyReqDto = {
      from: 0,
      limit: 0
    };
    expect(await service.my(dto, 0)).toEqual(playlistPagination);
  });

  it("top should be equal to a list of playlists", async () => {
    const dto: PlaylistTopReqDto = {
      from: 0,
      limit: 0
    };
    expect(await service.top(dto)).toEqual(playlistPagination);
  });
});
