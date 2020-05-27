import {
  ArtistGetByIdsReqDto,
  ArtistGetReqDto,
  ArtistResDto,
  ArtistTrendingGenreReqDto,
  ArtistTrendingReqDto,
  DataArtistType,
  DataConfigElasticSearchReqDto,
  DataConfigImageReqDto,
  DataPaginationResDto,
} from "@melo/common";
import { Test, TestingModule } from "@nestjs/testing";

import { DataArtistController } from "./data.artist.controller";
import { DataArtistService } from "./data.artist.service";
import { DataArtistServiceInterface } from "./data.artist.service.interface";

describe("DataArtistController", () => {
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

  const dataArtistServiceMock: DataArtistServiceInterface = {
    get: (): Promise<ArtistResDto> => Promise.resolve(artist),
    getByIds: (): Promise<DataPaginationResDto<ArtistResDto>> =>
      Promise.resolve(artistPagination),
    trending: (): Promise<DataPaginationResDto<ArtistResDto>> =>
      Promise.resolve(artistPagination),
    trendingGenre: (): Promise<DataPaginationResDto<ArtistResDto>> =>
      Promise.resolve(artistPagination),
  };

  let controller: DataArtistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataArtistController],
      providers: [
        { provide: DataArtistService, useValue: dataArtistServiceMock },
      ],
    }).compile();
    controller = module.get<DataArtistController>(DataArtistController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("get should equal list of artists", async () => {
    const dto: ArtistGetReqDto = {
      dataConfigElasticSearch,
      dataConfigImage,
      id: 0,
    };
    expect(await controller.get(dto)).toEqual(artist);
  });

  it("get should be equal to an artist", async () => {
    const dto: ArtistGetReqDto = {
      dataConfigElasticSearch,
      dataConfigImage,
      id: 0,
    };
    expect(await controller.get(dto)).toEqual(artist);
  });

  it("getByIds should equal list of artists", async () => {
    const dto: ArtistGetByIdsReqDto = {
      dataConfigElasticSearch,
      dataConfigImage,
      ids: [0],
    };
    expect(await controller.getByIds(dto)).toEqual(artistPagination);
  });

  it("trending should equal list of artists", async () => {
    const dto: ArtistTrendingReqDto = {
      dataConfigElasticSearch,
      dataConfigImage,
    };
    expect(await controller.trending(dto)).toEqual(artistPagination);
  });

  it("trendingGenre should equal list of artists", async () => {
    const dto: ArtistTrendingGenreReqDto = {
      dataConfigElasticSearch,
      dataConfigImage,
      genre: "",
    };
    expect(await controller.trendingGenre(dto)).toEqual(artistPagination);
  });
});
