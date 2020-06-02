import {
  ArtistConfigReqDto,
  ArtistFollowReqDto,
  ArtistFollowingReqDto,
  ArtistGetByIdsReqDto,
  ArtistGetReqDto,
  ArtistResDto,
  ArtistTrendingGenreReqDto,
  ArtistTrendingReqDto,
  ArtistUnfollowReqDto,
  ConstImageResDto,
  DataArtistType,
  DataConfigElasticsearchReqDto,
  DataConfigImageReqDto,
  DataElasticsearchArtistResDto,
} from "@melo/common";
import { Test, TestingModule } from "@nestjs/testing";

import { ArtistController } from "./artist.controller";
import { ArtistService } from "./artist.service";
import { ArtistServiceInterface } from "./artist.service.interface";

describe("ArtistController", () => {
  const config: ArtistConfigReqDto = {
    maxSize: 0,
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

  const artistServiceMock: ArtistServiceInterface = {
    follow: (): Promise<ArtistResDto> => Promise.resolve(artist),
    following: (): Promise<ArtistResDto[]> => Promise.resolve([artist]),
    get: (): Promise<ArtistResDto> => Promise.resolve(artist),
    getByIds: (): Promise<ArtistResDto[]> => Promise.resolve([artist]),
    profile: (): Promise<ArtistResDto> => Promise.resolve(artist),
    transform: (): Promise<ArtistResDto> => Promise.resolve(artist),
    trending: (): Promise<ArtistResDto[]> => Promise.resolve([artist]),
    trendingGenre: (): Promise<ArtistResDto[]> => Promise.resolve([artist]),
    unfollow: (): Promise<ArtistResDto> => Promise.resolve(artist),
  };

  let controller: ArtistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
      dataConfigElasticsearch,
      dataConfigImage,
      id: 0,
      sub: 1,
    };
    expect(await controller.follow(dto)).toEqual(artist);
  });

  it("following should equal list of artists", async () => {
    const dto: ArtistFollowingReqDto = {
      config,
      dataConfigElasticsearch,
      dataConfigImage,
      from: 0,
      size: 0,
      sub: 1,
    };
    expect(await controller.following(dto)).toEqual([artist]);
  });

  it("get should be equal to an artist", async () => {
    const dto: ArtistGetReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      id: 0,
    };
    expect(await controller.get(dto)).toEqual(artist);
  });

  it("getByIds should equal list of artists", async () => {
    const dto: ArtistGetByIdsReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      ids: [0],
    };
    expect(await controller.getByIds(dto)).toEqual([artist]);
  });

  it("profile should be equal to an artist", async () => {
    const dto: ArtistGetReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      id: 0,
    };
    expect(await controller.profile(dto)).toEqual(artist);
  });

  it("transform should be equal to a ArtistResDto", async () => {
    const dto: DataElasticsearchArtistResDto = {
      available: false,
      dataConfigElasticsearch,
      dataConfigImage,
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
      type: DataArtistType.prime,
    };
    expect(await controller.transform(dto)).toEqual(artist);
  });

  it("trending should equal list of artists", async () => {
    const dto: ArtistTrendingReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
    };
    expect(await controller.trending(dto)).toEqual([artist]);
  });

  it("trending/genre should equal list of artists", async () => {
    const dto: ArtistTrendingGenreReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      genre: "pop",
    };
    expect(await controller.trendingGenre(dto)).toEqual([artist]);
  });

  it("unfollow should be equal to an artist", async () => {
    const dto: ArtistUnfollowReqDto = {
      dataConfigElasticsearch,
      dataConfigImage,
      id: 0,
      sub: 1,
    };
    expect(await controller.unfollow(dto)).toEqual(artist);
  });
});
