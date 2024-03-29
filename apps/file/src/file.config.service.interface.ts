export interface FileConfigServiceInterface {
  s3AccessKeyId: string;
  s3Bucket: string;
  s3Endpoint: string;
  s3ForcePathStyle: boolean;
  s3SecretAccessKey: string;
  s3SslEnabled: boolean;
  servicePort: number;
  serviceRetryAttempts: number;
  serviceRetryDelay: number;
  serviceUrl: string;
  typeormDatabase: string;
  typeormHost: string;
  typeormLogging: boolean;
  typeormPassword: string;
  typeormPort: number;
  typeormSynchronize: boolean;
  typeormUsername: string;
}
