import { HealthCheckError } from "@godaddy/terminus";
import { Injectable } from "@nestjs/common";
import { HealthIndicator, HealthIndicatorResult } from "@nestjs/terminus";

@Injectable()
export class RtHealthIndicator extends HealthIndicator {
  async isHealthy(): Promise<HealthIndicatorResult> {
    const isHealthy = true;
    const result = this.getStatus("rt", isHealthy, {
      message: "OK",
      statusCode: 200
    });

    if (isHealthy) {
      return Promise.resolve(result);
    }
    throw new HealthCheckError("Rt failed.", result);
  }
}
