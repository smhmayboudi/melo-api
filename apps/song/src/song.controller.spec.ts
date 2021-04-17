import {
  AlbumResDto,
  ArtistResDto,
  ArtistType,
  ConstImageResDto,
  SearchElasticsearchArtistResDto,
  SearchElasticsearchSearchResDto,
  SearchType,
  SongAlbumSongsReqDto,
  SongArtistSongsReqDto,
  SongAudioResDto,
  SongGenreReqDto,
  SongGetByIdsReqDto,
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

import { SongController } from "./song.controller";
import { SongService } from "./song.service";
import { SongServiceInterface } from "./song.service.interface";
import { Test } from "@nestjs/testing";

describe("SongController", () => {
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

  const songServiceMock: SongServiceInterface = {
    albumSongs: () => Promise.resolve([song]),
    artistSongs: () => Promise.resolve([song]),
    artistSongsTop: () => Promise.resolve([song]),
    genre: () => Promise.resolve([song]),
    get: () => Promise.resolve(song),
    getByIds: () => Promise.resolve([song]),
    language: () => Promise.resolve([song]),
    like: () => Promise.resolve(song),
    liked: () => Promise.resolve([song]),
    mood: () => Promise.resolve([song]),
    newPodcast: () => Promise.resolve([song]),
    newSong: () => Promise.resolve([song]),
    podcast: () => Promise.resolve([song]),
    sendTelegram: () => Promise.resolve(undefined),
    similar: () => Promise.resolve([song]),
    slider: () => Promise.resolve([song]),
    topDay: () => Promise.resolve([song]),
    topWeek: () => Promise.resolve([song]),
    transform: () => Promise.resolve(song),
    unlike: () => Promise.resolve(song),
  };

  let controller: SongController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [SongController],
      providers: [{ provide: SongService, useValue: songServiceMock }],
    }).compile();
    controller = module.get<SongController>(SongController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("albumSongs should be equal to a list of songs", async () => {
    const dto: SongAlbumSongsReqDto = {
      id: 0,
    };
    expect(await controller.albumSongs(dto)).toEqual([song]);
  });

  it("artistSongs should be equal to a list of songs", async () => {
    const dto: SongArtistSongsReqDto = {
      from: 0,
      id: 0,
      size: 0,
    };
    expect(await controller.artistSongs(dto)).toEqual([song]);
  });

  it("artistSongsTop should be equal to a list of songs", async () => {
    const dto: SongArtistSongsReqDto = {
      from: 0,
      id: 0,
      size: 0,
    };
    expect(await controller.artistSongsTop(dto)).toEqual([song]);
  });

  it("genre should be equal to a list of songs", async () => {
    const dto: SongGenreReqDto = {
      from: 0,
      genres: [""],
      orderBy: SongOrderByType.downloads,
      size: 0,
    };
    expect(await controller.genre(dto)).toEqual([song]);
  });

  it("get should be equal to a song", async () => {
    const dto: SongGetReqDto = {
      id: 0,
    };
    expect(await controller.get(dto)).toEqual(song);
  });

  it("getByIds should be equal to a list of songs", async () => {
    const dto: SongGetByIdsReqDto = {
      ids: [],
    };
    expect(await controller.getByIds(dto)).toEqual([song]);
  });

  it("language should be equal to a list of songs", async () => {
    const dto: SongLanguageReqDto = {
      from: 0,
      language: "",
      orderBy: SongOrderByType.downloads,
      size: 0,
    };
    expect(await controller.language(dto)).toEqual([song]);
  });

  it("likes should be equal to a songs", async () => {
    const dto: SongLikeReqDto = {
      id: 0,
      sub: 1,
    };
    expect(await controller.like(dto)).toEqual(song);
  });

  it("liked should be equal to a list of songs", async () => {
    const dto: SongLikedReqDto = {
      from: 0,
      size: 0,
      sub: 1,
    };
    expect(await controller.liked(dto)).toEqual([song]);
  });

  it("mood should be equal to a list of songs", async () => {
    const dto: SongMoodReqDto = {
      from: 0,
      mood: "",
      size: 0,
    };
    expect(await controller.mood(dto)).toEqual([song]);
  });

  it("newPodcast should be equal to a list of songs", async () => {
    const dto: SongNewPodcastReqDto = {
      from: 0,
      size: 0,
    };
    expect(await controller.newPodcast(dto)).toEqual([song]);
  });

  it("newSong should be equal to a list of songs", async () => {
    const dto: SongNewReqDto = {
      from: 0,
      size: 0,
    };
    expect(await controller.newSong(dto)).toEqual([song]);
  });

  it("podcast should be equal to a list of songs", async () => {
    const dto: SongPodcastReqDto = {
      from: 0,
      genres: [""],
      orderBy: SongOrderByType.downloads,
      size: 0,
    };
    expect(await controller.podcast(dto)).toEqual([song]);
  });

  it("sendTelegram should be undefined", async () => {
    const dto: SongSendTelegramReqDto = {
      id: 0,
      sub: 1,
    };
    expect(await controller.sendTelegram(dto)).toBeUndefined();
  });

  it("similar should be equal to a list of songs", async () => {
    const dto: SongSimilarReqDto = {
      from: 0,
      id: 0,
      size: 0,
    };
    expect(await controller.similar(dto)).toEqual([song]);
  });

  it("slider should be equal to a list of songs", async () => {
    const dto: SongSliderReqDto = {};
    expect(await controller.slider(dto)).toEqual([song]);
  });

  it("topDay should be equal to a list of songs", async () => {
    const dto: SongTopDayReqDto = {
      from: 0,
      size: 0,
    };
    expect(await controller.topDay(dto)).toEqual([song]);
  });

  it("topWeek should be equal to a list of songs", async () => {
    const dto: SongTopWeekReqDto = {
      from: 0,
      size: 0,
    };
    expect(await controller.topWeek(dto)).toEqual([song]);
  });

  it("transform should be equal to a songs", async () => {
    const artistElastic: SearchElasticsearchArtistResDto = {
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
    const dto: SearchElasticsearchSearchResDto = {
      album: "",
      album_downloads_count: 0,
      album_id: 0,
      album_tracks_count: 0,
      artist_followers_count: 0,
      artist_full_name: "",
      artist_id: 0,
      artist_sum_downloads_count: 1,
      artists: [artistElastic],
      copyright: false,
      downloads_count: 0,
      duration: 0,
      has_cover: false,
      has_video: false,
      id: 0,
      localize: false,
      lyrics: "",
      max_audio_rate: 0,
      release_date: releaseDate,
      tags: [
        {
          tag: "",
        },
      ],
      title: "",
      type: SearchType.album,
      unique_name: "",
    };
    expect(await controller.transform(dto)).toEqual(song);
  });

  it("unlike should be equal to a songs", async () => {
    const dto: SongUnlikeReqDto = {
      id: 0,
      sub: 1,
    };
    expect(await controller.unlike(dto)).toEqual(song);
  });
});
