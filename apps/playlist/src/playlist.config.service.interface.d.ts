export interface PlaylistConfigServiceInterface {
  imagePath: string;
  imagePathDefaultPlaylist: string;
  mongooseRetryAttempts: number;
  mongooseRetryDelay: number;
  mongooseUri: string;
}
