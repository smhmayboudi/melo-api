---
to: src/<%= h.changeCase.camel(name)%>/<%= h.changeCase.dot(name)%>.health.indicator.ts
unless_exists: true
---
import { HealthCheckError } from "@godaddy/terminus";
import { Injectable } from "@nestjs/common";
import { HealthIndicator, HealthIndicatorResult } from "@nestjs/terminus";

@Injectable()
export class <%= h.changeCase.pascal(name)%>HealthIndicator extends HealthIndicator {
  async isHealthy(): Promise<HealthIndicatorResult> {
    const isHealthy = true;
    const result = this.getStatus("<%= h.changeCase.camel(name)%>", isHealthy);

    if (isHealthy) {
      return Promise.resolve(result);
    }
    throw new HealthCheckError("<%= h.changeCase.pascal(name)%> failed.", result);
  }
}
