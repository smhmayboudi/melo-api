import {
  AlbumResDto,
  AppSongLikeReqDto,
  AppSongLikesReqDto,
  AppSongLocalizeReqDto,
  ArtistResDto,
  ArtistType,
  ConstImageResDto,
  PlaylistResDto,
  RelationEdgeType,
  RelationEntityReqDto,
  RelationEntityType,
  RelationResDto,
  SearchResDto,
  SearchType,
  SongAudioResDto,
  SongResDto,
  TagRelationResDto,
  TagResDto,
} from "@melo/common";

import { AppHashIdService } from "./app.hash-id.service";
import { AppHashIdServiceInterface } from "./app.hash-id.service.interface";
import { AppSongService } from "./app.song.service";
import { RelationService } from "../relation/relation.service";
import { RelationServiceInterface } from "../relation/relation.service.interface";
import { Test } from "@nestjs/testing";

describe("AppSongService", () => {
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
  const from: RelationEntityReqDto = {
    id: 0,
    type: RelationEntityType.user,
  };
  const to: RelationEntityReqDto = {
    id: 0,
    type: RelationEntityType.album,
  };
  const relation: RelationResDto = {
    from,
    to,
    type: RelationEdgeType.follows,
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

  let service: AppSongService;

  const appHashIdServiceMock: AppHashIdServiceInterface = {
    decode: (): number => 0,
    encode: (): string => "",
    encodeAlbum: () => album,
    encodeArtist: () => artist,
    encodePlaylist: () => playlist,
    encodeSearch: () => search,
    encodeSong: () => song,
    encodeTag: () => tag,
    encodeTagRelation: () => tagRelation,
  };

  const relationServiceMock: RelationServiceInterface = {
    get: () => Promise.resolve([relation]),
    has: () => Promise.resolve(relation),
    multiHas: () => Promise.resolve([relation]),
    remove: () => Promise.resolve(relation),
    set: () => Promise.resolve(relation),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AppSongService,
        { provide: AppHashIdService, useValue: appHashIdServiceMock },
        { provide: RelationService, useValue: relationServiceMock },
      ],
    }).compile();
    service = module.get<AppSongService>(AppSongService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("like should be equal to a song sub: 1", async () => {
    const dto: AppSongLikeReqDto = {
      song,
      sub: 1,
    };
    expect(await service.like(dto)).toEqual({
      ...song,
      liked: true,
    });
  });

  it("likes should be equal to a song sub: 1", async () => {
    const dto: AppSongLikesReqDto = {
      songs: [song],
      sub: 1,
    };
    expect(await service.likes(dto)).toEqual([
      {
        ...song,
        liked: true,
      },
    ]);
  });

  it("localize should be equal to a song localized: false", async () => {
    const dto: AppSongLocalizeReqDto = {
      song,
    };
    expect(await service.localize(dto)).toEqual(song);
  });

  it("localize should be equal to a song localized: true", async () => {
    const dto: AppSongLocalizeReqDto = {
      song: {
        ...song,
        localized: true,
      },
    };
    expect(await service.localize(dto)).toEqual({
      ...song,
      audio: undefined,
      localized: true,
      lyrics: undefined,
    });
  });
});
