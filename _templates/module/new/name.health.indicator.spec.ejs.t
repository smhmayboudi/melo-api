---
to: src/<%= h.changeCase.camel(name)%>/<%= h.changeCase.dot(name)%>.health.indicator.spec.ts
unless_exists: true
---
import { <%= h.changeCase.pascal(name)%>HealthIndicator } from "./<%= h.changeCase.dot(name)%>.health.indicator";

describe("<%= h.changeCase.pascal(name)%>HealthIndicator", () => {
  it("should be defined", () => {
    expect(new <%= h.changeCase.pascal(name)%>HealthIndicator()).toBeDefined();
  });
});
