import { HealthCheckError } from "@godaddy/terminus";
import { Injectable } from "@nestjs/common";
import { HealthIndicator, HealthIndicatorResult } from "@nestjs/terminus";

@Injectable()
export class ConstHealthIndicator extends HealthIndicator {
  async isHealthy(): Promise<HealthIndicatorResult> {
    const isHealthy = true;
    const result = this.getStatus("const", isHealthy, {
      message: "OK",
      statusCode: 200
    });
    if (isHealthy) {
      return Promise.resolve(result);
    }
    throw new HealthCheckError("Const failed.", result);
  }
}
