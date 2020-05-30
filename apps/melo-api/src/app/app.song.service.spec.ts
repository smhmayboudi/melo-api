import {
  AlbumResDto,
  AppSongLikeReqDto,
  AppSongLikesReqDto,
  AppSongLocalizeReqDto,
  ArtistResDto,
  DataArtistType,
  DataSearchType,
  PlaylistResDto,
  RelationEdgeType,
  RelationEntityReqDto,
  RelationEntityType,
  RelationResDto,
  SearchResDto,
  SongResDto,
} from "@melo/common";
import { Test, TestingModule } from "@nestjs/testing";

import { AppHashIdService } from "./app.hash-id.service";
import { AppHashIdServiceInterface } from "./app.hash-id.service.interface";
import { AppSongService } from "./app.song.service";
import { RelationService } from "../relation/relation.service";
import { RelationServiceInterface } from "../relation/relation.service.interface";

describe("AppSongService", () => {
  const releaseDate = new Date();
  const artist: ArtistResDto = {
    followersCount: 0,
    id: 0,
    type: DataArtistType.prime,
  };
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
  const song: SongResDto = {
    album: {
      artists: [artist],
      id: 0,
      name: "",
      releaseDate,
    },
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
  const album: AlbumResDto = {
    artists: [artist],
    id: 0,
    name: "",
    releaseDate,
    songs: [song],
  };
  const search: SearchResDto = {
    type: DataSearchType.album,
  };
  const from: RelationEntityReqDto = {
    id: 0,
    type: RelationEntityType.user,
  };
  const relationMultiHas: RelationResDto = {
    from,
    to: {
      id: 0,
      type: RelationEntityType.user,
    },
    type: RelationEdgeType.follows,
  };

  let service: AppSongService;

  const appHashIdServiceMock: AppHashIdServiceInterface = {
    decode: (): number => 0,
    encode: (): string => "",
    encodeAlbum: (): unknown => album,
    encodeArtist: (): unknown => artist,
    encodePlaylist: (): unknown => playlist,
    encodeSearch: (): unknown => search,
    encodeSong: (): unknown => song,
  };

  const relationServiceMock: RelationServiceInterface = {
    get: (): Promise<RelationResDto[]> => Promise.resolve([relationMultiHas]),
    has: (): Promise<RelationResDto | undefined> =>
      Promise.resolve(relationMultiHas),
    multiHas: (): Promise<RelationResDto[]> =>
      Promise.resolve([relationMultiHas]),
    remove: (): Promise<RelationResDto> => Promise.resolve(relationMultiHas),
    set: (): Promise<RelationResDto> => Promise.resolve(relationMultiHas),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
