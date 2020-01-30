---
to: src/<%= h.changeCase.camel(name)%>/<%= h.changeCase.dot(name)%>.config.spec.ts
unless_exists: true
---
import config from "./<%= h.changeCase.dot(name)%>.config";

describe("<%= h.changeCase.pascal(name)%>HealthIndicator", () => {
  it("should be defined", async () => {
    expect((await config()).toBeDefined());
  });
});
