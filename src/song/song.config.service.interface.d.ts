export interface SongConfigServiceInterface {
  cacheHost: string;
  cacheMax: number;
  cachePort: number;
  cacheStore: string;
  cacheTTL: number;
  resultSize: number;
  sendTelegramUrl: string;
  timeout: number;
}
