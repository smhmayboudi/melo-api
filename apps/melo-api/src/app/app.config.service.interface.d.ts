import { LogLevel } from "@sentry/types";

export interface AppConfigServiceInterface {
  apmActive: boolean;
  apmLogLevel: string;
  apmSecretToken: string;
  apmServerUrl: string;
  apmServiceName: string;
  cacheHost: string;
  cacheMax: number;
  cachePort: number;
  cacheStore: string;
  cacheTTL: number;
  hashIdAlphabet: string;
  hashIdMinLength: number;
  hashIdSalt: string;
  hashIdSeps: string;
  port: number;
  promDefaultLabels: Record<string, string>;
  promDefaultMetricsEnabled: boolean;
  promPath: string;
  promPrefix: string;
  rateLimitMax: number;
  rateLimitWindowMs: number;
  sentryDebug: boolean;
  sentryDsn: string;
  sentryEnviroment: string;
  sentryLogLevel: LogLevel;
  sentryRelease: string;
}
