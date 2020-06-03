import { ConfigService } from "@nestjs/config";
import { DataConfigService } from "./data.config.service";
import { Test } from "@nestjs/testing";

describe("DataConfigService", () => {
  // TODO: interface ?
  const configServiceMock = {
    get: (_propertyPath: string, defaultValue: any): any => defaultValue,
  };

  let service: DataConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: ConfigService,
          useValue: configServiceMock,
        },
        DataConfigService,
      ],
    }).compile();
    service = module.get<DataConfigService>(DataConfigService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("elasticsearchNode should return value", () => {
    expect(service.elasticsearchNode).toEqual("");
  });

  it("imageBaseUrl should return value", () => {
    expect(service.imageBaseUrl).toEqual("");
  });

  it("imageEncode should be equal to a value", () => {
    expect(service.imageEncode).toEqual(true);
  });

  it("imageKey should be equal to a value", () => {
    expect(service.imageKey).toEqual("");
  });

  it("imagePath should return value", () => {
    expect(service.imagePath).toEqual("");
  });

  it("imagePathDefaultAlbum should return value", () => {
    expect(service.imagePathDefaultAlbum).toEqual("");
  });

  it("imagePathDefaultArtist should return value", () => {
    expect(service.imagePathDefaultArtist).toEqual("");
  });

  it("imagePathDefaultSong should return value", () => {
    expect(service.imagePathDefaultSong).toEqual("");
  });

  it("imageSalt should be equal to a value", () => {
    expect(service.imageSalt).toEqual("");
  });

  it("imageSignatureSize should be equal to a value", () => {
    expect(service.imageSignatureSize).toEqual(1);
  });

  it("imageTypeSize should be equal to a value", () => {
    expect(service.imageTypeSize).toEqual([
      {
        height: 0,
        name: "",
        width: 0,
      },
    ]);
  });

  it("index should return value", () => {
    expect(service.indexName).toEqual("");
  });

  it("maxSize should return a value", () => {
    expect(service.maxSize).toEqual(0);
  });

  it("mp3Endpoint should return value", () => {
    expect(service.mp3Endpoint).toEqual("");
  });

  it("typeormDatabase should be equal to a value", () => {
    expect(service.typeormDatabase).toEqual("");
  });

  it("typeormHost should be equal to a value", () => {
    expect(service.typeormHost).toEqual("");
  });

  it("typeormLogging should be equal to a value", () => {
    expect(service.typeormLogging).toEqual(true);
  });

  it("typeormPassword should be equal to a value", () => {
    expect(service.typeormPassword).toEqual("");
  });

  it("typeormPort should be equal to a value", () => {
    expect(service.typeormPort).toEqual(0);
  });

  it("typeormUsername should be equal to a value", () => {
    expect(service.typeormUsername).toEqual("");
  });

  it("typeormSynchronize should be equal to a value", () => {
    expect(service.typeormSynchronize).toEqual(false);
  });
});
