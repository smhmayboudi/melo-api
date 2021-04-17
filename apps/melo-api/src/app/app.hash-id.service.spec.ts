import {
  AlbumResDto,
  ArtistResDto,
  ArtistType,
  ConstImageResDto,
  PlaylistResDto,
  SearchResDto,
  SearchType,
  SongAudioResDto,
  SongResDto,
  TagRelationResDto,
  TagResDto,
} from "@melo/common";

import { AppConfigService } from "./app.config.service";
import { AppConfigServiceInterface } from "./app.config.service.interface";
import { AppHashIdService } from "./app.hash-id.service";
import { Test } from "@nestjs/testing";

describe("AppHashIdService", () => {
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
  const search: SearchResDto = {
    album: album,
    type: SearchType.album,
  };
  const searchUndefined: SearchResDto = {
    album: undefined,
    artist: undefined,
    playlist: undefined,
    song: undefined,
    type: SearchType.album,
  };
  const tag: TagResDto = {
    id: 0,
    name: "",
    typeId: 0,
    value: "",
  };
  const tagRelation: TagRelationResDto = {
    category: SearchType.album,
    categoryId: 0,
    id: 0,
    tagId: 0,
  };

  // TODO: interface ?
  const artistEncoded = {
    ...artist,
    id: "SHY",
  };
  // TODO: interface ?
  const albumEncoded = {
    ...album,
    artists: [artistEncoded],
    id: "SHY",
    // songs: [songEncoded],
  };
  // TODO: interface ?
  const songEncoded = {
    ...song,
    album: albumEncoded,
    artists: [artistEncoded],
    id: "SHY",
  };
  // TODO: interface ?
  const playlistEncoded = {
    ...playlist,
    songs: [songEncoded],
  };
  // TODO: interface ?
  const searchEncoded = {
    ...search,
    album: albumEncoded,
  };
  const tagEncoded = {
    ...tag,
    id: "SHY",
    typeId: "SHY",
  };
  const tagAssignEncoded = {
    ...tagRelation,
    categoryId: "SHY",
    id: "SHY",
    tagId: "SHY",
  };

  const appConfigServiceMock: AppConfigServiceInterface = {
    apmActive: false,
    apmLogLevel: "trace",
    apmSecretToken: "",
    apmServerUrl: "",
    apmServiceName: "",
    cacheHost: "",
    cacheMax: 0,
    cachePort: 0,
    cacheStore: "",
    cacheTTL: 0,
    hashIdAlphabet:
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
    hashIdMinLength: 0,
    hashIdSalt: "cfhistuCFHISTU",
    hashIdSeps: "",
    promDefaultLabels: {
      "": "",
    },
    promDefaultMetricsEnabled: true,
    promPath: "",
    promPrefix: "",
    rateLimitMax: 0,
    rateLimitWindowMs: 0,
    sentryDebug: true,
    sentryDsn: "",
    sentryEnviroment: "",
    sentryLogLevel: 0,
    sentryRelease: "",
    servicePort: 0,
  };

  let service: AppHashIdService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        { provide: AppConfigService, useValue: appConfigServiceMock },
        AppHashIdService,
      ],
    }).compile();
    service = module.get<AppHashIdService>(AppHashIdService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("decode should return a value", () => {
    const hash = "SHY";
    expect(service.decode(hash)).toEqual(0);
  });

  it("encode should return a value", () => {
    const id = 0;
    expect(service.encode(id)).toEqual("SHY");
  });

  it.todo("encoded === ''");

  it("encodeAlbum should be equal to an array of albums", () => {
    const dto: AlbumResDto = album;
    expect(service.encodeAlbum(dto)).toEqual(albumEncoded);
  });

  it("encodeAlbum should be equal to an array of albums arist, id undefined", () => {
    const dto: AlbumResDto = {
      ...album,
      artists: undefined,
      id: undefined,
    };
    expect(service.encodeAlbum(dto)).toEqual({
      ...album,
      artists: undefined,
      id: undefined,
      songs: undefined,
    });
  });

  it("encodeArtist should be equal to an array of artists", () => {
    const dto: ArtistResDto = artist;
    expect(service.encodeArtist(dto)).toEqual(artistEncoded);
  });

  it("encodeSong should be equal to a list of songs", () => {
    const dto: SongResDto = song;
    expect(service.encodeSong(dto)).toEqual(songEncoded);
  });

  it("encodeSong should be equal to a list of songs album undefined", () => {
    const dto: SongResDto = {
      ...song,
      album: undefined,
    };
    expect(service.encodeSong(dto)).toEqual({
      ...song,
      album: undefined,
      artists: [
        {
          ...artist,
          id: "SHY",
        },
      ],
      id: "SHY",
    });
  });

  it("encodePlaylist should be equal to a list of playlists", () => {
    const dto: PlaylistResDto = playlist;
    expect(service.encodePlaylist(dto)).toEqual(playlistEncoded);
  });

  it("encodePlaylist should be equal to a list of playlists songs undefined", () => {
    const dto: PlaylistResDto = {
      ...playlist,
      songs: undefined,
    };
    expect(service.encodePlaylist(dto)).toEqual({
      ...playlist,
      songs: undefined,
    });
  });

  it("encodeSearch should be equal to a list of searches", () => {
    const dto: SearchResDto = search;
    expect(service.encodeSearch(dto)).toEqual(searchEncoded);
  });

  it("encodeSearch should be equal to a list of searches fields undefined", () => {
    const dto: SearchResDto = searchUndefined;
    expect(service.encodeSearch(dto)).toEqual(searchUndefined);
  });

  it("encodeTag should be equal to a tag", () => {
    const dto: TagResDto = tag;
    expect(service.encodeTag(dto)).toEqual(tagEncoded);
  });

  it("encodeTagRelation should be equal to a tag relation", () => {
    const dto: TagRelationResDto = tagRelation;
    expect(service.encodeTagRelation(dto)).toEqual(tagAssignEncoded);
  });
});
