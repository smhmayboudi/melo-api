import { PlaylistConfigService } from "./playlist.config.service";
import { PlaylistConfigServiceInterface } from "./playlist.config.service.interface";
import { PlaylistMongooseOptionsFactory } from "./playlist.mongoose.options.factory";
import { Test } from "@nestjs/testing";

describe("PlaylistMongooseOptionsFactory", () => {
  const playlistConfigServiceMock: PlaylistConfigServiceInterface = {
    imagePath: "",
    imagePathDefaultPlaylist: "",
    mangooseRetryAttempts: 0,
    mangooseRetryDelay: 0,
    mangooseUri: "",
  };

  let service: PlaylistConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        { provide: PlaylistConfigService, useValue: playlistConfigServiceMock },
      ],
    }).compile();
    service = module.get<PlaylistConfigService>(PlaylistConfigService);
  });

  it("should be defined", () => {
    expect(new PlaylistMongooseOptionsFactory(service)).toBeDefined();
  });

  it("createMongooseOptions should be equal to a value", () => {
    expect(
      new PlaylistMongooseOptionsFactory(service).createMongooseOptions()
    ).toEqual({
      retryAttempts: 0,
      retryDelay: 0,
      uri: "",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });
});
