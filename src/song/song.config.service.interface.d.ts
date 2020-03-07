export interface SongConfigServiceInterface {
  cacheHost: string;
  cacheMax: number;
  cachePort: number;
  cacheStore: string;
  cacheTTL: number;
  sendTelegramUrl: string;
  timeout: number;
}
