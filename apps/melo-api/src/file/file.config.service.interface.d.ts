export interface FileConfigServiceInterface {
  cacheHost: string;
  cacheMax: number;
  cachePort: number;
  cacheStore: string;
  cacheTTL: number;
  s3AccessKeyId: string;
  s3Bucket: string;
  s3Endpoint: string;
  s3ForcePathStyle: boolean;
  s3SecretAccessKey: string;
  s3SslEnabled: boolean;
}
