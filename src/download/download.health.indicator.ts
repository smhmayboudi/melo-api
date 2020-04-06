import { HealthIndicator, HealthIndicatorResult } from "@nestjs/terminus";

import { HealthCheckError } from "@godaddy/terminus";
import { Injectable } from "@nestjs/common";

@Injectable()
export class DownloadHealthIndicator extends HealthIndicator {
  async isHealthy(): Promise<HealthIndicatorResult> {
    const isHealthy = true;
    const result = this.getStatus("download", isHealthy, {
      message: "OK",
      statusCode: 200,
    });
    if (isHealthy) {
      return Promise.resolve(result);
    }
    throw new HealthCheckError("Download failed.", result);
  }
}
