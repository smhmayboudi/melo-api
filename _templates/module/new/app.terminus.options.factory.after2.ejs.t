---
inject: true
to: src/app.terminus.options.factory.ts
after: healthIndicators
---
        async (): Promise<<%= h.changeCase.pascal(name)%>HealthIndicator> =>
          this.<%= h.changeCase.camel(name)%>HealthIndicator.isHealthy(),