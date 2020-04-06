import { HealthIndicator, HealthIndicatorResult } from "@nestjs/terminus";

import { HealthCheckError } from "@godaddy/terminus";
import { Injectable } from "@nestjs/common";

@Injectable()
export class JwksHealthIndicator extends HealthIndicator {
  async isHealthy(): Promise<HealthIndicatorResult> {
    const isHealthy = true;
    const result = this.getStatus("jwks", isHealthy);
    if (isHealthy) {
      return Promise.resolve(result);
    }
    throw new HealthCheckError("Jwks failed.", result);
  }
}
