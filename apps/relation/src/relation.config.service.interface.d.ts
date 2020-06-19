export interface RelationConfigServiceInterface {
  dgraphAddress: string;
  dgraphDebug: boolean;
  servicePort: number;
  serviceRetryAttempts: number;
  serviceRetryDelay: number;
  serviceUrl: string;
}
