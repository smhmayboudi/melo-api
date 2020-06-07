import {
  AlbumResDto,
  ArtistResDto,
  ArtistType,
  ConstImageResDto,
  DownloadOrderByType,
  DownloadSongReqDto,
  DownloadSongResDto,
  SongAudioResDto,
  SongResDto,
} from "@melo/common";

import { DownloadController } from "./download.controller";
import { DownloadService } from "./download.service";
import { DownloadServiceInterface } from "./download.service.interface";
import { Test } from "@nestjs/testing";

describe("DownloadController", () => {
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
  const downloadSong: DownloadSongResDto = {
    downloadedAt: releaseDate,
    song,
  };

  const downloadServiceMock: DownloadServiceInterface = {
    downloadedSongs: () => Promise.resolve([downloadSong]),
  };

  let controller: DownloadController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [DownloadController],
      providers: [{ provide: DownloadService, useValue: downloadServiceMock }],
    }).compile();
    controller = module.get<DownloadController>(DownloadController);
  });

  it("downloadedSongs should return an array of songId and dates", async () => {
    const dto: DownloadSongReqDto = {
      filter: "",
      from: 0,
      orderBy: DownloadOrderByType.asc,
      size: 0,
      sub: 1,
    };
    expect(await controller.downloadedSongs(dto)).toEqual([downloadSong]);
  });
});
