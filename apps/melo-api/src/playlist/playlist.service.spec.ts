import {
  DataArtistType,
  DataConfigElasticsearchReqDto,
  DataConfigImageReqDto,
  DataImageResDto,
  PLAYLIST,
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
  SongResDto,
} from "@melo/common";
import { Test, TestingModule } from "@nestjs/testing";

import { DataImageService } from "../../../data/src/data.image.service";
import { DataImageServiceInterface } from "../data/data.image.service.interface";
import { DataSongService } from "../../../data/src/data.song.service";
import { DataSongServiceInterface } from "apps/data/src/data.song.service.interface";
import { PlaylistService } from "./playlist.service";
import { getModelToken } from "@nestjs/mongoose";

describe("PlaylistService", () => {
  const config: PlaylistConfigReqDto = {
    imagePath: "",
    imagePathDefaultPlaylist: "",
  };
  const dataConfigElasticsearch: DataConfigElasticsearchReqDto = {
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
  const playlistId = "000000000000000000000000";
  const image: DataImageResDto = {
    cover: {
      url:
        "3jr-WvcF601FGlXVSkFCJIJ7A4J2z4rtTcTK_UXHi58/rs:fill:1024:1024:1/dpr:1/",
    },
  };
  const song: SongResDto = {
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
  const playlist: PlaylistResDto = {
    followersCount: 0,
    id: playlistId,
    image,
    isPublic: false,
    releaseDate,
    songs: [song],
    title: "",
    tracksCount: 1,
  };
  // TODO: interface ?
  const dbPlaylist = {
    _id: playlistId,
    downloads_count: 0,
    followers_count: 0,
    isPublic: false,
    owner_user_id: 0,
    photo_id: "",
    release_date: releaseDate,
    songs_ids: [0],
    title: "",
    tracks_count: 1,
  };

  const dataImageServiceMock: DataImageServiceInterface = {
    generateUrl: (): Promise<DataImageResDto> => Promise.resolve(image),
  };
  const dataSongServiceMock: DataSongServiceInterface = {
    albumSongs: (): Promise<SongResDto[]> => Promise.resolve([song]),
    artistSongs: (): Promise<SongResDto[]> => Promise.resolve([song]),
    artistSongsTop: (): Promise<SongResDto[]> => Promise.resolve([song]),
    genre: (): Promise<SongResDto[]> => Promise.resolve([song]),
    get: (): Promise<SongResDto> => Promise.resolve(song),
    getByIds: (): Promise<SongResDto[]> => Promise.resolve([song]),
    language: (): Promise<SongResDto[]> => Promise.resolve([song]),
    mood: (): Promise<SongResDto[]> => Promise.resolve([song]),
    newPodcast: (): Promise<SongResDto[]> => Promise.resolve([song]),
    newSong: (): Promise<SongResDto[]> => Promise.resolve([song]),
    podcast: (): Promise<SongResDto[]> => Promise.resolve([song]),
    similar: (): Promise<SongResDto[]> => Promise.resolve([song]),
    slider: (): Promise<SongResDto[]> => Promise.resolve([song]),
    topDay: (): Promise<SongResDto[]> => Promise.resolve([song]),
    topWeek: (): Promise<SongResDto[]> => Promise.resolve([song]),
  };
  // TODO: interface ?
  const playlistModelMock = {
    deleteOne: () => ({
      deletedCount: 1,
    }),
    find: () => ({
      ...dbPlaylist,
      ...playlistModelMock,
    }),
    findById: () => ({
      ...dbPlaylist,
      ...playlistModelMock,
    }),
    findOne: () => ({
      ...dbPlaylist,
      ...playlistModelMock,
    }),
    limit: () => [
      {
        ...dbPlaylist,
        ...playlistModelMock,
      },
    ],
    save: () => ({
      ...dbPlaylist,
      ...playlistModelMock,
    }),
    skip: () => ({
      ...dbPlaylist,
      ...playlistModelMock,
    }),
  };

  let service: PlaylistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlaylistService,
        { provide: DataImageService, useValue: dataImageServiceMock },
        { provide: DataSongService, useValue: dataSongServiceMock },
        { provide: getModelToken(PLAYLIST), useValue: playlistModelMock },
      ],
    }).compile();
    service = module.get<PlaylistService>(PlaylistService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("addSong should be equal to a playlist", async () => {
    const dto: PlaylistAddSongReqDto = {
      config,
      dataConfigElasticsearch,
      dataConfigImage,
      playlistId,
      songId: 0,
    };
    expect(await service.addSong(dto)).toEqual(playlist);
  });

  it("addSong should be equal to a playlist 2", async () => {
    const playlistModelMockFindById = {
      ...playlistModelMock,
      findById: () => null,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlaylistService,
        { provide: DataImageService, useValue: dataImageServiceMock },
        { provide: DataSongService, useValue: dataSongServiceMock },
        {
          provide: getModelToken(PLAYLIST),
          useValue: playlistModelMockFindById,
        },
      ],
    }).compile();
    service = module.get<PlaylistService>(PlaylistService);

    const dto: PlaylistAddSongReqDto = {
      config,
      dataConfigElasticsearch,
      dataConfigImage,
      playlistId,
      songId: 0,
    };
    return expect(service.addSong(dto)).rejects.toThrowError();
  });

  it("create should be equal to a playlist", async () => {
    const playlistModelMockCreate = jest.fn().mockImplementation(() => ({
      save: () => dbPlaylist,
    }));
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlaylistService,
        { provide: DataImageService, useValue: dataImageServiceMock },
        { provide: DataSongService, useValue: dataSongServiceMock },
        {
          provide: getModelToken(PLAYLIST),
          useValue: playlistModelMockCreate,
        },
      ],
    }).compile();
    const service = module.get<PlaylistService>(PlaylistService);

    const dto: PlaylistCreateReqDto = {
      config,
      dataConfigElasticsearch,
      dataConfigImage,
      sub: 1,
      title: "",
    };
    expect(await service.create(dto)).toEqual({
      ...playlist,
      songs: undefined,
    });
  });

  it("delete should be equal to a playlist", async () => {
    const dto: PlaylistDeleteReqDto = {
      config,
      dataConfigElasticsearch,
      dataConfigImage,
      id: playlistId,
      sub: 1,
    };
    expect(await service.delete(dto)).toEqual({
      ...playlist,
      songs: undefined,
    });
  });

  it("delete should be equal to a playlist 2", async () => {
    const playlistModelMockFindOne = {
      ...playlistModelMock,
      findOne: () => null,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlaylistService,
        { provide: DataImageService, useValue: dataImageServiceMock },
        { provide: DataSongService, useValue: dataSongServiceMock },
        {
          provide: getModelToken(PLAYLIST),
          useValue: playlistModelMockFindOne,
        },
      ],
    }).compile();
    service = module.get<PlaylistService>(PlaylistService);

    const dto: PlaylistDeleteReqDto = {
      config,
      dataConfigElasticsearch,
      dataConfigImage,
      id: playlistId,
      sub: 1,
    };
    return expect(service.delete(dto)).rejects.toThrowError();
  });

  it("delete should be equal to a playlist 3", async () => {
    const playlistModelMockDeleOne = {
      ...playlistModelMock,
      deleteOne: () => ({
        deletedCount: undefined,
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: DataImageService, useValue: dataImageServiceMock },
        { provide: DataSongService, useValue: dataSongServiceMock },
        PlaylistService,
        {
          provide: getModelToken(PLAYLIST),
          useValue: playlistModelMockDeleOne,
        },
      ],
    }).compile();
    service = module.get<PlaylistService>(PlaylistService);

    const dto: PlaylistDeleteReqDto = {
      config,
      dataConfigElasticsearch,
      dataConfigImage,
      id: playlistId,
      sub: 1,
    };
    return expect(service.delete(dto)).rejects.toThrowError();
  });

  it("edit should be equal to a playlist", async () => {
    const dto: PlaylistEditReqDto = {
      config,
      dataConfigElasticsearch,
      dataConfigImage,
      id: playlistId,
    };
    expect(await service.edit(dto)).toEqual(playlist);
  });

  it("edit should be equal to a playlist 2", async () => {
    const playlistModelMockFindById = {
      ...playlistModelMock,
      findById: () => null,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlaylistService,
        { provide: DataImageService, useValue: dataImageServiceMock },
        { provide: DataSongService, useValue: dataSongServiceMock },
        {
          provide: getModelToken(PLAYLIST),
          useValue: playlistModelMockFindById,
        },
      ],
    }).compile();
    service = module.get<PlaylistService>(PlaylistService);

    const dto: PlaylistEditReqDto = {
      config,
      dataConfigElasticsearch,
      dataConfigImage,
      id: playlistId,
    };
    return expect(service.edit(dto)).rejects.toThrowError();
  });

  it("edit should be equal to a playlist 3", async () => {
    const playlistModelMockFindById = {
      ...playlistModelMock,
      findById: () => ({
        ...dbPlaylist,
        ...playlistModelMock,
        photo_id: undefined,
        songs_ids: [],
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlaylistService,
        { provide: DataImageService, useValue: dataImageServiceMock },
        { provide: DataSongService, useValue: dataSongServiceMock },
        {
          provide: getModelToken(PLAYLIST),
          useValue: playlistModelMockFindById,
        },
      ],
    }).compile();
    service = module.get<PlaylistService>(PlaylistService);

    const dto: PlaylistEditReqDto = {
      config,
      dataConfigElasticsearch,
      dataConfigImage,
      id: playlistId,
    };
    expect(await service.edit(dto)).toEqual({ ...playlist, songs: undefined });
  });

  it("get should be equal to a playlist", async () => {
    const dto: PlaylistGetReqDto = {
      config,
      dataConfigElasticsearch,
      dataConfigImage,
      id: playlistId,
    };
    expect(await service.get(dto)).toEqual(playlist);
  });

  it("get should be equal to a playlist 2", async () => {
    const playlistModelMockFindById = {
      ...playlistModelMock,
      findById: () => null,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlaylistService,
        { provide: DataImageService, useValue: dataImageServiceMock },
        { provide: DataSongService, useValue: dataSongServiceMock },
        {
          provide: getModelToken(PLAYLIST),
          useValue: playlistModelMockFindById,
        },
      ],
    }).compile();
    service = module.get<PlaylistService>(PlaylistService);

    const dto: PlaylistGetReqDto = {
      config,
      dataConfigElasticsearch,
      dataConfigImage,
      id: playlistId,
    };
    return expect(service.get(dto)).rejects.toThrowError();
  });

  it("my should be equal to a list of playlists", async () => {
    const dto: PlaylistMyReqDto = {
      config,
      dataConfigElasticsearch,
      dataConfigImage,
      from: 0,
      size: 0,
      sub: 1,
    };
    expect(await service.my(dto)).toEqual([playlist]);
  });

  it("removeSong should be equal to a playlist", async () => {
    const dto: PlaylistRemoveSongReqDto = {
      config,
      dataConfigElasticsearch,
      dataConfigImage,
      playlistId,
      songId: 0,
    };
    expect(await service.removeSong(dto)).toEqual(playlist);
  });

  it("remove should be equal to a playlist 2", async () => {
    const playlistModelMockFindById = {
      ...playlistModelMock,
      findById: () => null,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlaylistService,
        { provide: DataImageService, useValue: dataImageServiceMock },
        { provide: DataSongService, useValue: dataSongServiceMock },
        {
          provide: getModelToken(PLAYLIST),
          useValue: playlistModelMockFindById,
        },
      ],
    }).compile();
    service = module.get<PlaylistService>(PlaylistService);

    const dto: PlaylistRemoveSongReqDto = {
      config,
      dataConfigElasticsearch,
      dataConfigImage,
      playlistId,
      songId: 0,
    };
    return expect(service.removeSong(dto)).rejects.toThrowError();
  });

  it("top should be equal to a list of playlists", async () => {
    const dto: PlaylistTopReqDto = {
      config,
      dataConfigElasticsearch,
      dataConfigImage,
      from: 0,
      size: 0,
    };
    expect(await service.top(dto)).toEqual([playlist]);
  });
});
