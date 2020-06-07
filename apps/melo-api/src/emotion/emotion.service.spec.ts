import {
  AlbumResDto,
  ArtistResDto,
  ArtistType,
  ConstImageResDto,
  EMOTION_SERVICE,
  EmotionEmotionsReqDto,
  EmotionEmotionsResDto,
  SongAudioResDto,
  SongResDto,
} from "@melo/common";

import { EmotionService } from "./emotion.service";
import { Test } from "@nestjs/testing";
import { of } from "rxjs";

describe("EmotionService", () => {
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
  const emotions: EmotionEmotionsResDto = {
    emotions: [""],
    song,
  };

  // TODO: interface ?
  const emotionClientProxyMock = {
    send: () => of([emotions]),
  };

  let service: EmotionService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        EmotionService,
        { provide: EMOTION_SERVICE, useValue: emotionClientProxyMock },
      ],
    }).compile();
    service = module.get<EmotionService>(EmotionService);
  });

  it("emotions should return a list of emotions", async () => {
    const dto: EmotionEmotionsReqDto = {
      emotions: [""],
      from: 0,
      size: 0,
      sub: 1,
    };
    expect(await service.emotions(dto)).toEqual([emotions]);
  });
});
