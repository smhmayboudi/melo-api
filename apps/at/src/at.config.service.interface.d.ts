import { LogLevel } from "@sentry/types";

export interface AtConfigServiceInterface {
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
