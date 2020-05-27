import { HealthIndicatorResult } from "@nestjs/terminus";

export interface HealthIndicatorInterface {
  isHealthy(): Promise<HealthIndicatorResult>;
}
