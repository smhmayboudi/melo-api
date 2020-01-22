import { HealthCheckError } from "@godaddy/terminus";
import { Injectable } from "@nestjs/common";
import { HealthIndicator, HealthIndicatorResult } from "@nestjs/terminus";

@Injectable()
export class <%= h.changeCase.pascal(name)%>HealthIndicator extends HealthIndicator {
  async isHealthy(): Promise<HealthIndicatorResult> {
    const isHealthy = true;
    const result = this.getStatus("<%= h.changeCase.camel(name)%>", isHealthy, {
      message: "OK",
      statusCode: 200
    });

    if (isHealthy) {
      return Promise.resolve(result);
    }
    throw new HealthCheckError("<%= h.changeCase.pascal(name)%> failed.", result);
  }
}
