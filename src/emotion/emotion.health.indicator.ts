import { HealthIndicator, HealthIndicatorResult } from "@nestjs/terminus";

import { HealthCheckError } from "@godaddy/terminus";
import { Injectable } from "@nestjs/common";

@Injectable()
export class EmotionHealthIndicator extends HealthIndicator {
  async isHealthy(): Promise<HealthIndicatorResult> {
    const isHealthy = true;
    const result = this.getStatus("emotion", isHealthy, {
      message: "OK",
      statusCode: 200,
    });
    if (isHealthy) {
      return Promise.resolve(result);
    }
    throw new HealthCheckError("Emotion failed.", result);
  }
}
