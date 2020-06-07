import {
  ALBUM_SERVICE,
  ALBUM_SERVICE_GET,
  AlbumArtistsReqDto,
  AlbumGetReqDto,
  AlbumLatestReqDto,
  AlbumResDto,
  ArtistResDto,
  ArtistType,
  ConstImageResDto,
} from "@melo/common";

import { AlbumService } from "./album.service";
import { Test } from "@nestjs/testing";
import { of } from "rxjs";

describe("AlbumService", () => {
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

  // TODO: interface ?
  const albumClientProxyMock = {
    send: (token: string) =>
      token === ALBUM_SERVICE_GET ? of(album) : of([album]),
  };

  let service: AlbumService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AlbumService,
        { provide: ALBUM_SERVICE, useValue: albumClientProxyMock },
      ],
    }).compile();
    service = module.get<AlbumService>(AlbumService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("albums should equal list of albums", async () => {
    const dto: AlbumArtistsReqDto = {
      from: 0,
      id: 0,
      size: 0,
    };
    expect(await service.albums(dto)).toEqual([album]);
  });

  it("get should be equal to an album", async () => {
    const dto: AlbumGetReqDto = {
      id: 0,
    };
    expect(await service.get(dto)).toEqual(album);
  });

  it("latest should equal list of albums", async () => {
    const dto: AlbumLatestReqDto = {
      from: 0,
      language: "",
      size: 0,
    };
    expect(await service.latest(dto)).toEqual([album]);
  });
});
