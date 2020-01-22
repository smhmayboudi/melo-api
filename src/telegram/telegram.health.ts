import { HealthCheckError } from "@godaddy/terminus";
import { Injectable } from "@nestjs/common";
import { HealthIndicator, HealthIndicatorResult } from "@nestjs/terminus";

@Injectable()
export class TelegramHealthIndicator extends HealthIndicator {
  async isHealthy(): Promise<HealthIndicatorResult> {
    const isHealthy = true;
    const result = this.getStatus("telegram", isHealthy, {
      message: "OK",
      statusCode: 200
    });

    if (isHealthy) {
      return Promise.resolve(result);
    }
    throw new HealthCheckError("Telegram failed.", result);
  }
}
