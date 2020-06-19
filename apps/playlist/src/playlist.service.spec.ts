import {
  AlbumResDto,
  ArtistResDto,
  ArtistType,
  CONST_SERVICE,
  ConstImageResDto,
  PLAYLIST,
  PlaylistAddSongReqDto,
  PlaylistCreateReqDto,
  PlaylistDeleteReqDto,
  PlaylistEditReqDto,
  PlaylistGetReqDto,
  PlaylistMyReqDto,
  PlaylistRemoveSongReqDto,
  PlaylistResDto,
  PlaylistTopReqDto,
  SONG_SERVICE,
  SongAudioResDto,
  SongResDto,
} from "@melo/common";

import { PlaylistConfigService } from "./playlist.config.service";
import { PlaylistConfigServiceInterface } from "./playlist.config.service.interface";
import { PlaylistService } from "./playlist.service";
import { Test } from "@nestjs/testing";
import { getModelToken } from "@nestjs/mongoose";
import { of } from "rxjs";

describe("PlaylistService", () => {
  const releaseDate = new Date();
  const image: ConstImageResDto = {
    cover: {
      url:
        "Cz6suIAYeF_rXp18UTsU4bHL-gaGsq2PpE2_dLMWj9s/rs:fill:1024:1024:1/dpr:1/plain/asset/pop.jpg",
    },
  };
  const artist: ArtistResDto = {
    followersCount: 0,
    fullName: "",
    id: 0,
    image,
    sumSongsDownloadsCount: 1,
    tags: [""],
    type: ArtistType.prime,
  };
  const album: AlbumResDto = {
    artists: [artist],
    downloadCount: 0,
    id: 0,
    image,
    name: "",
    releaseDate,
    tags: [""],
    tracksCount: 0,
  };
  const audio: SongAudioResDto = {
    medium: {
      fingerprint: "",
      url: "-0.mp3",
    },
  };
  const song: SongResDto = {
    album,
    artists: [artist],
    audio,
    copyrighted: false,
    downloadCount: 0,
    duration: 0,
    hasVideo: false,
    id: 0,
    image,
    localized: false,
    lyrics: "",
    releaseDate,
    tags: [""],
    title: "",
  };
  const playlist: PlaylistResDto = {
    followersCount: 0,
    id: "000000000000000000000000",
    image,
    isPublic: false,
    releaseDate,
    songs: [song],
    title: "",
    tracksCount: 1,
  };
  const playlistId = "000000000000000000000000";
  const playlistPure: PlaylistResDto = {
    ...playlist,
    songs: undefined,
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

  // TODO: interface ?
  const constClientProxyMock = {
    send: () => of(image),
  };
  // TODO: interface ?
  const songClientProxyMock = {
    send: () => of([song]),
  };
  const playlistConfigServiceMock: PlaylistConfigServiceInterface = {
    imagePath: "",
    imagePathDefaultPlaylist: "",
    mongooseRetryAttempts: 0,
    mongooseRetryDelay: 0,
    mongooseUri: "",
    servicePort: 0,
    serviceRetryAttempts: 0,
    serviceRetryDelay: 0,
    serviceUrl: "",
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
    const module = await Test.createTestingModule({
      providers: [
        PlaylistService,
        { provide: CONST_SERVICE, useValue: constClientProxyMock },
        { provide: PlaylistConfigService, useValue: playlistConfigServiceMock },
        { provide: SONG_SERVICE, useValue: songClientProxyMock },
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

    const module = await Test.createTestingModule({
      providers: [
        PlaylistService,
        { provide: CONST_SERVICE, useValue: constClientProxyMock },
        { provide: PlaylistConfigService, useValue: playlistConfigServiceMock },
        { provide: SONG_SERVICE, useValue: songClientProxyMock },
        {
          provide: getModelToken(PLAYLIST),
          useValue: playlistModelMockFindById,
        },
      ],
    }).compile();
    service = module.get<PlaylistService>(PlaylistService);

    const dto: PlaylistAddSongReqDto = {
      playlistId,
      songId: 0,
    };
    return expect(service.addSong(dto)).rejects.toThrowError();
  });

  it("create should be equal to a playlist", async () => {
    const playlistModelMockCreate = jest.fn().mockImplementation(() => ({
      save: () => ({
        ...dbPlaylist,
        songs_ids: [],
      }),
    }));

    const module = await Test.createTestingModule({
      providers: [
        PlaylistService,
        { provide: CONST_SERVICE, useValue: constClientProxyMock },
        { provide: PlaylistConfigService, useValue: playlistConfigServiceMock },
        { provide: SONG_SERVICE, useValue: songClientProxyMock },
        { provide: getModelToken(PLAYLIST), useValue: playlistModelMockCreate },
      ],
    }).compile();
    const service = module.get<PlaylistService>(PlaylistService);

    const dto: PlaylistCreateReqDto = {
      sub: 1,
      title: "",
    };
    expect(await service.create(dto)).toEqual(playlistPure);
  });

  it("delete should be equal to a playlist", async () => {
    const dto: PlaylistDeleteReqDto = {
      id: playlistId,
      sub: 1,
    };
    expect(await service.delete(dto)).toEqual(playlistPure);
  });

  it("delete should be equal to a playlist 2", async () => {
    const playlistModelMockFindOne = {
      ...playlistModelMock,
      findOne: () => null,
    };

    const module = await Test.createTestingModule({
      providers: [
        PlaylistService,
        { provide: CONST_SERVICE, useValue: constClientProxyMock },
        { provide: PlaylistConfigService, useValue: playlistConfigServiceMock },
        { provide: SONG_SERVICE, useValue: songClientProxyMock },
        {
          provide: getModelToken(PLAYLIST),
          useValue: playlistModelMockFindOne,
        },
      ],
    }).compile();
    service = module.get<PlaylistService>(PlaylistService);

    const dto: PlaylistDeleteReqDto = {
      id: playlistId,
      sub: 1,
    };
    return expect(service.delete(dto)).rejects.toThrowError();
  });

  it("delete should be equal to a playlist 3", async () => {
    const playlistModelMockDeleteOne = {
      ...playlistModelMock,
      deleteOne: () => ({
        deletedCount: undefined,
      }),
    };

    const module = await Test.createTestingModule({
      providers: [
        PlaylistService,
        { provide: CONST_SERVICE, useValue: constClientProxyMock },
        { provide: PlaylistConfigService, useValue: playlistConfigServiceMock },
        { provide: SONG_SERVICE, useValue: songClientProxyMock },
        {
          provide: getModelToken(PLAYLIST),
          useValue: playlistModelMockDeleteOne,
        },
      ],
    }).compile();
    service = module.get<PlaylistService>(PlaylistService);

    const dto: PlaylistDeleteReqDto = {
      id: playlistId,
      sub: 1,
    };
    return expect(service.delete(dto)).rejects.toThrowError();
  });

  it("edit should be equal to a playlist", async () => {
    const dto: PlaylistEditReqDto = {
      id: playlistId,
    };
    expect(await service.edit(dto)).toEqual(playlist);
  });

  it("edit should be equal to a playlist 2", async () => {
    const playlistModelMockFindById = {
      ...playlistModelMock,
      findById: () => null,
    };

    const module = await Test.createTestingModule({
      providers: [
        PlaylistService,
        { provide: CONST_SERVICE, useValue: constClientProxyMock },
        { provide: PlaylistConfigService, useValue: playlistConfigServiceMock },
        { provide: SONG_SERVICE, useValue: songClientProxyMock },
        {
          provide: getModelToken(PLAYLIST),
          useValue: playlistModelMockFindById,
        },
      ],
    }).compile();
    service = module.get<PlaylistService>(PlaylistService);

    const dto: PlaylistDeleteReqDto = {
      id: playlistId,
      sub: 1,
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

    const module = await Test.createTestingModule({
      providers: [
        PlaylistService,
        { provide: CONST_SERVICE, useValue: constClientProxyMock },
        { provide: PlaylistConfigService, useValue: playlistConfigServiceMock },
        { provide: SONG_SERVICE, useValue: songClientProxyMock },
        {
          provide: getModelToken(PLAYLIST),
          useValue: playlistModelMockFindById,
        },
      ],
    }).compile();
    service = module.get<PlaylistService>(PlaylistService);
    const dto: PlaylistEditReqDto = {
      id: playlistId,
    };
    expect(await service.edit(dto)).toEqual({
      ...playlist,
      songs: undefined,
    });
  });

  it("get should be equal to a playlist", async () => {
    const dto: PlaylistGetReqDto = {
      id: playlistId,
    };
    expect(await service.get(dto)).toEqual(playlist);
  });

  it("get should be equal to a playlist 2", async () => {
    const playlistModelMockFindById = {
      ...playlistModelMock,
      findById: () => null,
    };

    const module = await Test.createTestingModule({
      providers: [
        PlaylistService,
        { provide: CONST_SERVICE, useValue: constClientProxyMock },
        { provide: PlaylistConfigService, useValue: playlistConfigServiceMock },
        { provide: SONG_SERVICE, useValue: songClientProxyMock },
        {
          provide: getModelToken(PLAYLIST),
          useValue: playlistModelMockFindById,
        },
      ],
    }).compile();
    service = module.get<PlaylistService>(PlaylistService);

    const dto: PlaylistGetReqDto = {
      id: playlistId,
    };
    return expect(service.get(dto)).rejects.toThrowError();
  });

  it("my should be equal to a list of playlists", async () => {
    const dto: PlaylistMyReqDto = {
      from: 0,
      size: 0,
      sub: 1,
    };
    expect(await service.my(dto)).toEqual([playlist]);
  });

  it("removeSong should be equal to a playlist", async () => {
    const dto: PlaylistRemoveSongReqDto = {
      playlistId,
      songId: 0,
    };
    expect(await service.removeSong(dto)).toEqual(playlist);
  });

  it("removeSong should be equal to a playlist 2", async () => {
    const playlistModelMockFindById = {
      ...playlistModelMock,
      findById: () => null,
    };

    const module = await Test.createTestingModule({
      providers: [
        PlaylistService,
        { provide: CONST_SERVICE, useValue: constClientProxyMock },
        { provide: PlaylistConfigService, useValue: playlistConfigServiceMock },
        { provide: SONG_SERVICE, useValue: songClientProxyMock },
        {
          provide: getModelToken(PLAYLIST),
          useValue: playlistModelMockFindById,
        },
      ],
    }).compile();
    service = module.get<PlaylistService>(PlaylistService);

    const dto: PlaylistRemoveSongReqDto = {
      playlistId,
      songId: 0,
    };
    return expect(service.removeSong(dto)).rejects.toThrowError();
  });

  it("top should be equal to a list of playlists", async () => {
    const dto: PlaylistTopReqDto = {
      from: 0,
      size: 0,
    };
    expect(await service.top(dto)).toEqual([playlist]);
  });
});
