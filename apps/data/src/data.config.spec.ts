import config from "./data.config";

describe("DataConfig", () => {
  it("should be defined", () => {
    expect(config()).toStrictEqual({
      elasticNode: undefined,
      imageBaseUrl: undefined,
      imageEncode: undefined,
      imageKey: undefined,
      imagePath: undefined,
      imagePathDefaultAlbum: undefined,
      imagePathDefaultArtist: undefined,
      imagePathDefaultSong: undefined,
      imageSalt: undefined,
      imageSignatureSize: undefined,
      imageTypeSize: undefined,
      indexName: undefined,
      maxSize: undefined,
      mp3Endpoint: undefined,
      typeOrmDatabase: undefined,
      typeOrmHost: undefined,
      typeOrmLogging: undefined,
      typeOrmPassword: undefined,
      typeOrmPort: undefined,
      typeOrmSynchronize: undefined,
      typeOrmUsername: undefined,
    });
  });
});
