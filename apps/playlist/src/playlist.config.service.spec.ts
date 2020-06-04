import { ConfigService } from "@nestjs/config";
import { PlaylistConfigService } from "./playlist.config.service";
import { Test } from "@nestjs/testing";

describe("PlaylistConfigService", () => {
  // TODO: interface ?
  const configServiceMock = {
    get: (_propertyPath: string, defaultValue: any): any => defaultValue,
  };

  let service: PlaylistConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: ConfigService,
          useValue: configServiceMock,
        },
        PlaylistConfigService,
      ],
    }).compile();
    service = module.get<PlaylistConfigService>(PlaylistConfigService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("imagePath should return value", () => {
    expect(service.imagePath).toEqual("");
  });

  it("imagePathDefaultPlaylist should return value", () => {
    expect(service.imagePathDefaultPlaylist).toEqual("");
  });
});
