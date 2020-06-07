import {
  AlbumResDto,
  ArtistResDto,
  ArtistType,
  ConstImageResDto,
  PLAYLIST_SERVICE,
  PLAYLIST_SERVICE_MY,
  PLAYLIST_SERVICE_TOP,
  PlaylistAddSongReqDto,
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

import { PlaylistService } from "./playlist.service";
import { Test } from "@nestjs/testing";
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
  // TODO: interface ?
  const playlistClientProxyMock = {
    send: (token: string) =>
      token === PLAYLIST_SERVICE_MY
        ? of([playlist])
        : token === PLAYLIST_SERVICE_TOP
        ? of([playlist])
        : of(playlist),
  };

  let service: PlaylistService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        PlaylistService,
        { provide: PLAYLIST_SERVICE, useValue: playlistClientProxyMock },
      ],
    }).compile();
    service = module.get<PlaylistService>(PlaylistService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("addSong should be equal to a playlist", async () => {
    const dto: PlaylistAddSongReqDto = {
      playlistId: "000000000000",
      songId: 0,
    };
    expect(await service.addSong(dto)).toEqual(playlist);
  });

  it("create should be equal to a playlist", async () => {
    const dto: PlaylistCreateReqDto = {
      sub: 1,
      title: "",
    };
    expect(await service.create(dto)).toEqual(playlist);
  });

  it("delete should be equal to a playlist", async () => {
    const dto: PlaylistDeleteReqDto = {
      id: "",
      sub: 1,
    };
    expect(await service.delete(dto)).toEqual(playlist);
  });

  it("edit should be equal to a playlist", async () => {
    const dto: PlaylistEditReqDto = {
      id: "",
    };
    expect(await service.edit(dto)).toEqual(playlist);
  });

  it("get should be equal to a playlist", async () => {
    const dto: PlaylistGetReqDto = {
      id: "",
    };
    expect(await service.get(dto)).toEqual(playlist);
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
      playlistId: "000000000000",
      songId: 0,
    };
    expect(await service.removeSong(dto)).toEqual(playlist);
  });

  it("top should be equal to a list of playlists", async () => {
    const dto: PlaylistTopReqDto = {
      from: 0,
      size: 0,
    };
    expect(await service.top(dto)).toEqual([playlist]);
  });
});
