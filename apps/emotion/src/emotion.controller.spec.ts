import {
  AlbumResDto,
  ArtistResDto,
  ArtistType,
  ConstImageResDto,
  EmotionEmotionsReqDto,
  EmotionEmotionsResDto,
  SongAudioResDto,
  SongResDto,
} from "@melo/common";

import { EmotionController } from "./emotion.controller";
import { EmotionService } from "./emotion.service";
import { EmotionServiceInterface } from "./emotion.service.interface";
import { Test } from "@nestjs/testing";

describe("EmotionController", () => {
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
  const emotion: EmotionEmotionsResDto = {
    emotions: [""],
    song,
  };
  const emotionServiceMock: EmotionServiceInterface = {
    emotions: () => Promise.resolve([emotion]),
  };

  let controller: EmotionController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [EmotionController],
      providers: [{ provide: EmotionService, useValue: emotionServiceMock }],
    }).compile();
    controller = module.get<EmotionController>(EmotionController);
  });

  it("emotions should return a list of emotions", async () => {
    const dto: EmotionEmotionsReqDto = {
      emotions: [""],
      from: 0,
      size: 0,
      sub: 1,
    };
    expect(await controller.emotions(dto)).toEqual([emotion]);
  });
});
