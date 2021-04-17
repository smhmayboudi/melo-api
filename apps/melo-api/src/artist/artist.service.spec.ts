import {
  ARTIST_SERVICE,
  ARTIST_SERVICE_FOLLOW,
  ARTIST_SERVICE_PROFILE,
  ARTIST_SERVICE_UNFOLLOW,
  ArtistFollowReqDto,
  ArtistFollowingReqDto,
  ArtistGetReqDto,
  ArtistResDto,
  ArtistTrendingGenreReqDto,
  ArtistTrendingReqDto,
  ArtistType,
  ArtistUnfollowReqDto,
  ConstImageResDto,
} from "@melo/common";

import { ArtistService } from "./artist.service";
import { Test } from "@nestjs/testing";
import { of } from "rxjs";

describe("ArtistService", () => {
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

  // TODO: interface ?
  const artistClientProxyMock = {
    send: (token: string) =>
      token === ARTIST_SERVICE_FOLLOW
        ? of(artist)
        : token === ARTIST_SERVICE_PROFILE
        ? of(artist)
        : token === ARTIST_SERVICE_UNFOLLOW
        ? of(artist)
        : of([artist]),
  };

  let service: ArtistService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ArtistService,
        { provide: ARTIST_SERVICE, useValue: artistClientProxyMock },
      ],
    }).compile();
    service = module.get<ArtistService>(ArtistService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("follow should be equal to an artist", async () => {
    const dto: ArtistFollowReqDto = {
      id: 0,
      sub: 1,
    };
    expect(await service.follow(dto)).toEqual(artist);
  });

  it("following should equal list of artists", async () => {
    const dto: ArtistFollowingReqDto = {
      from: 0,
      size: 0,
      sub: 1,
    };
    expect(await service.following(dto)).toEqual([artist]);
  });

  it("profile should be equal to an artist", async () => {
    const dto: ArtistGetReqDto = {
      id: 0,
    };
    expect(await service.profile(dto)).toEqual(artist);
  });

  it("trending should equal list of artists", async () => {
    const dto: ArtistTrendingReqDto = {};
    expect(await service.trending(dto)).toEqual([artist]);
  });

  it("trending/genre should equal list of artists", async () => {
    const dto: ArtistTrendingGenreReqDto = {
      genre: "pop",
    };
    expect(await service.trendingGenre(dto)).toEqual([artist]);
  });

  it("unfollow should be equal to an artist", async () => {
    const dto: ArtistUnfollowReqDto = {
      id: 0,
      sub: 1,
    };
    expect(await service.unfollow(dto)).toEqual(artist);
  });
});
