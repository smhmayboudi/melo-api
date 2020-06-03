import { LogLevel } from "@sentry/types";

export interface AtConfigServiceInterface {
  typeormDatabase: string;
  typeormHost: string;
  typeormLogging: boolean;
  typeormPassword: string;
  typeormPort: number;
  typeormSynchronize: boolean;
  typeormUsername: string;
}
