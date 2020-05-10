import { registerAs } from "@nestjs/config";

export default registerAs("data", () => ({
  defaultAlbumImagePath: process.env.DATA_DEFAULT_ALBUM_IMAGE_PATH,
  defaultArtistImagePath: process.env.DATA_DEFAULT_ARTIST_IMAGE_PATH,
  defaultSongImagePath: process.env.DATA_DEFAULT_SONG_IMAGE_PATH,
  elasticNode: process.env.DATA_ELASTIC_NODE,
  imagePath: process.env.DATA_IMAGE_PATH,
  index: process.env.DATA_INDEX_NAME,
  mp3Endpoint: process.env.DATA_MP3_ENDPOINT,
  resultSize: process.env.DATA_RESULT_SIZE,
}));
