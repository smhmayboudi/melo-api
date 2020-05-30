import {
  AlbumResDto,
  AppArtistFollowReqDto,
  AppArtistFollowsReqDto,
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

import { AppArtistService } from "./app.artist.service";
import { AppHashIdService } from "./app.hash-id.service";
import { AppHashIdServiceInterface } from "./app.hash-id.service.interface";
import { RelationService } from "../relation/relation.service";
import { RelationServiceInterface } from "../relation/relation.service.interface";

describe("AppArtistService", () => {
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

  let service: AppArtistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppArtistService,
        { provide: AppHashIdService, useValue: appHashIdServiceMock },
        { provide: RelationService, useValue: relationServiceMock },
      ],
    }).compile();
    service = module.get<AppArtistService>(AppArtistService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("follow should be equal to an artist sub: 1", async () => {
    const dto: AppArtistFollowReqDto = {
      artist,
      sub: 1,
    };
    expect(await service.follow(dto)).toEqual({
      ...artist,
      following: true,
    });
  });

  it("follows should be equal to an empty array", async () => {
    const dto: AppArtistFollowsReqDto = {
      artists: [],
      sub: 1,
    };
    expect(await service.follows(dto)).toEqual([]);
  });

  it("follows should be equal to an artist sub: 1", async () => {
    const dto: AppArtistFollowsReqDto = {
      artists: [artist],
      sub: 1,
    };
    expect(await service.follows(dto)).toEqual([
      {
        ...artist,
        following: true,
      },
    ]);
  });
});
