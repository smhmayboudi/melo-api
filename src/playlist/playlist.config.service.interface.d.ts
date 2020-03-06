export interface PlaylistConfigServiceInterface {
  cacheHost: string;
  cacheMax: number;
  cachePort: number;
  cacheStore: string;
  cacheTTL: number;
  defaultImagePath: string;
  imagePath: (id: string) => string;
}
