import {
  HealthCheckError,
  HealthIndicator,
  HealthIndicatorResult,
} from "@nestjs/terminus";

import { AppHealthIndicatorInterface } from "@melo/common";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ConstHealthIndicator extends HealthIndicator
  implements AppHealthIndicatorInterface {
  async isHealthy(): Promise<HealthIndicatorResult> {
    const isHealthy = true;
    const result = this.getStatus("const", isHealthy);
    if (isHealthy) {
      return Promise.resolve(result);
    }
    throw new HealthCheckError("Const failed.", result);
  }
}
