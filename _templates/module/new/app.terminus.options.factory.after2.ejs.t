---
inject: true
to: src/app.terminus.options.factory.ts
after: healthIndicators
---
        async (): Promise<HealthIndicatorResult> =>
          this.<%= h.changeCase.camel(name)%>HealthIndicator.isHealthy(),