import {
  ArtistFollowReqDto,
  ArtistFollowingReqDto,
  ArtistGetByIdsReqDto,
  ArtistGetReqDto,
  ArtistResDto,
  ArtistTrendingGenreReqDto,
  ArtistTrendingReqDto,
  ArtistType,
  ArtistUnfollowReqDto,
  ConstImageResDto,
  SearchElasticsearchArtistResDto,
} from "@melo/common";

import { ArtistController } from "./artist.controller";
import { ArtistService } from "./artist.service";
import { ArtistServiceInterface } from "./artist.service.interface";
import { Test } from "@nestjs/testing";

describe("ArtistController", () => {
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

  const artistServiceMock: ArtistServiceInterface = {
    follow: () => Promise.resolve(artist),
    following: () => Promise.resolve([artist]),
    get: () => Promise.resolve(artist),
    getByIds: () => Promise.resolve([artist]),
    profile: () => Promise.resolve(artist),
    transform: () => Promise.resolve(artist),
    trending: () => Promise.resolve([artist]),
    trendingGenre: () => Promise.resolve([artist]),
    unfollow: () => Promise.resolve(artist),
  };

  let controller: ArtistController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [ArtistController],
      providers: [{ provide: ArtistService, useValue: artistServiceMock }],
    }).compile();
    controller = module.get<ArtistController>(ArtistController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("follow should be equal to an artist", async () => {
    const dto: ArtistFollowReqDto = {
      id: 0,
      sub: 1,
    };
    expect(await controller.follow(dto)).toEqual(artist);
  });

  it("following should equal list of artists", async () => {
    const dto: ArtistFollowingReqDto = {
      from: 0,
      size: 0,
      sub: 1,
    };
    expect(await controller.following(dto)).toEqual([artist]);
  });

  it("get should be equal to an artist", async () => {
    const dto: ArtistGetReqDto = {
      id: 0,
    };
    expect(await controller.get(dto)).toEqual(artist);
  });

  it("getByIds should equal list of artists", async () => {
    const dto: ArtistGetByIdsReqDto = {
      ids: [0],
    };
    expect(await controller.getByIds(dto)).toEqual([artist]);
  });

  it("profile should be equal to an artist", async () => {
    const dto: ArtistGetReqDto = {
      id: 0,
    };
    expect(await controller.profile(dto)).toEqual(artist);
  });

  it("transform should be equal to a ArtistResDto", async () => {
    const dto: SearchElasticsearchArtistResDto = {
      available: false,
      followers_count: 0,
      full_name: "",
      has_cover: false,
      id: 0,
      popular: false,
      sum_downloads_count: 1,
      tags: [
        {
          tag: "",
        },
      ],
      type: ArtistType.prime,
    };
    expect(await controller.transform(dto)).toEqual(artist);
  });

  it("trending should equal list of artists", async () => {
    const dto: ArtistTrendingReqDto = {};
    expect(await controller.trending(dto)).toEqual([artist]);
  });

  it("trending/genre should equal list of artists", async () => {
    const dto: ArtistTrendingGenreReqDto = {
      genre: "pop",
    };
    expect(await controller.trendingGenre(dto)).toEqual([artist]);
  });

  it("unfollow should be equal to an artist", async () => {
    const dto: ArtistUnfollowReqDto = {
      id: 0,
      sub: 1,
    };
    expect(await controller.unfollow(dto)).toEqual(artist);
  });
});
