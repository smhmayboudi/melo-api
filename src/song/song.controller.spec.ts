import { forwardRef, HttpService } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { DataPaginationResDto } from "../data/dto/res/data.pagination.res.dto";
import { DataSongResDto } from "../data/dto/res/data.song.res.dto";
import { RelationEntityType } from "../relation/relation.entity.type";
import { AppMixSongService } from "../app/app.mix-song.service";
import { AppModule } from "../app/app.module";
import { DataArtistType } from "../data/data.artist.type";
import { DataSongService } from "../data/data.song.service";
import { RelationService } from "../relation/relation.service";
import { UserService } from "../user/user.service";
import config from "./song.config";
import { SongConfigService } from "./song.config.service";
import { SongController } from "./song.controller";
import { SongService } from "./song.service";

describe("SongController", () => {
  let controller: SongController;
  let service: SongService;

  const appMixSongServiceMock = jest.fn(() => ({
    mixSong: {
      return: [
        {
          artists: [
            {
              followersCount: 0,
              id: 0,
              type: "prime"
            }
          ],
          audio: {
            high: {
              fingerprint: "",
              url: ""
            }
          },
          duration: 0,
          id: "",
          localized: false,
          releaseDate: new Date(),
          title: ""
        }
      ]
    }
  }));

  const dataSongServiceMock = jest.fn(() => ({
    byIds: {
      results: [
        {
          artists: [
            {
              followersCount: 0,
              id: "",
              type: DataArtistType.prime
            }
          ],
          audio: {},
          duration: 0,
          id: "",
          localized: false,
          releaseDate: new Date(),
          title: ""
        }
      ],
      total: 1
    },
    artistSongs: {
      results: [
        {
          artists: [
            {
              followersCount: 0,
              id: "",
              type: DataArtistType.feat
            }
          ],
          audio: {},
          duration: 0,
          id: "",
          localized: false,
          releaseDate: new Date(),
          title: ""
        }
      ],
      total: 1
    },
    artistSongsTop: {
      results: [
        {
          artists: [
            {
              followersCount: 0,
              id: "",
              type: DataArtistType.feat
            }
          ],
          audio: {},
          duration: 0,
          id: "",
          localized: false,
          releaseDate: new Date(),
          title: ""
        }
      ],
      total: 1
    },
    byId: {
      artists: [
        {
          followersCount: 0,
          id: "",
          type: DataArtistType.feat
        }
      ],
      audio: {},
      duration: 0,
      id: "",
      localized: false,
      releaseDate: new Date(),
      title: ""
    },
    genre: {
      results: [
        {
          artists: [
            {
              followersCount: 0,
              id: "",
              type: DataArtistType.feat
            }
          ],
          audio: {},
          duration: 0,
          id: "",
          localized: false,
          releaseDate: new Date(),
          title: ""
        }
      ],
      total: 1
    },
    language: {
      results: [
        {
          artists: [
            {
              followersCount: 0,
              id: "",
              type: DataArtistType.feat
            }
          ],
          audio: {},
          duration: 0,
          id: "",
          localized: false,
          releaseDate: new Date(),
          title: ""
        }
      ],
      total: 1
    },
    mood: {
      results: [
        {
          artists: [
            {
              followersCount: 0,
              id: "",
              type: DataArtistType.feat
            }
          ],
          audio: {},
          duration: 0,
          id: "",
          localized: false,
          releaseDate: new Date(),
          title: ""
        }
      ],
      total: 1
    },
    new: {
      results: [
        {
          artists: [
            {
              followersCount: 0,
              id: "",
              type: DataArtistType.feat
            }
          ],
          audio: {},
          duration: 0,
          id: "",
          localized: false,
          releaseDate: new Date(),
          title: ""
        }
      ],
      total: 1
    },
    newPodcast: {
      results: [
        {
          artists: [
            {
              followersCount: 0,
              id: "",
              type: DataArtistType.feat
            }
          ],
          audio: {},
          duration: 0,
          id: "",
          localized: false,
          releaseDate: new Date(),
          title: ""
        }
      ],
      total: 1
    },
    podcast: {
      results: [
        {
          artists: [
            {
              followersCount: 0,
              id: "",
              type: DataArtistType.feat
            }
          ],
          audio: {},
          duration: 0,
          id: "",
          localized: false,
          releaseDate: new Date(),
          title: ""
        }
      ],
      total: 1
    },
    searchMood: {
      results: [
        {
          artists: [
            {
              followersCount: 0,
              id: "",
              type: DataArtistType.feat
            }
          ],
          audio: {},
          duration: 0,
          id: "",
          localized: false,
          releaseDate: new Date(),
          title: ""
        }
      ],
      total: 1
    },
    similar: {
      results: [
        {
          artists: [
            {
              followersCount: 0,
              id: "",
              type: DataArtistType.feat
            }
          ],
          audio: {},
          duration: 0,
          id: "",
          localized: false,
          releaseDate: new Date(),
          title: ""
        }
      ],
      total: 1
    },
    slider: {
      results: [
        {
          artists: [
            {
              followersCount: 0,
              id: "",
              type: DataArtistType.feat
            }
          ],
          audio: {},
          duration: 0,
          id: "",
          localized: false,
          releaseDate: new Date(),
          title: ""
        }
      ],
      total: 1
    },
    topDay: {
      results: [
        {
          artists: [
            {
              followersCount: 0,
              id: "",
              type: DataArtistType.feat
            }
          ],
          audio: {},
          duration: 0,
          id: "",
          localized: false,
          releaseDate: new Date(),
          title: ""
        }
      ],
      total: 1
    },
    topWeek: {
      results: [
        {
          artists: [
            {
              followersCount: 0,
              id: "",
              type: DataArtistType.feat
            }
          ],
          audio: {},
          duration: 0,
          id: "",
          localized: false,
          releaseDate: new Date(),
          title: ""
        }
      ],
      total: 1
    }
  }));

  const songHttpServiceMock = jest.fn(() => ({
    post: 0
  }));

  const relationServiceMock = jest.fn(() => ({
    get: {
      results: [
        {
          id: "",
          type: RelationEntityType.album
        }
      ],
      total: 1
    },
    remove: {},
    set: {}
  }));

  const userServiceMock = jest.fn(() => ({
    findOneById: {
      id: 0
    }
  }));
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SongController],
      imports: [forwardRef(() => AppModule), ConfigModule.forFeature(config)],
      providers: [
        SongConfigService,
        SongService,
        { provide: AppMixSongService, useValue: appMixSongServiceMock },
        { provide: DataSongService, useValue: dataSongServiceMock },
        { provide: HttpService, useValue: songHttpServiceMock },
        { provide: RelationService, useValue: relationServiceMock },
        { provide: UserService, useValue: userServiceMock }
      ]
    }).compile();

    controller = module.get<SongController>(SongController);
    service = module.get<SongService>(SongService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("artistSongs should return a list of songs", async () => {
    const req = {
      from: 0,
      artistId: "",
      limit: 0
    };
    const res = {
      results: [
        {
          artists: [
            {
              followersCount: 0,
              id: "",
              type: DataArtistType.prime
            }
          ],
          audio: {},
          duration: 0,
          id: "",
          localized: false,
          releaseDate: new Date(),
          title: ""
        }
      ],
      total: 1
    } as DataPaginationResDto<DataSongResDto>;
    jest
      .spyOn(service, "artistSongs")
      .mockImplementation(() => Promise.resolve(res));

    expect(await controller.artistSongs(req, 0, 0)).toBe(res);
  });

  it("artistSongsTop should return a list of songs", async () => {
    const req = {
      from: 0,
      artistId: "",
      limit: 0
    };
    const res = {
      results: [
        {
          artists: [
            {
              followersCount: 0,
              id: "",
              type: DataArtistType.prime
            }
          ],
          audio: {},
          duration: 0,
          id: "",
          localized: false,
          releaseDate: new Date(),
          title: ""
        }
      ],
      total: 1
    } as DataPaginationResDto<DataSongResDto>;
    jest
      .spyOn(service, "artistSongs")
      .mockImplementation(() => Promise.resolve(res));

    expect(await controller.artistSongs(req, 0, 0)).toBe(res);
  });

  test.todo("");
  test.todo("byId");
  test.todo("genre");
  test.todo("language");
  test.todo("like");
  test.todo("liked");
  test.todo("mood");
  test.todo("new");
  test.todo("newPodcast");
  test.todo("podcastGenres");
  test.todo("sendTelegram");
  test.todo("similar");
  test.todo("slider");
  test.todo("topDay");
  test.todo("topWeek");
  test.todo("unlike");
});
