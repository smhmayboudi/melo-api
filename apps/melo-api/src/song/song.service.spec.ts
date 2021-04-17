import {
  AlbumResDto,
  ArtistResDto,
  ArtistType,
  ConstImageResDto,
  SONG_SERVICE,
  SONG_SERVICE_GET,
  SONG_SERVICE_LIKE,
  SONG_SERVICE_SEND_TELEGRAM,
  SONG_SERVICE_UNLIKE,
  SongArtistSongsReqDto,
  SongAudioResDto,
  SongGenreReqDto,
  SongGetReqDto,
  SongLanguageReqDto,
  SongLikeReqDto,
  SongLikedReqDto,
  SongMoodReqDto,
  SongNewPodcastReqDto,
  SongNewReqDto,
  SongOrderByType,
  SongPodcastReqDto,
  SongResDto,
  SongSendTelegramReqDto,
  SongSimilarReqDto,
  SongSliderReqDto,
  SongTopDayReqDto,
  SongTopWeekReqDto,
  SongUnlikeReqDto,
} from "@melo/common";

import { SongService } from "./song.service";
import { Test } from "@nestjs/testing";
import { of } from "rxjs";

describe("SongService", () => {
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

  // TODO: interface ?
  const songClientProxyMock = {
    send: (token: string) =>
      token === SONG_SERVICE_SEND_TELEGRAM
        ? of(undefined)
        : token === SONG_SERVICE_GET
        ? of(song)
        : token === SONG_SERVICE_LIKE
        ? of(song)
        : token === SONG_SERVICE_UNLIKE
        ? of(song)
        : of([song]),
  };

  let service: SongService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        SongService,
        { provide: SONG_SERVICE, useValue: songClientProxyMock },
      ],
    }).compile();
    service = module.get<SongService>(SongService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("artistSongs should be equal to a list of songs", async () => {
    const dto: SongArtistSongsReqDto = {
      from: 0,
      id: 0,
      size: 0,
    };
    expect(await service.artistSongs(dto)).toEqual([song]);
  });

  it("artistSongsTop should be equal to a list of songs", async () => {
    const dto: SongArtistSongsReqDto = {
      from: 0,
      id: 0,
      size: 0,
    };
    expect(await service.artistSongsTop(dto)).toEqual([song]);
  });

  it("get should be equal to a song", async () => {
    const dto: SongGetReqDto = {
      id: 0,
    };
    expect(await service.get(dto)).toEqual(song);
  });

  it("genre should be equal to a list of songs", async () => {
    const dto: SongGenreReqDto = {
      from: 0,
      genres: [],
      orderBy: SongOrderByType.release,
      size: 0,
    };
    expect(await service.genre(dto)).toEqual([song]);
  });

  it("language should be equal to a list of songs", async () => {
    const dto: SongLanguageReqDto = {
      from: 0,
      language: "",
      orderBy: SongOrderByType.downloads,
      size: 0,
    };
    expect(await service.language(dto)).toEqual([song]);
  });

  it("likes should be equal to a songs", async () => {
    const dto: SongLikeReqDto = {
      id: 0,
      sub: 1,
    };
    expect(await service.like(dto)).toEqual(song);
  });

  it("liked should be equal to a list of songs", async () => {
    const dto: SongLikedReqDto = {
      from: 0,
      size: 0,
      sub: 1,
    };
    expect(await service.liked(dto)).toEqual([song]);
  });

  it("mood should be equal to a list of songs", async () => {
    const dto: SongMoodReqDto = {
      from: 0,
      mood: "",
      size: 0,
    };
    expect(await service.mood(dto)).toEqual([song]);
  });

  it("newPodcast should be equal to a list of songs", async () => {
    const dto: SongNewPodcastReqDto = {
      from: 0,
      size: 0,
    };
    expect(await service.newPodcast(dto)).toEqual([song]);
  });

  it("newSong should be equal to a list of songs", async () => {
    const dto: SongNewReqDto = {
      from: 0,
      size: 0,
    };
    expect(await service.newSong(dto)).toEqual([song]);
  });

  it("podcastGenre should be equal to a list of songs", async () => {
    const dto: SongPodcastReqDto = {
      from: 0,
      genres: [""],
      orderBy: SongOrderByType.downloads,
      size: 0,
    };
    expect(await service.podcast(dto)).toEqual([song]);
  });

  it("sendTelegram should be undefined", async () => {
    const dto: SongSendTelegramReqDto = {
      id: 0,
      sub: 1,
    };
    expect(await service.sendTelegram(dto)).toBeUndefined();
  });

  it("similar should be equal to a list of songs", async () => {
    const dto: SongSimilarReqDto = {
      from: 0,
      id: 0,
      size: 0,
    };
    expect(await service.similar(dto)).toEqual([song]);
  });

  it("slider should be equal to a list of songs", async () => {
    const dto: SongSliderReqDto = {};
    expect(await service.slider(dto)).toEqual([song]);
  });

  it("topDay should be equal to a list of songs", async () => {
    const dto: SongTopDayReqDto = {
      from: 0,
      size: 0,
    };
    expect(await service.topDay(dto)).toEqual([song]);
  });

  it("topWeek should be equal to a list of songs", async () => {
    const dto: SongTopWeekReqDto = {
      from: 0,
      size: 0,
    };
    expect(await service.topWeek(dto)).toEqual([song]);
  });

  it("unlike should be equal to a songs", async () => {
    const dto: SongUnlikeReqDto = {
      id: 0,
      sub: 1,
    };
    expect(await service.unlike(dto)).toEqual(song);
  });
});
