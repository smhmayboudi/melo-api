---
inject: true
to: src/app.terminus.options.factory.ts
after: constructor\(
---
    private readonly <%= h.changeCase.camel(name)%>HealthIndicator: <%= h.changeCase.pascal(name)%>HealthIndicator,