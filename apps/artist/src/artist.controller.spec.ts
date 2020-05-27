import {
  ArtistConfigReqDto,
  ArtistFollowReqDto,
  ArtistFollowingReqDto,
  ArtistGetReqDto,
  ArtistResDto,
  ArtistTrendingGenreReqDto,
  ArtistTrendingReqDto,
  ArtistUnfollowReqDto,
  DataArtistType,
  DataConfigElasticSearchReqDto,
  DataConfigImageReqDto,
  DataPaginationResDto,
} from "@melo/common";
import { Test, TestingModule } from "@nestjs/testing";

import { ArtistController } from "./artist.controller";
import { ArtistService } from "./artist.service";
import { ArtistServiceInterface } from "./artist.service.interface";

describe("ArtistController", () => {
  const config: ArtistConfigReqDto = {
    maxSize: 0,
  };
  const dataConfigElasticSearch: DataConfigElasticSearchReqDto = {
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
    imageSignatureSize: 1,
    imageTypeSize: [
      {
        height: 0,
        name: "",
        width: 0,
      },
    ],
  };
  const artist: ArtistResDto = {
    followersCount: 0,
    id: 0,
    type: DataArtistType.prime,
  };
  const artistPagination: DataPaginationResDto<ArtistResDto> = {
    results: [artist],
    total: 1,
  } as DataPaginationResDto<ArtistResDto>;

  const artistServiceMock: ArtistServiceInterface = {
    follow: (): Promise<ArtistResDto> => Promise.resolve(artist),
    following: (): Promise<DataPaginationResDto<ArtistResDto>> =>
      Promise.resolve(artistPagination),
    profile: (): Promise<ArtistResDto> => Promise.resolve(artist),
    trending: (): Promise<DataPaginationResDto<ArtistResDto>> =>
      Promise.resolve(artistPagination),
    trendingGenre: (): Promise<DataPaginationResDto<ArtistResDto>> =>
      Promise.resolve(artistPagination),
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

  it("follows should be equal to an artist", async () => {
    const dto: ArtistFollowReqDto = {
      dataConfigElasticSearch,
      dataConfigImage,
      id: 0,
      sub: 1,
    };
    expect(await controller.follow(dto)).toEqual(artist);
  });

  it("following should equal list of artists", async () => {
    const dto: ArtistFollowingReqDto = {
      config,
      dataConfigElasticSearch,
      dataConfigImage,
      from: 0,
      size: 0,
      sub: 1,
    };
    expect(await controller.following(dto)).toEqual(artistPagination);
  });

  it("profile should be equal to an artist", async () => {
    const dto: ArtistGetReqDto = {
      dataConfigElasticSearch,
      dataConfigImage,
      id: 0,
    };
    expect(await controller.profile(dto)).toEqual(artist);
  });

  it("trending should equal list of artists", async () => {
    const dto: ArtistTrendingReqDto = {
      dataConfigElasticSearch,
      dataConfigImage,
    };
    expect(await controller.trending(dto)).toEqual(artistPagination);
  });

  it("trending/genre should equal list of artists", async () => {
    const dto: ArtistTrendingGenreReqDto = {
      dataConfigElasticSearch,
      dataConfigImage,
      genre: "pop",
    };
    expect(await controller.trendingGenre(dto)).toEqual(artistPagination);
  });

  it("unfollow should be equal to an artist", async () => {
    const dto: ArtistUnfollowReqDto = {
      dataConfigElasticSearch,
      dataConfigImage,
      id: 0,
      sub: 1,
    };
    expect(await controller.unfollow(dto)).toEqual(artist);
  });
});
