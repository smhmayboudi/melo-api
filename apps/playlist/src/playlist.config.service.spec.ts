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

  it("mongooseRetryAttempts should be equal to a value", () => {
    expect(service.mongooseRetryAttempts).toEqual(0);
  });

  it("mongooseRetryDelay should be equal to a value", () => {
    expect(service.mongooseRetryDelay).toEqual(0);
  });

  it("mongooseUri should be equal to a value", () => {
    expect(service.mongooseUri).toEqual("");
  });

  it("servicePort should be equal to a value", () => {
    expect(service.servicePort).toEqual(0);
  });

  it("serviceRetryAttempts should be equal to a value", () => {
    expect(service.serviceRetryAttempts).toEqual(0);
  });

  it("serviceRetryDelay should be equal to a value", () => {
    expect(service.serviceRetryDelay).toEqual(0);
  });

  it("serviceUrl should be equal to a value", () => {
    expect(service.serviceUrl).toEqual("");
  });
});
