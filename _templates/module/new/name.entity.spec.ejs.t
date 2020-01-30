---
to: src/<%= h.changeCase.camel(name)%>/<%= h.changeCase.dot(name)%>.entity.spec.ts
unless_exists: true
---
import { <%= h.changeCase.pascal(name)%>Entity } from "./<%= h.changeCase.dot(name)%>.entity";

describe("<%= h.changeCase.pascal(name)%>Entity", () => {
  it("should be defined", () => {
    expect(new <%= h.changeCase.pascal(name)%>Entity()).toBeDefined();
  });
});
