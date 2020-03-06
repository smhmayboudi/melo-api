export interface ConstConfigServiceInterface {
  cacheHost: string;
  cacheMax: number;
  cachePort: number;
  cacheStore: string;
  cacheTTL: number;
  staticImagePaths: { [key: string]: string };
}
