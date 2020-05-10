export interface DataConfigServiceInterface {
  defaultAlbumImagePath: string;
  defaultArtistImagePath: string;
  defaultSongImagePath: string;
  elasticNode: string;
  imagePath: (id: string) => string;
  index: string;
  mp3Endpoint: string;
  resultSize: number;
}
