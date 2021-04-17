import { HealthIndicatorResult } from "@nestjs/terminus";

export interface AppHealthIndicatorInterface {
  isHealthy(): Promise<HealthIndicatorResult>;
}
