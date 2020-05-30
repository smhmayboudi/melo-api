export interface SongConfigServiceInterface {
  cacheHost: string;
  cacheMax: number;
  cachePort: number;
  cacheStore: string;
  cacheTTL: number;
  maxSize: number;
  sendTimeout: number;
  sendUrl: string;
}
