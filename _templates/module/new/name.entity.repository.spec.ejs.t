---
to: src/<%= h.changeCase.camel(name)%>/<%= h.changeCase.dot(name)%>.entity.repository.spec.ts
unless_exists: true
---
import { <%= h.changeCase.pascal(name)%>EntityRepository } from "./<%= h.changeCase.dot(name)%>.entity.repository";

describe("<%= h.changeCase.pascal(name)%>EntityRepository", () => {
  it("should be defined", () => {
    expect(new <%= h.changeCase.pascal(name)%>EntityRepository()).toBeDefined();
  });
});
