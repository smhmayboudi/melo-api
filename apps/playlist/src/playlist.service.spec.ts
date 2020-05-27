import {
  DATA_SERVICE,
  DATA_SONG_SERVICE_GET_BY_IDS,
  DataArtistType,
  DataConfigElasticSearchReqDto,
  DataConfigImageReqDto,
  DataImageResDto,
  DataPaginationResDto,
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

import { PlaylistService } from "./playlist.service";
import { getModelToken } from "@nestjs/mongoose";
import { of } from "rxjs";

describe("PlaylistService", () => {
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
  const id = "000000000000000000000000";
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
  const songPagination: DataPaginationResDto<SongResDto> = {
    results: [song],
    total: 1,
  } as DataPaginationResDto<SongResDto>;
  const playlist: PlaylistResDto = {
    followersCount: 0,
    id,
    image,
    isPublic: false,
    releaseDate,
    songs: songPagination,
    title: "",
    tracksCount: 1,
  };
  const playlistPure: PlaylistResDto = {
    ...playlist,
    songs: undefined,
  };
  const playlistPagination: DataPaginationResDto<PlaylistResDto> = {
    results: [playlist],
    total: 1,
  } as DataPaginationResDto<PlaylistResDto>;
  // TODO: interface ?
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
    tracks_count: 1,
  };

  const clientProxyMock = {
    send: (token: string) =>
      token === DATA_SONG_SERVICE_GET_BY_IDS ? of(songPagination) : of(image),
  };
  // TODO: interface ?
  const playlistModelMock = {
    deleteOne: () => ({ deletedCount: 1 }),
    find: () => ({ ...dbPlaylist, ...playlistModelMock }),
    findById: () => ({ ...dbPlaylist, ...playlistModelMock }),
    findOne: () => ({ ...dbPlaylist, ...playlistModelMock }),
    limit: () => [{ ...dbPlaylist, ...playlistModelMock }],
    save: () => ({ ...dbPlaylist, ...playlistModelMock }),
    skip: () => ({ ...dbPlaylist, ...playlistModelMock }),
  };

  let service: PlaylistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlaylistService,
        { provide: DATA_SERVICE, useValue: clientProxyMock },
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
      dataConfigElasticSearch,
      dataConfigImage,
      playlistId: id,
      songId: 0,
    };
    expect(await service.addSong(dto)).toEqual({
      ...playlist,
      songs: songPagination,
    });
  });

  it("addSong should be equal to a playlist 2", async () => {
    const playlistModelMockFindById = {
      ...playlistModelMock,
      findById: () => null,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlaylistService,
        { provide: DATA_SERVICE, useValue: clientProxyMock },
        {
          provide: getModelToken(PLAYLIST),
          useValue: playlistModelMockFindById,
        },
      ],
    }).compile();
    service = module.get<PlaylistService>(PlaylistService);

    const dto: PlaylistAddSongReqDto = {
      config,
      dataConfigElasticSearch,
      dataConfigImage,
      playlistId: id,
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
        { provide: DATA_SERVICE, useValue: clientProxyMock },
        { provide: getModelToken(PLAYLIST), useValue: playlistModelMockCreate },
      ],
    }).compile();
    const service = module.get<PlaylistService>(PlaylistService);

    const dto: PlaylistCreateReqDto = {
      config,
      dataConfigElasticSearch,
      dataConfigImage,
      sub: 1,
      title: "",
    };
    expect(await service.create(dto)).toEqual(playlistPure);
  });

  it("delete should be equal to a playlist", async () => {
    const dto: PlaylistDeleteReqDto = {
      config,
      dataConfigElasticSearch,
      dataConfigImage,
      id,
      sub: 1,
    };
    expect(await service.delete(dto)).toEqual(playlistPure);
  });

  it("delete should be equal to a playlist 2", async () => {
    const playlistModelMockFindOne = {
      ...playlistModelMock,
      findOne: () => null,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlaylistService,
        { provide: DATA_SERVICE, useValue: clientProxyMock },
        {
          provide: getModelToken(PLAYLIST),
          useValue: playlistModelMockFindOne,
        },
      ],
    }).compile();
    service = module.get<PlaylistService>(PlaylistService);

    const dto: PlaylistDeleteReqDto = {
      config,
      dataConfigElasticSearch,
      dataConfigImage,
      id,
      sub: 1,
    };
    return expect(service.delete(dto)).rejects.toThrowError();
  });

  it("delete should be equal to a playlist 3", async () => {
    const playlistModelMockDeleteOne = {
      ...playlistModelMock,
      deleteOne: () => ({ deletedCount: undefined }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlaylistService,
        { provide: DATA_SERVICE, useValue: clientProxyMock },
        {
          provide: getModelToken(PLAYLIST),
          useValue: playlistModelMockDeleteOne,
        },
      ],
    }).compile();
    service = module.get<PlaylistService>(PlaylistService);

    const dto: PlaylistDeleteReqDto = {
      config,
      dataConfigElasticSearch,
      dataConfigImage,
      id,
      sub: 1,
    };
    return expect(service.delete(dto)).rejects.toThrowError();
  });

  it("edit should be equal to a playlist", async () => {
    const dto: PlaylistEditReqDto = {
      config,
      dataConfigElasticSearch,
      dataConfigImage,
      id,
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
        { provide: DATA_SERVICE, useValue: clientProxyMock },
        {
          provide: getModelToken(PLAYLIST),
          useValue: playlistModelMockFindById,
        },
      ],
    }).compile();
    service = module.get<PlaylistService>(PlaylistService);

    const dto: PlaylistDeleteReqDto = {
      config,
      dataConfigElasticSearch,
      dataConfigImage,
      id,
      sub: 1,
    };
    return expect(service.edit(dto)).rejects.toThrowError();
  });

  it("get should be equal to a playlist", async () => {
    const dto: PlaylistGetReqDto = {
      config,
      dataConfigElasticSearch,
      dataConfigImage,
      id,
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
        { provide: DATA_SERVICE, useValue: clientProxyMock },
        {
          provide: getModelToken(PLAYLIST),
          useValue: playlistModelMockFindById,
        },
      ],
    }).compile();
    service = module.get<PlaylistService>(PlaylistService);

    const dto: PlaylistGetReqDto = {
      config,
      dataConfigElasticSearch,
      dataConfigImage,
      id,
    };
    return expect(service.get(dto)).rejects.toThrowError();
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
    expect(await service.my(dto)).toEqual(playlistPagination);
  });

  it("removeSong should be equal to a playlist", async () => {
    const dto: PlaylistRemoveSongReqDto = {
      config,
      dataConfigElasticSearch,
      dataConfigImage,
      playlistId: id,
      songId: 0,
    };
    expect(await service.removeSong(dto)).toEqual(playlist);
  });

  it("removeSong should be equal to a playlist 2", async () => {
    const playlistModelMockFindById = {
      ...playlistModelMock,
      findById: () => null,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlaylistService,
        { provide: DATA_SERVICE, useValue: clientProxyMock },
        {
          provide: getModelToken(PLAYLIST),
          useValue: playlistModelMockFindById,
        },
      ],
    }).compile();
    service = module.get<PlaylistService>(PlaylistService);

    const dto: PlaylistRemoveSongReqDto = {
      config,
      dataConfigElasticSearch,
      dataConfigImage,
      playlistId: id,
      songId: 0,
    };
    return expect(service.removeSong(dto)).rejects.toThrowError();
  });

  it("top should be equal to a list of playlists", async () => {
    const dto: PlaylistTopReqDto = {
      config,
      dataConfigElasticSearch,
      dataConfigImage,
      from: 0,
      size: 0,
    };
    expect(await service.top(dto)).toEqual(playlistPagination);
  });
});
