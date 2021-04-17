import {
  AlbumResDto,
  ArtistResDto,
  ArtistType,
  ConstImageResDto,
  DOWNLOAD_SERVICE,
  DownloadOrderByType,
  DownloadSongReqDto,
  DownloadSongResDto,
  SongAudioResDto,
  SongResDto,
} from "@melo/common";

import { DownloadService } from "./download.service";
import { Test } from "@nestjs/testing";
import { of } from "rxjs";

describe("DownloadService", () => {
  const downloadedAt = new Date();
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
    downloadedAt,
    song,
  };

  // TODO: interface ?
  const downloadClientProxyMock = {
    send: () => of([downloadSong]),
  };

  let service: DownloadService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        DownloadService,
        { provide: DOWNLOAD_SERVICE, useValue: downloadClientProxyMock },
      ],
    }).compile();
    service = module.get<DownloadService>(DownloadService);
  });

  it("downloadedSongs should return an array of songId and dates", async () => {
    const dto: DownloadSongReqDto = {
      filter: "",
      from: 0,
      orderBy: DownloadOrderByType.asc,
      size: 0,
      sub: 1,
    };
    expect(await service.downloadedSongs(dto)).toEqual([downloadSong]);
  });
});
