import {
  HealthCheckError,
  HealthIndicator,
  HealthIndicatorResult,
} from "@nestjs/terminus";

import { AppHealthIndicatorInterface } from "../app/app.health.indicator.interfce";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AtHealthIndicator extends HealthIndicator
  implements AppHealthIndicatorInterface {
  async isHealthy(): Promise<HealthIndicatorResult> {
    const isHealthy = true;
    const result = this.getStatus("at", isHealthy);
    if (isHealthy) {
      return Promise.resolve(result);
    }
    throw new HealthCheckError("At failed.", result);
  }
}
