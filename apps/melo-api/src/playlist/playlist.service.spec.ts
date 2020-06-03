import {
  AlbumResDto,
  ArtistResDto,
  ConstImageResDto,
  DataArtistType,
  DataConfigElasticsearchReqDto,
  DataConfigImageReqDto,
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
  SongAudioResDto,
  SongResDto,
} from "@melo/common";

import { DataImageService } from "../data/data.image.service";
import { DataImageServiceInterface } from "../data/data.image.service.interface";
import { DataSongService } from "../data/data.song.service";
import { DataSongServiceInterface } from "../data/data.song.service.interface";
import { PlaylistService } from "./playlist.service";
import { Test } from "@nestjs/testing";
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
    imageSignatureSize: 32,
    imageTypeSize: [
      {
        height: 1024,
        name: "cover",
        width: 1024,
      },
    ],
  };
  const releaseDate = new Date();
  const image: ConstImageResDto = {
    cover: {
      url:
        "Hc_ZS0sdjGuezepA_VM2iPDk4f2duSiHE42FzLqiIJM/rs:fill:1024:1024:1/dpr:1/L2Fzc2V0L3BvcC5qcGc",
    },
  };
  const artist: ArtistResDto = {
    followersCount: 0,
    fullName: "",
    id: 0,
    image,
    sumSongsDownloadsCount: 1,
    tags: [""],
    type: DataArtistType.prime,
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

  const dataImageServiceMock: DataImageServiceInterface = {
    generateUrl: () => Promise.resolve(image),
  };
  const dataSongServiceMock: DataSongServiceInterface = {
    albumSongs: () => Promise.resolve([song]),
    artistSongs: () => Promise.resolve([song]),
    artistSongsTop: () => Promise.resolve([song]),
    genre: () => Promise.resolve([song]),
    get: () => Promise.resolve(song),
    getByIds: () => Promise.resolve([song]),
    language: () => Promise.resolve([song]),
    mood: () => Promise.resolve([song]),
    newPodcast: () => Promise.resolve([song]),
    newSong: () => Promise.resolve([song]),
    podcast: () => Promise.resolve([song]),
    similar: () => Promise.resolve([song]),
    slider: () => Promise.resolve([song]),
    topDay: () => Promise.resolve([song]),
    topWeek: () => Promise.resolve([song]),
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

    const module = await Test.createTestingModule({
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
      save: () => ({
        ...dbPlaylist,
        songs_ids: [],
      }),
    }));

    const module = await Test.createTestingModule({
      providers: [
        PlaylistService,
        { provide: DataImageService, useValue: dataImageServiceMock },
        { provide: DataSongService, useValue: dataSongServiceMock },
        { provide: getModelToken(PLAYLIST), useValue: playlistModelMockCreate },
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
    expect(await service.create(dto)).toEqual(playlistPure);
  });

  it("delete should be equal to a playlist", async () => {
    const dto: PlaylistDeleteReqDto = {
      config,
      dataConfigElasticsearch,
      dataConfigImage,
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
    const playlistModelMockDeleteOne = {
      ...playlistModelMock,
      deleteOne: () => ({
        deletedCount: undefined,
      }),
    };

    const module = await Test.createTestingModule({
      providers: [
        PlaylistService,
        { provide: DataImageService, useValue: dataImageServiceMock },
        { provide: DataSongService, useValue: dataSongServiceMock },
        {
          provide: getModelToken(PLAYLIST),
          useValue: playlistModelMockDeleteOne,
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

    const module = await Test.createTestingModule({
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

    const dto: PlaylistDeleteReqDto = {
      config,
      dataConfigElasticsearch,
      dataConfigImage,
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
    expect(await service.edit(dto)).toEqual({
      ...playlist,
      songs: undefined,
    });
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

    const module = await Test.createTestingModule({
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

  it("removeSong should be equal to a playlist 2", async () => {
    const playlistModelMockFindById = {
      ...playlistModelMock,
      findById: () => null,
    };

    const module = await Test.createTestingModule({
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
