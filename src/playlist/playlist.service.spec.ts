import { Test, TestingModule } from "@nestjs/testing";

import { AppImgProxyService } from "../app/app.img-proxy.service";
import { AppImgProxyServiceInterface } from "../app/app.img-proxy.service.interface";
import { DataArtistType } from "../data/data.artist.type";
import { DataImageResDto } from "../data/dto/res/data.image.res.dto";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataPlaylistResDto } from "../data/dto/res/data.playlist.res.dto";
import { DataSongResDto } from "../data/dto/res/data.song.res.dto";
import { DataSongService } from "../data/data.song.service";
import { DataSongServiceInterface } from "../data/data.song.service.interface";
import { PlaylistAddSongReqDto } from "./dto/req/playlist.add-song.req.dto";
import { PlaylistConfigService } from "./playlist.config.service";
import { PlaylistConfigServiceInterface } from "./playlist.config.service.interface";
import { PlaylistDeleteReqDto } from "./dto/req/playlist.delete.req.dto";
import { PlaylistEditReqDto } from "./dto/req/playlist.edit.req.dto";
import { PlaylistGetReqDto } from "./dto/req/playlist.get.req.dto";
import { PlaylistService } from "./playlist.service";
import { PlaylistSongReqDto } from "./dto/req/playlist.song.req.dto";
import { getModelToken } from "@nestjs/mongoose";

describe("PlaylistService", () => {
  const releaseDate = new Date();
  const id = "000000000000000000000000";
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
  const playlist: DataPlaylistResDto = {
    followersCount: 0,
    id,
    image: {
      "": {
        url: ""
      }
    },
    isPublic: false,
    releaseDate,
    title: "",
    tracksCount: 1
  };
  // const playlistPagination: DataPaginationResDto<DataPlaylistResDto> = {
  //   results: [playlist],
  //   total: 1
  // } as DataPaginationResDto<DataPlaylistResDto>;
  // TODO interface ? PlaylistInterface
  const dbPlaylist = {
    _id: id,
    downloads_count: 0,
    followers_count: 0,
    isPublic: false,
    owner_user_id: 0,
    photo_id: "",
    release_date: releaseDate,
    songs_ids: [0],
    title: "",
    tracks_count: 1
  };
  //
  const mongooseMethodsMock = {
    findById: () => dbPlaylist,
    findOne: () => dbPlaylist,
    save: () => dbPlaylist
  };
  //
  const playlistModelRes = {
    ...dbPlaylist,
    ...mongooseMethodsMock
  };

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
    deleteOne: () => ({ deletedCount: 1 }),
    find: () => playlistModelRes,
    findById: () => playlistModelRes,
    findOne: () => playlistModelRes,
    save: () => playlistModelRes
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
      playlistId: id,
      songId: "0"
    };
    expect(await service.addSong(dto, 0)).toEqual({
      ...playlist,
      songs: songPagination
    });
  });

  it("delete should be equal to a playlist", async () => {
    const dto: PlaylistDeleteReqDto = {
      id
    };
    expect(await service.delete(dto, 0)).toEqual(playlist);
  });

  it("edit should be equal to a playlist", async () => {
    const dto: PlaylistEditReqDto = {
      id
    };
    expect(await service.edit(dto)).toEqual({
      ...playlist,
      songs: songPagination
    });
  });

  it("deleteSong should be equal to a playlist", async () => {
    const dto: PlaylistSongReqDto = {
      playlistId: id,
      songId: "0"
    };
    expect(await service.deleteSong(dto, 0)).toEqual({
      ...playlist,
      songs: songPagination
    });
  });

  it("get should be equal to a playlist", async () => {
    const dto: PlaylistGetReqDto = {
      id
    };
    expect(await service.get(dto)).toEqual({
      ...playlist,
      songs: songPagination
    });
  });

  it.todo("create shoud return a playlist");
  it.todo("my should be equal to a list playlists");
  it.todo("top should be equal to a list of playlists");
});
